// ---------------------------------------------------------
//  Projects Data  -  Kunal Chauhan
// ---------------------------------------------------------

import feudexeImg from '../assets/feudexe-preview.png'
import praxisImg from '../assets/praxis-preview.png'
import clipsyncImg from '../assets/clipsync-preview.png'

export const PROJECTS = [
  {
    id: 1,
    title: 'Feud.Exe - Quiz Experience Platform',
    category: 'Frontend',
    description:
      'Traditional quizzes feel static and boring -> built an interactive quiz platform with engaging UI and smooth user flows to improve participation and user experience.',
    tech: ['React', 'JavaScript', 'Vercel'],
    accent: '#3b82f6',
    icon: '🧠',
    image: feudexeImg,
    stats: [
      { label: 'Experience', value: 'Interactive' },
      { label: 'Focus', value: 'UI/UX' }
    ],
    year: '2025',
    links: {
      live: 'https://feudexe.vercel.app/',
      github: 'https://github.com/Praxis-Club/feudexe'
    }
  },
  {
    id: 2,
    title: 'Praxis Coding Platform',
    category: 'Full-Stack',
    description:
      'Students lack a simple platform for coding practice in workshops -> built a coding platform for real-time problem solving, test hosting, and future workshop scalability.',
    tech: ['React', 'Node.js', 'JavaScript', 'Vercel'],
    accent: '#22c55e',
    icon: '💻',
    image: praxisImg,
    stats: [
      { label: 'Use Case', value: 'Workshops' },
      { label: 'Mode', value: 'Live Practice' }
    ],
    year: '2026',
    links: {
      live: 'https://praxis-cp.vercel.app/',
      github: 'https://github.com/Praxis-Club/coding-platform'
    }
  },
  {
    id: 3,
    title: 'IntelliPrep - Smart Preparation System',
    category: 'AI / Automation',
    description:
      'Preparing for exams and interviews is unstructured -> developed a system to organize preparation workflows and streamline learning with structured logic and automation.',
    tech: ['Python', 'Java', 'Logic Design'],
    accent: '#10b981',
    icon: '📚',
    image: null,
    stats: [
      { label: 'Approach', value: 'Structured' },
      { label: 'Stage', value: 'Prototype' }
    ],
    year: '2025',
    links: {
      live: 'https://intelliprep-3lzu.onrender.com/',
      github: 'https://github.com/devkunal2812/Intelliprep_final'
    }
  },
  {
    id: 4,
    title: 'ClipSync - Clipboard Sync Tool',
    category: 'Full-Stack',
    description:
      'Copy-paste across devices is inefficient -> built a real-time clipboard sync tool that enables seamless sharing of copied content between multiple devices.',
    tech: ['React', 'Node.js', 'WebSockets'],
    accent: '#f97316',
    icon: '📋',
    image: clipsyncImg,
    stats: [
      { label: 'Sync', value: 'Real-time' },
      { label: 'Devices', value: 'Multi-device' }
    ],
    year: '2025',
    links: {
      live: 'https://clip-sync-lime.vercel.app/',
      github: 'https://github.com/devkunal2812/ClipSync'
    }
  }
]

export const PROJECT_CATEGORIES = [
  'All', 'Full-Stack', 'Frontend', 'AI / Automation', 'Backend', 'Mobile'
]

export const TECH_STACK = [
  'React', 'Node.js', 'JavaScript', 'Python', 'Java',
  'WebSockets', 'Vercel', 'Logic Design'
]
