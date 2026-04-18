// ---------------------------------------------------------
// Design Board Data - Kunal Chauhan
// To add images: import them below and use the variable
// ---------------------------------------------------------

import ui1 from '../assets/ui_1.png'
import dashboardUI from '../../figma-files/10_dashboard-ui-design.svg'
import mobileAppUI from '../../figma-files/11_mobile-app-ui.svg'
import brandIdentity from '../../figma-files/12_brand-identity-design.svg'
import landingWireframe from '../../figma-files/13_landing-page-wireframe.svg'
import socialGraphics from '../../figma-files/14_social-media-graphics.svg'
import componentLibrary from '../../figma-files/15_component-library.svg'

export const SLIDES = [
  // Slide 1 - UI / Product Work
  [
    {
      id: 1,
      title: 'Portfolio UI Hero Section',
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
      title: 'Dashboard Analytics UI',
      category: 'UI Design',
      image: dashboardUI,
      accent: '#3b82f6',
      w: 200, h: 150, top: '3%', left: '30%', rotate: 4, z: 9,
      description:
        'Modern analytics dashboard featuring a clean sidebar navigation, real-time statistics cards, interactive chart visualizations, and an activity feed. Designed with dark mode aesthetics and data hierarchy in mind.',
      tools: ['Figma', 'React', 'Chart.js'],
      purpose:
        'To present complex data insights in an intuitive and visually appealing interface that helps users make data-driven decisions quickly.',
    },

    {
      id: 3,
      title: 'Mobile App Interface',
      category: 'App UI',
      image: mobileAppUI,
      accent: '#60a5fa',
      w: 180, h: 220, top: '5%', left: '58%', rotate: -3, z: 7,
      description:
        'Comprehensive mobile app design showcasing light mode, dark mode, and tablet variations. Features modern UI patterns including bottom navigation, card-based layouts, search functionality, and profile screens.',
      tools: ['Figma', 'React Native', 'Tailwind'],
      purpose:
        'To demonstrate responsive mobile design principles and create a consistent user experience across different devices and themes.',
    },

    {
      id: 4,
      title: 'Landing Page Wireframe',
      category: 'Web Design',
      image: landingWireframe,
      accent: '#fbbf24',
      w: 240, h: 160, top: '38%', left: '2%', rotate: 5, z: 10,
      description:
        'Conversion-focused landing page wireframe with browser chrome, navigation bar, hero section with CTA buttons, and feature cards. Includes annotations showing information architecture and user flow.',
      tools: ['Figma', 'Wireframing'],
      purpose:
        'To plan the structure and layout before visual design, ensuring optimal user journey and conversion optimization.',
    },

    {
      id: 5,
      title: 'Component Library',
      category: 'Design System',
      image: componentLibrary,
      accent: '#34d399',
      w: 200, h: 140, top: '36%', left: '35%', rotate: -4, z: 6,
      description:
        'Comprehensive UI component library featuring buttons, input fields, cards, badges, toggles, checkboxes, radio buttons, progress bars, and avatars. All components follow consistent design tokens.',
      tools: ['Figma', 'Storybook'],
      purpose:
        'To create a reusable design system that ensures consistency across products and speeds up the design-to-development workflow.',
    },

    {
      id: 6,
      title: 'Brand Identity System',
      category: 'Branding',
      image: brandIdentity,
      accent: '#c084fc',
      w: 210, h: 160, top: '34%', left: '62%', rotate: 6, z: 8,
      description:
        'Complete brand identity package including primary logo, color palette with hex codes, typography system, and logo variations (full color, monochrome, outline, icon-only) for different use cases.',
      tools: ['Figma', 'Illustrator'],
      purpose:
        'To establish a cohesive visual identity that can be consistently applied across all brand touchpoints and marketing materials.',
    },
  ],

  // Slide 2 - Graphic / Print Work
  [
    {
      id: 7,
      title: 'Social Media Graphics',
      category: 'Social Design',
      image: socialGraphics,
      accent: '#f472b6',
      w: 200, h: 260, top: '3%', left: '2%', rotate: -5, z: 9,
      description:
        'Collection of social media post designs for Instagram, Twitter/X banner, LinkedIn posts, and YouTube thumbnails. Features gradient backgrounds, modern typography, and platform-specific dimensions.',
      tools: ['Figma', 'Canva', 'Photoshop'],
      purpose:
        'To maintain consistent brand presence across social platforms while adapting to each platform\'s unique format and audience expectations.',
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
      title: 'College Magazine',
      category: 'Editorial',
      image: null,
      accent: '#fbbf24',
      w: 240, h: 150, top: '42%', left: '3%', rotate: 6, z: 10,
      description:
        'Complete magazine design with structured layout and strong typography.',
      tools: ['CorelDRAW'],
      purpose:
        'To create a professional publication for students.',
    },

    {
      id: 11,
      title: 'PRAXIS Brand Identity',
      category: 'Branding',
      image: null,
      accent: '#34d399',
      w: 200, h: 160, top: '40%', left: '38%', rotate: -3, z: 6,
      description:
        'Logo and visual identity system for PRAXIS coding platform club.',
      tools: ['Figma'],
      purpose:
        'To create a recognizable and consistent brand for the coding community.',
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
