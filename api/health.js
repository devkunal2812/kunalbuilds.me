// Health check endpoint
module.exports = (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Portfolio Analytics API'
  })
}
