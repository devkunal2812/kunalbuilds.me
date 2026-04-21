// ---------------------------------------------------------
//  MongoDB Analytics Data Checker
//  Run: node check-analytics.js
// ---------------------------------------------------------

require('dotenv').config()
const mongoose = require('mongoose')

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  sessionId: String,
  page: String,
  device: String,
  browser: String,
  os: String,
  screen: String,
  duration: Number,
  timestamp: Date,
  referrer: String,
  eventType: String
}, { timestamps: true })

const Analytics = mongoose.model('Analytics', analyticsSchema)

async function checkAnalytics() {
  try {
    console.log('🔌 Connecting to MongoDB...\n')
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    console.log('✅ Connected to MongoDB Atlas\n')
    console.log('=' .repeat(60))
    
    // Get total visits
    const totalVisits = await Analytics.countDocuments()
    console.log(`📊 TOTAL VISITS: ${totalVisits}`)
    
    // Get unique visitors
    const uniqueSessions = await Analytics.distinct('sessionId')
    console.log(`👥 UNIQUE VISITORS: ${uniqueSessions.length}`)
    
    // Get page views breakdown
    const pageViews = await Analytics.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    console.log('\n📄 PAGE VIEWS:')
    pageViews.forEach(page => {
      console.log(`   ${page._id}: ${page.count} visits`)
    })
    
    // Get device breakdown
    const deviceBreakdown = await Analytics.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    console.log('\n📱 DEVICE BREAKDOWN:')
    deviceBreakdown.forEach(device => {
      console.log(`   ${device._id}: ${device.count} visits`)
    })
    
    // Get browser breakdown
    const browserBreakdown = await Analytics.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    console.log('\n🌐 BROWSER BREAKDOWN:')
    browserBreakdown.forEach(browser => {
      console.log(`   ${browser._id}: ${browser.count} visits`)
    })
    
    // Get OS breakdown
    const osBreakdown = await Analytics.aggregate([
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    console.log('\n💻 OS BREAKDOWN:')
    osBreakdown.forEach(os => {
      console.log(`   ${os._id}: ${os.count} visits`)
    })
    
    // Get average duration
    const avgDuration = await Analytics.aggregate([
      { $match: { duration: { $gt: 0 } } },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
    ])
    
    if (avgDuration.length > 0) {
      console.log(`\n⏱️  AVERAGE DURATION: ${Math.round(avgDuration[0].avgDuration)} seconds`)
    }
    
    // Get recent visits
    console.log('\n🕐 RECENT 10 VISITS:')
    console.log('=' .repeat(60))
    
    const recentVisits = await Analytics.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('-__v -_id')
    
    recentVisits.forEach((visit, index) => {
      console.log(`\n${index + 1}. ${visit.page}`)
      console.log(`   Time: ${new Date(visit.timestamp).toLocaleString()}`)
      console.log(`   Device: ${visit.device} | Browser: ${visit.browser} | OS: ${visit.os}`)
      console.log(`   Screen: ${visit.screen}`)
      console.log(`   Duration: ${visit.duration}s | Type: ${visit.eventType}`)
      console.log(`   Referrer: ${visit.referrer}`)
      console.log(`   Session: ${visit.sessionId.substring(0, 20)}...`)
    })
    
    console.log('\n' + '='.repeat(60))
    console.log('✅ Analytics check complete!\n')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n💡 TIP: Make sure you have a .env file with MONGODB_URI')
      console.log('   Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname')
    }
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Disconnected from MongoDB\n')
  }
}

// Run the check
checkAnalytics()
