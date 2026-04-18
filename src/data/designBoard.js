// ---------------------------------------------------------
// Design Board Data - Kunal Chauhan
// To add images: import them below and use the variable
// ---------------------------------------------------------

import ui1 from '../assets/ui_1.png'
// import ui2 from '../assets/ui_2.png'   ← add more here

export const SLIDES = [
  // Slide 1 - UI / Product Work
  [
    {
      id: 1,
      title: 'Portfolio UI Hero Saction',
      category: 'UI Design',
      image: ui1,
      accent: '#a3e635',
      w: 220, h: 160, top: '4%', left: '3%', rotate: -6, z: 8,
      description:
        'A modern developer portfolio focused on motion, depth, and interactive storytelling instead of static layouts.',
      tools: ['Figma', 'React', 'CSS Modules'],
      purpose:
        'Personal branding - to showcase my work as an experience, not just a resume.',
    },

    {
      id: 2,
      title: 'Praxis Coding Platform',
      category: 'Product UI',
      image: null,  // add: import codingPlatform from '../assets/coding-platform.png'
      accent: '#f472b6',
      w: 200, h: 150, top: '3%', left: '30%', rotate: 4, z: 9,
      description:
        'Focused coding interface with clean layout, problem navigation, and minimal distractions.',
      tools: ['Figma', 'React', 'Node.js'],
      purpose:
        'To help students practice coding efficiently with a simple and clear UI.',
    },

    {
      id: 3,
      title: 'ClipSync Interface',
      category: 'App UI',
      image: null,
      accent: '#60a5fa',
      w: 180, h: 220, top: '5%', left: '58%', rotate: -3, z: 7,
      description:
        'Minimal UI for real-time clipboard sharing with fast and seamless interaction flow.',
      tools: ['Figma', 'React'],
      purpose:
        'To simplify cross-device text sharing with a clean interface.',
    },

    {
      id: 4,
      title: 'Landing Page Concept',
      category: 'Web Design',
      image: null,
      accent: '#fbbf24',
      w: 240, h: 160, top: '38%', left: '2%', rotate: 5, z: 10,
      description:
        'Conversion-focused landing page with strong hero section and clear call-to-actions.',
      tools: ['Figma', 'React'],
      purpose:
        'To improve user engagement and drive sign-ups.',
    },

    {
      id: 5,
      title: 'Dashboard UI',
      category: 'UI Design',
      image: null,
      accent: '#34d399',
      w: 200, h: 140, top: '36%', left: '35%', rotate: -4, z: 6,
      description:
        'Clean analytics dashboard with structured data layout and visual hierarchy.',
      tools: ['Figma'],
      purpose:
        'To present complex data in a simple and readable format.',
    },

    {
      id: 6,
      title: 'Design System',
      category: 'UI System',
      image: null,
      accent: '#c084fc',
      w: 210, h: 160, top: '34%', left: '62%', rotate: 6, z: 8,
      description:
        'Reusable component system with consistent spacing, typography, and colors.',
      tools: ['Figma'],
      purpose:
        'To speed up development and maintain UI consistency.',
    },
  ],

  // Slide 2 - Graphic / Print Work
  [
    {
      id: 7,
      title: 'College Magazine',
      category: 'Editorial',
      image: null,
      accent: '#f472b6',
      w: 200, h: 260, top: '3%', left: '2%', rotate: -5, z: 9,
      description:
        'Complete magazine design with structured layout and strong typography.',
      tools: ['CorelDRAW'],
      purpose:
        'To create a professional publication for students.',
    },

    {
      id: 8,
      title: 'Yearbook Design',
      category: 'Print Design',
      image: null,
      accent: '#a3e635',
      w: 230, h: 160, top: '4%', left: '28%', rotate: 4, z: 8,
      description:
        'Full yearbook layout with consistent design language and grid system.',
      tools: ['CorelDRAW'],
      purpose:
        'To document student memories in a structured format.',
    },

    {
      id: 9,
      title: 'Event Poster',
      category: 'Graphic Design',
      image: null,
      accent: '#60a5fa',
      w: 190, h: 240, top: '3%', left: '60%', rotate: -4, z: 7,
      description:
        'High-impact poster with bold typography and strong visual hierarchy.',
      tools: ['CorelDRAW', 'Figma'],
      purpose:
        'To promote events and attract attention.',
    },

    {
      id: 10,
      title: 'Brand Identity',
      category: 'Branding',
      image: null,
      accent: '#fbbf24',
      w: 240, h: 150, top: '42%', left: '3%', rotate: 6, z: 10,
      description:
        'Logo and visual identity system for PRAXIS Club.',
      tools: ['Figma'],
      purpose:
        'To create a recognizable and consistent brand.',
    },

    {
      id: 11,
      title: 'Social Media Creatives',
      category: 'Graphic Design',
      image: null,
      accent: '#34d399',
      w: 200, h: 160, top: '40%', left: '38%', rotate: -3, z: 6,
      description:
        'Set of social media designs with consistent theme and layout.',
      tools: ['Canva', 'Figma'],
      purpose:
        'To maintain visual consistency across platforms.',
    },
  ],

  // Slide 3 - Motion / Interaction
  [
    {
      id: 12,
      title: 'Scroll Animations',
      category: 'Web Animation',
      image: null,
      accent: '#a3e635',
      w: 220, h: 160, top: '4%', left: '4%', rotate: -4, z: 8,
      description:
        'Scroll-based animations with reveal effects and smooth transitions.',
      tools: ['Framer Motion', 'React'],
      purpose:
        'To create immersive web experiences.',
    },

    {
      id: 13,
      title: 'Micro Interactions',
      category: 'Interaction',
      image: null,
      accent: '#f472b6',
      w: 200, h: 150, top: '3%', left: '32%', rotate: 5, z: 9,
      description:
        'Small UI animations for buttons, forms, and feedback states.',
      tools: ['CSS', 'Framer Motion'],
      purpose:
        'To improve user experience and add delight.',
    },

    {
      id: 14,
      title: 'Hover Effects',
      category: 'Interaction',
      image: null,
      accent: '#60a5fa',
      w: 190, h: 230, top: '4%', left: '60%', rotate: -3, z: 7,
      description:
        'Interactive hover effects like tilt, glow, and magnetic movement.',
      tools: ['CSS', 'JavaScript'],
      purpose:
        'To add depth and interactivity to UI.',
    },

    {
      id: 15,
      title: 'Page Transitions',
      category: 'Motion',
      image: null,
      accent: '#fbbf24',
      w: 240, h: 155, top: '40%', left: '2%', rotate: 6, z: 10,
      description:
        'Smooth transitions between pages for app-like experience.',
      tools: ['Framer Motion'],
      purpose:
        'To improve navigation flow.',
    },

    {
      id: 16,
      title: 'Dev Visual Experiment',
      category: 'Creative',
      image: null,
      accent: '#34d399',
      w: 200, h: 150, top: '38%', left: '36%', rotate: -5, z: 6,
      description:
        'Visual system representing developer states like focus and debugging.',
      tools: ['JavaScript', 'Canvas'],
      purpose:
        'To experiment with creative coding ideas.',
    },
  ],
];
