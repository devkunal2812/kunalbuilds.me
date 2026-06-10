// ---------------------------------------------------------
//  Health Check API Endpoint
//  Check if the API and MongoDB connection are working
// ---------------------------------------------------------

const mongoose = require('mongoose')

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const mongoUri = process.env.MONGODB_URI?.trim()
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        mongodbConfigured: !!mongoUri,
        nodeVersion: process.version
      }
    }

    // Try to connect to MongoDB
    if (mongoUri) {
      if (!/^mongodb(\+srv)?:\/\//.test(mongoUri)) {
        health.mongodb = 'error'
        health.message = 'Invalid MONGODB_URI format. Expected mongodb:// or mongodb+srv://'
        return res.status(500).json(health)
      }

      try {
        // Close any existing connections first
        if (mongoose.connection.readyState !== 0) {
          await mongoose.connection.close()
        }
        
        await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000
        })
        health.mongodb = 'connected'
        health.mongodbState = mongoose.connection.readyState
        await mongoose.connection.close()
      } catch (error) {
        health.mongodb = 'error'
        health.mongodbError = error.message
        health.mongodbState = mongoose.connection.readyState
      }
    } else {
      health.mongodb = 'not configured'
      health.message = 'Missing required environment variable: MONGODB_URI'
    }

    return res.status(200).json(health)
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
