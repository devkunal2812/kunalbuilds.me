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
import ecommerceUI from '../../figma-files/16_ecommerce-ui.svg'
import chatAppUI from '../../figma-files/17_chat-app-ui.svg'
import musicPlayerUI from '../../figma-files/18_music-player-ui.svg'

export const SLIDES = [
  // Slide 1 - UI / Product Work
  [
    {
      id: 1,
      title: 'Portfolio UI Hero Section',
      category: 'UI Design',
      image: ui1,
      accent: '#a3e635',
      w: 200, h: 150, top: '8%', left: '5%', rotate: -6, z: 8,
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
      w: 180, h: 135, top: '5%', left: '28%', rotate: 3, z: 9,
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
      w: 165, h: 195, top: '7%', left: '52%', rotate: -4, z: 7,
      description:
        'Comprehensive mobile app design showcasing light mode, dark mode, and tablet variations. Features modern UI patterns including bottom navigation, card-based layouts, search functionality, and profile screens.',
      tools: ['Figma', 'React Native', 'Tailwind'],
      purpose:
        'To demonstrate responsive mobile design principles and create a consistent user experience across different devices and themes.',
    },

    {
      id: 4,
      title: 'E-Commerce Product Page',
      category: 'Web Design',
      image: ecommerceUI,
      accent: '#ec4899',
      w: 190, h: 145, top: '6%', left: '73%', rotate: 5, z: 6,
      description:
        'Modern e-commerce product page with image gallery, color and size selection, quantity controls, and add to cart functionality. Features clean layout with product details and pricing.',
      tools: ['Figma', 'React', 'Stripe'],
      purpose:
        'To create an intuitive shopping experience that drives conversions and reduces cart abandonment.',
    },

    {
      id: 5,
      title: 'Landing Page Wireframe',
      category: 'Web Design',
      image: landingWireframe,
      accent: '#fbbf24',
      w: 210, h: 145, top: '38%', left: '4%', rotate: 4, z: 10,
      description:
        'Conversion-focused landing page wireframe with browser chrome, navigation bar, hero section with CTA buttons, and feature cards. Includes annotations showing information architecture and user flow.',
      tools: ['Figma', 'Wireframing'],
      purpose:
        'To plan the structure and layout before visual design, ensuring optimal user journey and conversion optimization.',
    },

    {
      id: 6,
      title: 'Component Library',
      category: 'Design System',
      image: componentLibrary,
      accent: '#34d399',
      w: 180, h: 125, top: '36%', left: '29%', rotate: -3, z: 6,
      description:
        'Comprehensive UI component library featuring buttons, input fields, cards, badges, toggles, checkboxes, radio buttons, progress bars, and avatars. All components follow consistent design tokens.',
      tools: ['Figma', 'Storybook'],
      purpose:
        'To create a reusable design system that ensures consistency across products and speeds up the design-to-development workflow.',
    },

    {
      id: 7,
      title: 'Brand Identity System',
      category: 'Branding',
      image: brandIdentity,
      accent: '#c084fc',
      w: 195, h: 145, top: '35%', left: '54%', rotate: 4, z: 8,
      description:
        'Complete brand identity package including primary logo, color palette with hex codes, typography system, and logo variations (full color, monochrome, outline, icon-only) for different use cases.',
      tools: ['Figma', 'Illustrator'],
      purpose:
        'To establish a cohesive visual identity that can be consistently applied across all brand touchpoints and marketing materials.',
    },

    {
      id: 8,
      title: 'Chat Application UI',
      category: 'App UI',
      image: chatAppUI,
      accent: '#06b6d4',
      w: 200, h: 135, top: '37%', left: '75%', rotate: -4, z: 7,
      description:
        'Real-time chat application interface with sidebar chat list, message threads, typing indicators, and media sharing. Features online status, read receipts, and emoji support.',
      tools: ['Figma', 'React', 'Socket.io'],
      purpose:
        'To create an engaging messaging experience with real-time communication and intuitive navigation.',
    },

    {
      id: 9,
      title: 'Music Player UI',
      category: 'App UI',
      image: musicPlayerUI,
      accent: '#8b5cf6',
      w: 175, h: 155, top: '62%', left: '6%', rotate: -5, z: 9,
      description:
        'Beautiful music player interface with album art, playback controls, progress bar, volume control, and up next playlist. Features gradient background and smooth animations.',
      tools: ['Figma', 'React', 'Web Audio API'],
      purpose:
        'To create an immersive music listening experience with intuitive controls and visual appeal.',
    },
  ],

  // Slide 2 - Graphic / Print Work
  [
    {
      id: 10,
      title: 'Social Media Graphics',
      category: 'Social Design',
      image: socialGraphics,
      accent: '#f472b6',
      w: 185, h: 230, top: '6%', left: '5%', rotate: -5, z: 9,
      description:
        'Collection of social media post designs for Instagram, Twitter/X banner, LinkedIn posts, and YouTube thumbnails. Features gradient backgrounds, modern typography, and platform-specific dimensions.',
      tools: ['Figma', 'Canva', 'Photoshop'],
      purpose:
        'To maintain consistent brand presence across social platforms while adapting to each platform\'s unique format and audience expectations.',
    },

    {
      id: 11,
      title: 'Yearbook Design',
      category: 'Print Design',
      image: null,
      accent: '#a3e635',
      w: 200, h: 145, top: '7%', left: '27%', rotate: 4, z: 8,
      description:
        'Full yearbook layout with consistent design language and grid system.',
      tools: ['CorelDRAW'],
      purpose:
        'To document student memories in a structured format.',
    },

    {
      id: 12,
      title: 'Event Poster',
      category: 'Graphic Design',
      image: null,
      accent: '#60a5fa',
      w: 175, h: 210, top: '6%', left: '51%', rotate: -4, z: 7,
      description:
        'High-impact poster with bold typography and strong visual hierarchy.',
      tools: ['CorelDRAW', 'Figma'],
      purpose:
        'To promote events and attract attention.',
    },

    {
      id: 13,
      title: 'College Magazine',
      category: 'Editorial',
      image: null,
      accent: '#fbbf24',
      w: 210, h: 135, top: '42%', left: '4%', rotate: 5, z: 10,
      description:
        'Complete magazine design with structured layout and strong typography.',
      tools: ['CorelDRAW'],
      purpose:
        'To create a professional publication for students.',
    },

    {
      id: 14,
      title: 'PRAXIS Brand Identity',
      category: 'Branding',
      image: null,
      accent: '#34d399',
      w: 185, h: 145, top: '40%', left: '29%', rotate: -3, z: 6,
      description:
        'Logo and visual identity system for PRAXIS coding platform club.',
      tools: ['Figma'],
      purpose:
        'To create a recognizable and consistent brand for the coding community.',
    },

    {
      id: 15,
      title: 'Business Card Design',
      category: 'Print Design',
      image: null,
      accent: '#8b5cf6',
      w: 195, h: 135, top: '39%', left: '54%', rotate: 4, z: 7,
      description:
        'Professional business card design with modern layout and contact information.',
      tools: ['Figma', 'CorelDRAW'],
      purpose:
        'To create memorable first impressions and professional networking materials.',
    },

    {
      id: 16,
      title: 'Infographic Design',
      category: 'Graphic Design',
      image: null,
      accent: '#06b6d4',
      w: 175, h: 190, top: '8%', left: '73%', rotate: -4, z: 8,
      description:
        'Data visualization infographic with icons, charts, and clear information hierarchy.',
      tools: ['Figma', 'Illustrator'],
      purpose:
        'To present complex data in an engaging and easy-to-understand visual format.',
    },

    {
      id: 17,
      title: 'Packaging Design',
      category: 'Product Design',
      image: null,
      accent: '#ec4899',
      w: 195, h: 145, top: '63%', left: '6%', rotate: 5, z: 9,
      description:
        'Product packaging design with brand elements and product information.',
      tools: ['Illustrator', 'Photoshop'],
      purpose:
        'To create attractive packaging that stands out on shelves and communicates brand values.',
    },
  ],

  // Slide 3 - Motion / Interaction
  [
    {
      id: 18,
      title: 'Scroll Animations',
      category: 'Web Animation',
      image: null,
      accent: '#a3e635',
      w: 195, h: 145, top: '7%', left: '6%', rotate: -5, z: 8,
      description:
        'Scroll-based animations with reveal effects and smooth transitions.',
      tools: ['Framer Motion', 'React'],
      purpose:
        'To create immersive web experiences.',
    },

    {
      id: 19,
      title: 'Micro Interactions',
      category: 'Interaction',
      image: null,
      accent: '#f472b6',
      w: 185, h: 135, top: '6%', left: '28%', rotate: 4, z: 9,
      description:
        'Small UI animations for buttons, forms, and feedback states.',
      tools: ['CSS', 'Framer Motion'],
      purpose:
        'To improve user experience and add delight.',
    },

    {
      id: 20,
      title: 'Hover Effects',
      category: 'Interaction',
      image: null,
      accent: '#60a5fa',
      w: 175, h: 200, top: '7%', left: '51%', rotate: -4, z: 7,
      description:
        'Interactive hover effects like tilt, glow, and magnetic movement.',
      tools: ['CSS', 'JavaScript'],
      purpose:
        'To add depth and interactivity to UI.',
    },

    {
      id: 21,
      title: 'Page Transitions',
      category: 'Motion',
      image: null,
      accent: '#fbbf24',
      w: 210, h: 140, top: '40%', left: '4%', rotate: 5, z: 10,
      description:
        'Smooth transitions between pages for app-like experience.',
      tools: ['Framer Motion'],
      purpose:
        'To improve navigation flow.',
    },

    {
      id: 22,
      title: 'Dev Visual Experiment',
      category: 'Creative',
      image: null,
      accent: '#34d399',
      w: 185, h: 135, top: '38%', left: '29%', rotate: -4, z: 6,
      description:
        'Visual system representing developer states like focus and debugging.',
      tools: ['JavaScript', 'Canvas'],
      purpose:
        'To experiment with creative coding ideas.',
    },

    {
      id: 23,
      title: 'Loading Animations',
      category: 'Motion',
      image: null,
      accent: '#8b5cf6',
      w: 195, h: 145, top: '37%', left: '54%', rotate: 4, z: 7,
      description:
        'Creative loading animations and skeleton screens for better perceived performance.',
      tools: ['CSS', 'Lottie'],
      purpose:
        'To keep users engaged during loading states and improve perceived performance.',
    },

    {
      id: 24,
      title: 'Gesture Controls',
      category: 'Interaction',
      image: null,
      accent: '#06b6d4',
      w: 175, h: 155, top: '8%', left: '73%', rotate: -3, z: 8,
      description:
        'Swipe, pinch, and drag gesture controls for mobile and touch interfaces.',
      tools: ['React', 'Hammer.js'],
      purpose:
        'To create intuitive touch-based interactions for mobile users.',
    },

    {
      id: 25,
      title: 'Parallax Effects',
      category: 'Web Animation',
      image: null,
      accent: '#ec4899',
      w: 195, h: 145, top: '62%', left: '6%', rotate: 5, z: 9,
      description:
        'Multi-layer parallax scrolling effects for depth and visual interest.',
      tools: ['JavaScript', 'GSAP'],
      purpose:
        'To add depth and create engaging storytelling experiences.',
    },
  ],
];
