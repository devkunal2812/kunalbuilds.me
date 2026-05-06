// ---------------------------------------------------------
//  Achievements Data
//  Hackathons, Projects, Skills, Recognition
// ---------------------------------------------------------

export const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    category: 'Hackathons',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    ),
    color: '#f59e0b',
    items: [
      { 
        title: 'First Place - College Hackathon 2024', 
        description: 'Built an AI-powered project management tool' 
      },
      { 
        title: 'Smart India Hackathon Finalist', 
        description: 'Developed solution for government problem statement' 
      },
      { 
        title: 'Participated in 6+ Hackathons', 
        description: 'Gained experience in rapid prototyping and teamwork' 
      },
    ]
  },
  {
    id: 2,
    category: 'Projects',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1.5-1.5 2.5-3.5 2.5-3.5L4.5 16.5z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    color: '#3b82f6',
    items: [
      { 
        title: 'Founded PRAXIS', 
        description: 'Coding platform for students with 100+ users' 
      },
      { 
        title: '4+ Full-Stack Projects', 
        description: 'Built and deployed production-ready applications' 
      },
      { 
        title: '20+ Bounties Completed', 
        description: 'Contributed to open-source and freelance work' 
      },
    ]
  },
  {
    id: 3,
    category: 'Skills & Certifications',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    color: '#8b5cf6',
    items: [
      { 
        title: 'Full-Stack Development', 
        description: 'React, Node.js, MongoDB, PostgreSQL' 
      },
      { 
        title: 'UI/UX Design', 
        description: 'Figma, Adobe XD, Design Systems' 
      },
      { 
        title: 'Cloud & DevOps', 
        description: 'Docker, Vercel, Git workflows' 
      },
    ]
  },
  {
    id: 4,
    category: 'Recognition',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: '#10b981',
    items: [
      { 
        title: 'College Magazine Designer', 
        description: 'Designed annual college magazine layout' 
      },
      { 
        title: 'Yearbook Lead Designer', 
        description: 'Created complete yearbook design system' 
      },
      { 
        title: 'Active Community Member', 
        description: 'Contributing to dev communities and helping others' 
      },
    ]
  },
]

export const ACHIEVEMENT_STATS = [
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ), 
    value: '4+', 
    label: 'Projects' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ), 
    value: '6+', 
    label: 'Hackathons' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ), 
    value: '20+', 
    label: 'Bounties' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ), 
    value: '100+', 
    label: 'Users' 
  },
]
