// ---------------------------------------------------------
//  AI Chat API Endpoint (Google Gemini)
//  RAG-powered chatbot for portfolio questions
// ---------------------------------------------------------

const { GoogleGenerativeAI } = require('@google/generative-ai')

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Portfolio content (embedded directly for simplicity)
const portfolioKnowledge = `
ABOUT KUNAL CHAUHAN:
Kunal Chauhan is a Full-Stack Engineer and Product Designer with 3+ years of experience. He specializes in building high-performance web applications that blend design precision with modern engineering. Kunal crafts pixel-perfect UI and scalable backend systems.

SKILLS:
Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, CSS Modules, Responsive Design, Web Accessibility (WCAG), Progressive Web Apps (PWA)
Backend: Node.js, Express, MongoDB, PostgreSQL, REST APIs, GraphQL, Serverless Functions, Vercel, AWS, Docker, Git
Design: Figma, UI/UX Design, Prototyping, Design Systems, Component Libraries, Brand Identity, Responsive Design, Mobile-First Design
Tools: VS Code, Git/GitHub, Vercel, Netlify, MongoDB Atlas, Postman, Chrome DevTools, AI Tools (ChatGPT, Claude, Gemini), Webpack, Vite

EXPERIENCE:
- 3+ years of professional experience in web development
- Completed 20+ projects
- Worked with 10+ happy clients
- Expertise spans frontend development, backend architecture, and UI/UX design

PROJECTS:
1. ClipSync: A video collaboration platform built with React and Node.js. Features real-time collaboration, video editing, and cloud storage integration.
2. FeudExe: A competitive gaming platform with real-time matchmaking and leaderboards. Built with Next.js, TypeScript, and PostgreSQL.
3. Praxis: A project management tool for remote teams. Built with React, Node.js, and MongoDB. Features task management, team chat, and analytics.
4. Current Portfolio: Interactive hero section, skill cards, smooth animations, keyboard navigation, accessibility features, dark mode, responsive design, analytics tracking.

APPROACH:
Kunal focuses on three principles:
1. Design precision - creating pixel-perfect, beautiful interfaces
2. Modern engineering - using cutting-edge technologies and best practices
3. User experience - ensuring accessibility, performance, and usability

CONTACT:
Available for freelance projects, full-time opportunities, and collaborations. Currently available for work and open to new opportunities.
`

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, conversationHistory = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        success: false,
        error: 'Valid message is required' 
      })
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured'
      })
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    })

    // Build conversation context
    const systemContext = `You are Kunal Chauhan's AI portfolio assistant. Answer questions about Kunal's skills, projects, and experience based on the provided knowledge base.

KNOWLEDGE BASE:
${portfolioKnowledge}

GUIDELINES:
- Be friendly, professional, and enthusiastic
- Answer ONLY based on the provided knowledge base
- If asked about something not in the knowledge base, politely say "I don't have that specific information in Kunal's portfolio, but I'd be happy to answer questions about his skills, projects, or experience!"
- Keep responses concise (2-4 sentences)
- Use first person when talking about Kunal (e.g., "I have experience in..." or "My skills include...")
- If asked about contact, mention that visitors can reach out through the portfolio website
- Be helpful and encourage visitors to explore the portfolio

USER QUESTION: ${message}

RESPONSE:`

    // Generate response
    const result = await model.generateContent(systemContext)
    const response = await result.response
    const reply = response.text()

    return res.json({
      success: true,
      reply: reply.trim(),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat error:', error)
    
    // Handle specific Gemini errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'API key configuration error'
      })
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({
        success: false,
        error: 'API quota exceeded. Please try again later.'
      })
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to process chat message. Please try again.'
    })
  }
}
