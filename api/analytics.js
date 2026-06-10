// ---------------------------------------------------------
//  Analytics API Endpoint (Vercel Serverless Function)
//  Handles analytics tracking for kunalbuilds.vercel.app
// ---------------------------------------------------------

const mongoose = require('mongoose')

// MongoDB connection (cached for serverless)
let cachedDb = null

function getValidatedMongoUri() {
  const mongoUri = process.env.MONGODB_URI?.trim()
  if (!mongoUri) {
    return {
      error: 'Missing required environment variable: MONGODB_URI'
    }
  }

  if (!/^mongodb(\+srv)?:\/\//.test(mongoUri)) {
    return {
      error: 'Invalid MONGODB_URI format. Expected mongodb:// or mongodb+srv://'
    }
  }

  return { mongoUri }
}

async function connectToDatabase(mongoUri) {
  if (cachedDb) {
    return cachedDb
  }

  const connection = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  cachedDb = connection
  return connection
}

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  page: { type: String, required: true },
  device: { type: String, required: true, enum: ['mobile', 'tablet', 'desktop'] },
  browser: { type: String, required: true },
  os: { type: String, required: true },
  screen: { type: String, required: true },
  duration: { type: Number, default: 0, min: 0 },
  timestamp: { type: Date, required: true, index: true, default: Date.now },
  referrer: { type: String, default: 'direct' },
  eventType: { type: String, enum: ['visit', 'duration'], default: 'visit' }
}, { timestamps: true })

// Get or create model
const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema)

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { mongoUri, error: mongoUriError } = getValidatedMongoUri()
    if (mongoUriError) {
      return res.status(500).json({
        success: false,
        error: mongoUriError
      })
    }

    // Connect to database
    await connectToDatabase(mongoUri)

    // POST - Track analytics
    if (req.method === 'POST') {
      const data = req.body

      // Validate required fields
      if (!data.sessionId || !data.page) {
        return res.status(400).json({ 
          success: false,
          error: 'Missing required fields: sessionId and page are required' 
        })
      }

      // Validate device type
      if (!['mobile', 'tablet', 'desktop'].includes(data.device)) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid device type' 
        })
      }

      // Create analytics entry
      const analyticsEntry = await Analytics.create({
        sessionId: data.sessionId,
        page: data.page,
        device: data.device,
        browser: data.browser || 'Unknown',
        os: data.os || 'Unknown',
        screen: data.screen || 'Unknown',
        duration: data.duration || 0,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        referrer: data.referrer || 'direct',
        eventType: data.eventType || 'visit'
      })

      return res.status(201).json({ 
        success: true,
        id: analyticsEntry._id
      })
    }

    // GET - Get stats (for future dashboard)
    if (req.method === 'GET') {
      const totalVisits = await Analytics.countDocuments()
      const uniqueSessions = await Analytics.distinct('sessionId')
      
      return res.json({
        success: true,
        stats: {
          totalVisits,
          uniqueVisitors: uniqueSessions.length
        }
      })
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' })

  } catch (error) {
    console.error('Analytics error:', error)
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
}
