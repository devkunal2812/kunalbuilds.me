// Portfolio content for RAG chatbot
// This data will be used to answer questions about Kunal

export const portfolioContent = [
  {
    id: 'intro',
    category: 'about',
    content: `Kunal Chauhan is a Full-Stack Engineer and Product Designer with 3+ years of experience. 
    He specializes in building high-performance web applications that blend design precision with modern engineering. 
    Kunal crafts pixel-perfect UI and scalable backend systems.`
  },
  {
    id: 'skills-frontend',
    category: 'skills',
    content: `Frontend Skills: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, 
    CSS Modules, Responsive Design, Web Accessibility (WCAG), Progressive Web Apps (PWA)`
  },
  {
    id: 'skills-backend',
    category: 'skills',
    content: `Backend Skills: Node.js, Express, MongoDB, PostgreSQL, REST APIs, GraphQL, 
    Serverless Functions, Vercel, AWS, Docker, Git`
  },
  {
    id: 'skills-design',
    category: 'skills',
    content: `Design Skills: Figma, UI/UX Design, Prototyping, Design Systems, Component Libraries, 
    Brand Identity, Responsive Design, Mobile-First Design`
  },
  {
    id: 'skills-tools',
    category: 'skills',
    content: `Tools & Technologies: VS Code, Git/GitHub, Vercel, Netlify, MongoDB Atlas, 
    Postman, Chrome DevTools, AI Tools (ChatGPT, Claude, Gemini), Webpack, Vite`
  },
  {
    id: 'experience',
    category: 'experience',
    content: `Kunal has 3+ years of professional experience in web development. 
    He has completed 20+ projects and worked with 10+ happy clients. 
    His expertise spans from frontend development to backend architecture and UI/UX design.`
  },
  {
    id: 'project-clipsync',
    category: 'projects',
    content: `ClipSync: A video collaboration platform built with React and Node.js. 
    Features include real-time collaboration, video editing capabilities, and cloud storage integration. 
    Technologies used: React, Node.js, WebRTC, MongoDB, AWS S3`
  },
  {
    id: 'project-feudexe',
    category: 'projects',
    content: `FeudExe: A competitive gaming platform with real-time matchmaking and leaderboards. 
    Built with Next.js, TypeScript, and PostgreSQL. Features include user authentication, 
    real-time updates, and responsive design.`
  },
  {
    id: 'project-praxis',
    category: 'projects',
    content: `Praxis: A project management and collaboration tool designed for remote teams. 
    Built with React, Node.js, and MongoDB. Features include task management, team chat, 
    file sharing, and analytics dashboard.`
  },
  {
    id: 'portfolio-features',
    category: 'projects',
    content: `Current Portfolio Features: Interactive hero section with animated profile, 
    skill cards with hover effects, smooth scroll animations, keyboard navigation support, 
    accessibility features (WCAG compliant), dark mode support, responsive design for all devices, 
    analytics tracking, content protection, and piano sound effects on interactions.`
  },
  {
    id: 'approach',
    category: 'about',
    content: `Kunal's approach to development focuses on three key principles: 
    1) Design precision - creating pixel-perfect, beautiful interfaces
    2) Modern engineering - using cutting-edge technologies and best practices
    3) User experience - ensuring accessibility, performance, and usability`
  },
  {
    id: 'contact',
    category: 'contact',
    content: `You can contact Kunal through his portfolio website. 
    He is available for freelance projects, full-time opportunities, and collaborations. 
    Kunal is currently available for work and open to new opportunities.`
  },
  {
    id: 'education',
    category: 'about',
    content: `Kunal is a self-taught developer who continuously learns and adapts to new technologies. 
    He stays updated with the latest trends in web development, design, and AI tools.`
  },
  {
    id: 'specialties',
    category: 'skills',
    content: `Specialties: Building responsive web applications, creating design systems, 
    implementing complex animations, optimizing performance, ensuring accessibility, 
    integrating AI features, and developing full-stack solutions from concept to deployment.`
  }
]

// Helper function to get all content as a single string
export function getAllContent() {
  return portfolioContent.map(item => item.content).join('\n\n')
}

// Helper function to search content by category
export function getContentByCategory(category) {
  return portfolioContent
    .filter(item => item.category === category)
    .map(item => item.content)
    .join('\n\n')
}
