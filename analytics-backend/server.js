// ---------------------------------------------------------
//  Analytics Backend Server (Node.js + Express + MongoDB)
//  Portfolio Analytics for Kunal Chauhan
// ---------------------------------------------------------

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  sessionId: { 
    type: String, 
    required: true, 
    index: true 
  },
  page: { 
    type: String, 
    required: true 
  },
  device: { 
    type: String, 
    required: true,
    enum: ['mobile', 'tablet', 'desktop']
  },
  browser: { 
    type: String, 
    required: true 
  },
  os: { 
    type: String, 
    required: true 
  },
  screen: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    default: 0,
    min: 0
  },
  timestamp: { 
    type: Date, 
    required: true, 
    index: true,
    default: Date.now
  },
  referrer: { 
    type: String, 
    default: 'direct' 
  },
  eventType: {
    type: String,
    enum: ['visit', 'duration'],
    default: 'visit'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
})

// Indexes for better query performance
analyticsSchema.index({ sessionId: 1, timestamp: -1 })
analyticsSchema.index({ page: 1, timestamp: -1 })
analyticsSchema.index({ device: 1 })
analyticsSchema.index({ eventType: 1 })

const Analytics = mongoose.model('Analytics', analyticsSchema)

// API Routes

// POST /api/analytics - Track visitor data
app.post('/api/analytics', async (req, res) => {
  try {
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

    res.status(201).json({ 
      success: true,
      id: analyticsEntry._id
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// GET /api/analytics/stats - Get basic stats (for future dashboard)
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments()
    const uniqueSessions = await Analytics.distinct('sessionId')
    const pageViews = await Analytics.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])
    const deviceBreakdown = await Analytics.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ])

    res.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors: uniqueSessions.length,
        topPages: pageViews,
        devices: deviceBreakdown
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// GET /api/analytics/recent - Get recent visits
app.get('/api/analytics/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const recentVisits = await Analytics.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('-__v')

    res.json({
      success: true,
      visits: recentVisits
    })
  } catch (error) {
    console.error('Recent visits error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Analytics server running on port ${PORT}`)
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/analytics`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...')
  await mongoose.connection.close()
  process.exit(0)
})
