// ─────────────────────────────────────────────
//  About Page Data — Kunal Chauhan
//  x = horizontal offset from scene center (px)
//  y = vertical offset from scene center (px)
//  3 columns per side
// ─────────────────────────────────────────────

// LEFT — Technical + Builder Side
export const LEFT_CHIPS = [
  // Near column (x = -350)
  { label: 'React',          icon: '⚛️', x: -350, y: -280, rotate: -8, delay: 0.0, description: 'Built 8+ projects with React' },
  { label: 'JavaScript',     icon: '🟨', x: -350, y: -175, rotate:  6, delay: 0.2, description: 'Core language for all projects' },
  { label: 'Node.js',        icon: '🟢', x: -350, y:  -70, rotate:  8, delay: 0.1, description: 'Backend for 5+ applications' },
  { label: 'Tailwind',       icon: '💨', x: -350, y:   35, rotate:  5, delay: 0.3, description: 'Primary styling framework' },
  { label: 'Git',            icon: '🔧', x: -350, y:  140, rotate: -4, delay: 0.6, description: 'Version control for all work' },
  { label: 'REST APIs',      icon: '🔌', x: -350, y:  245, rotate:  5, delay: 0.4, description: 'Integrated 10+ APIs' },
  // Mid column (x = -490)
  { label: 'TypeScript',     icon: '🔷', x: -490, y: -230, rotate: -5, delay: 0.4, description: 'Type-safe development' },
  { label: 'MongoDB',        icon: '🍃', x: -490, y: -125, rotate: -6, delay: 0.5, description: 'Database for 4+ projects' },
  { label: 'Next.js',        icon: '▲',  x: -490, y:  -20, rotate:  4, delay: 0.3, description: 'Framework for modern apps' },
  { label: 'PostgreSQL',     icon: '🐘', x: -490, y:   85, rotate: -5, delay: 0.7, description: 'Relational database expert' },
  { label: 'System Design',  icon: '🧩', x: -490, y:  190, rotate:  6, delay: 0.7, description: 'Scalable architecture design' },
  // Far column (x = -635)
  { label: 'Docker',         icon: '🐳', x: -635, y: -260, rotate: -6, delay: 0.5, description: 'Containerized deployments' },
  { label: 'Redis',          icon: '🔴', x: -635, y: -155, rotate:  7, delay: 0.2, description: 'Caching & session storage' },
  { label: 'GraphQL',        icon: '💜', x: -635, y:  -50, rotate: -4, delay: 0.6, description: 'API query language' },
  { label: 'Open Source',    icon: '🌍', x: -635, y:   55, rotate:  5, delay: 0.4, description: 'Active contributor' },
  { label: 'VS Code',        icon: '💙', x: -635, y:  160, rotate: -7, delay: 0.8, description: 'Primary development IDE' },
]

// RIGHT — Creative + Tools + Identity Side
export const RIGHT_CHIPS = [
  // Near column (x = +245)
  { label: 'UI/UX',          icon: '🎨', x:  245, y: -280, rotate: -6, delay: 0.3, description: 'Designed 6+ interfaces' },
  { label: 'Figma',          icon: '🎯', x:  245, y: -175, rotate:  5, delay: 0.5, description: 'Primary design tool' },
  { label: 'Framer',         icon: '🌀', x:  245, y:  -70, rotate: -8, delay: 0.2, description: 'Interactive prototypes' },
  { label: 'AI Tools',       icon: '🤖', x:  245, y:   35, rotate:  6, delay: 0.6, description: 'Workflow automation' },
  { label: 'Automation',     icon: '🔄', x:  245, y:  140, rotate: -7, delay: 0.4, description: 'Built 3+ automation tools' },
  { label: 'Build in Public',icon: '📢', x:  245, y:  245, rotate: -4, delay: 0.5, description: 'Sharing journey on X' },
  // Mid column (x = +385)
  { label: 'PRAXIS',         icon: '🚀', x:  385, y: -230, rotate:  8, delay: 0.1, description: 'Coding platform founder' },
  { label: 'After Effects',  icon: '🎬', x:  385, y: -125, rotate: -5, delay: 0.3, description: 'Motion graphics & animation' },
  { label: 'Canva',          icon: '🖌️', x:  385, y:  -20, rotate:  4, delay: 0.5, description: 'Quick design iterations' },
  { label: 'Branding',       icon: '💎', x:  385, y:   85, rotate: -6, delay: 0.7, description: 'Visual identity design' },
  { label: 'Creative Coding',icon: '✨', x:  385, y:  190, rotate:  5, delay: 0.7, description: 'Generative art & effects' },
  // Far column (x = +530)
  { label: 'Motion Design',  icon: '🎞️', x:  530, y: -260, rotate: -5, delay: 0.2, description: 'Animated UI experiences' },
  { label: 'Freelance',      icon: '💼', x:  530, y: -155, rotate:  6, delay: 0.4, description: 'Client projects delivered' },
  { label: 'Storytelling',   icon: '📖', x:  530, y:  -50, rotate: -4, delay: 0.6, description: 'Narrative-driven design' },
  { label: 'Community',      icon: '🤝', x:  530, y:   55, rotate:  7, delay: 0.3, description: 'Active in dev communities' },
  { label: 'Notion',         icon: '⬛', x:  530, y:  160, rotate: -6, delay: 0.8, description: 'Project management hub' },
]

export const ABOUT_META = {
  name: 'Kunal',
  role: 'Frontend Developer & Creative Builder',
  focus: ['UI/UX', 'Motion', 'Interactive Web'],
  current: [
    'Building coding platform @ PRAXIS',
    'Exploring AI + automation',
    'Sharing ideas on X',
  ],
}

export const STATS = [
  { label: 'Projects',   value: '4+' },
  { label: 'Hackathons', value: '6+' },
  { label: 'Bounties',   value: '20+' },
]

export const DESIGNS = [
  { id: 1, title: 'Portfolio UI Concept',  category: 'UI Design',       description: 'Dark-theme portfolio layout with motion and glassmorphism', image: null, accent: '#3b82f6' },
  { id: 2, title: 'College Magazine',      category: 'Editorial Design', description: 'Annual magazine layout with consistent visual identity',    image: null, accent: '#8b5cf6' },
  { id: 3, title: 'Yearbook Design',       category: 'Graphic Design',   description: 'Full yearbook with structured grid and typography system',  image: null, accent: '#10b981' },
  { id: 4, title: 'App UI Prototype',      category: 'Figma',            description: 'Mobile-first high-fidelity prototype with component library', image: null, accent: '#f97316' },
  { id: 5, title: 'Brand Identity',        category: 'Branding',         description: 'Logo and visual system for a student-run community',        image: null, accent: '#ec4899' },
  { id: 6, title: 'Dashboard Concept',     category: 'UI Design',        description: 'Data-rich analytics dashboard with clean layout',           image: null, accent: '#06b6d4' },
]
