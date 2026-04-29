# RAG Chatbot Implementation Guide

Complete guide to add an AI chatbot to your portfolio that can answer questions about you using RAG (Retrieval-Augmented Generation).

## 🎯 What This Will Do

Visitors can ask questions like:
- "What projects has Kunal worked on?"
- "What technologies does Kunal know?"
- "Tell me about Kunal's experience"
- "How can I contact Kunal?"

The chatbot will answer using your actual portfolio content!

## 📦 Architecture

```
User Question
    ↓
Frontend Chat UI (React)
    ↓
API Endpoint (/api/chat)
    ↓
1. Convert question to embeddings (OpenAI)
2. Search similar content (Vector DB)
3. Generate answer with context (OpenAI GPT)
    ↓
Response to User
```

## 🔧 Requirements

### 1. OpenAI API Key
- Sign up: https://platform.openai.com/api-keys
- Cost: ~$0.002 per conversation (very cheap!)
- Models we'll use:
  - `text-embedding-3-small` - for embeddings ($0.00002/1K tokens)
  - `gpt-4o-mini` - for chat ($0.00015/1K tokens)

### 2. Vector Database (Choose One)

**Option A: MongoDB Atlas Vector Search** (Recommended - you already have it!)
- ✅ Free tier available
- ✅ Already set up
- ✅ No additional service needed

**Option B: Pinecone**
- ✅ Free tier: 1 index, 100K vectors
- ✅ Very fast
- ❌ Requires separate account

### 3. Dependencies

```bash
npm install openai mongodb
```

## 📁 File Structure

```
portfolio/
├── api/
│   ├── chat.js              # Main chat endpoint
│   ├── embeddings.js        # Generate embeddings
│   └── setup-vectors.js     # One-time setup script
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx      # Chat UI component
│   │   └── ChatBot.module.css
│   └── data/
│       └── portfolio-content.js  # Your content for RAG
└── scripts/
    └── generate-embeddings.js    # Generate embeddings locally
```

## 🚀 Step-by-Step Implementation

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up / Log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)
5. Add to Vercel Environment Variables:
   - Name: `OPENAI_API_KEY`
   - Value: Your API key

### Step 2: Prepare Your Portfolio Content

Create a file with all your portfolio information:

```javascript
// src/data/portfolio-content.js
export const portfolioContent = [
  {
    id: 'about',
    category: 'about',
    content: `Kunal Chauhan is a Full-Stack Engineer and Product Designer with 3+ years of experience. 
    He specializes in React, Next.js, TypeScript, Node.js, and modern web technologies.`
  },
  {
    id: 'skills',
    category: 'skills',
    content: `Skills: React, Next.js, TypeScript, Node.js, Tailwind CSS, Figma, MongoDB, PostgreSQL, 
    AWS, Docker, Git, REST APIs, GraphQL, AI Tools`
  },
  {
    id: 'project-1',
    category: 'projects',
    content: `ClipSync: A video collaboration platform built with React and Node.js. 
    Features real-time collaboration, video editing, and cloud storage integration.`
  },
  // Add more content...
]
```

### Step 3: Create Backend API

**api/chat.js:**
```javascript
const { OpenAI } = require('openai')
const { MongoClient } = require('mongodb')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

let cachedClient = null

async function connectToMongoDB() {
  if (cachedClient) return cachedClient
  
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

module.exports = async (req, res) => {
  // CORS
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

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // 1. Generate embedding for user question
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message
    })
    const questionEmbedding = embeddingResponse.data[0].embedding

    // 2. Search for relevant content in MongoDB
    const client = await connectToMongoDB()
    const db = client.db('portfolio-analytics')
    const collection = db.collection('portfolio_embeddings')

    // Vector search (requires MongoDB Atlas Vector Search index)
    const relevantDocs = await collection.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: questionEmbedding,
          numCandidates: 20,
          limit: 3
        }
      },
      {
        $project: {
          content: 1,
          category: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ]).toArray()

    // 3. Build context from relevant documents
    const context = relevantDocs
      .map(doc => doc.content)
      .join('\n\n')

    // 4. Generate response using GPT
    const systemPrompt = `You are Kunal Chauhan's portfolio assistant. Answer questions about Kunal's skills, projects, and experience based on the provided context.

Context:
${context}

Guidelines:
- Be friendly and professional
- Only answer based on the provided context
- If you don't know something, say "I don't have that information in Kunal's portfolio"
- Keep responses concise (2-3 sentences)
- Use first person when talking about Kunal (e.g., "I have experience in...")
`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 200
    })

    const reply = completion.choices[0].message.content

    return res.json({
      success: true,
      reply: reply,
      sources: relevantDocs.map(doc => ({
        category: doc.category,
        score: doc.score
      }))
    })

  } catch (error) {
    console.error('Chat error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to process chat message'
    })
  }
}
```

### Step 4: Generate Embeddings Script

**scripts/generate-embeddings.js:**
```javascript
require('dotenv').config()
const { OpenAI } = require('openai')
const { MongoClient } = require('mongodb')
const { portfolioContent } = require('../src/data/portfolio-content')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function generateEmbeddings() {
  console.log('🚀 Generating embeddings for portfolio content...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  
  const db = client.db('portfolio-analytics')
  const collection = db.collection('portfolio_embeddings')

  // Clear existing embeddings
  await collection.deleteMany({})
  console.log('✅ Cleared existing embeddings\n')

  // Generate embeddings for each content piece
  for (const item of portfolioContent) {
    console.log(`Processing: ${item.id}...`)

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: item.content
    })

    const embedding = response.data[0].embedding

    await collection.insertOne({
      id: item.id,
      category: item.category,
      content: item.content,
      embedding: embedding,
      createdAt: new Date()
    })

    console.log(`✅ Generated embedding for ${item.id}`)
  }

  console.log('\n🎉 All embeddings generated successfully!')
  console.log(`📊 Total documents: ${portfolioContent.length}`)

  await client.close()
}

generateEmbeddings().catch(console.error)
```

### Step 5: Create Chat UI Component

**src/components/ChatBot.jsx:**
```jsx
import { useState, useRef, useEffect } from 'react'
import styles from './ChatBot.module.css'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Kunal's AI assistant. Ask me anything about his skills, projects, or experience!"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-6) // Last 3 exchanges
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply
        }])
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chat with Kunal's AI</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <span className={styles.typing}>●●●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInput} onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
```

### Step 6: Setup MongoDB Vector Search Index

In MongoDB Atlas:

1. Go to your cluster → **Search** tab
2. Click **"Create Search Index"**
3. Choose **"JSON Editor"**
4. Use this configuration:

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "type": "knnVector",
        "dimensions": 1536,
        "similarity": "cosine"
      }
    }
  }
}
```

5. Name it: `vector_index`
6. Database: `portfolio-analytics`
7. Collection: `portfolio_embeddings`

### Step 7: Run Setup

```bash
# 1. Install dependencies
npm install openai

# 2. Add environment variables to .env
OPENAI_API_KEY=sk-your-key-here
MONGODB_URI=your-mongodb-uri

# 3. Generate embeddings
node scripts/generate-embeddings.js

# 4. Deploy to Vercel
git add .
git commit -m "feat: Add RAG chatbot"
git push origin main
```

## 💰 Cost Estimate

For 1000 conversations/month:
- Embeddings: $0.02
- Chat completions: $0.30
- **Total: ~$0.32/month** (very affordable!)

## 🎨 Customization Ideas

1. **Add voice input** (Web Speech API)
2. **Add suggested questions** ("What projects have you built?")
3. **Add typing indicators**
4. **Add conversation history** (save to localStorage)
5. **Add feedback buttons** (👍 👎)
6. **Add analytics** (track popular questions)

## 🔒 Security Best Practices

1. ✅ Rate limiting (prevent abuse)
2. ✅ Input validation (sanitize user input)
3. ✅ API key security (never expose in frontend)
4. ✅ CORS configuration
5. ✅ Content moderation (filter inappropriate questions)

## 📊 Monitoring

Track in your analytics:
- Number of chat conversations
- Popular questions
- Average response time
- User satisfaction (if you add feedback)

## 🚀 Next Steps

1. Get OpenAI API key
2. Create portfolio-content.js with your info
3. Run embedding generation script
4. Set up MongoDB Vector Search index
5. Deploy and test!

---

**Ready to implement? Let me know and I'll help you set it up step by step!** 🤖
