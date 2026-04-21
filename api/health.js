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

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      mongodbConfigured: !!process.env.MONGODB_URI,
      nodeVersion: process.version
    }
  }

  // Try to connect to MongoDB
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      })
      health.mongodb = 'connected'
      await mongoose.connection.close()
    } catch (error) {
      health.mongodb = 'error'
      health.mongodbError = error.message
    }
  } else {
    health.mongodb = 'not configured'
  }

  return res.json(health)
}
