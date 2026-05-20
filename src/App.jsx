import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect, createContext, useContext, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import PageLoader from './components/PageLoader'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import ExplorePanel from './components/ExplorePanel'
import ExploreButton from './components/ExploreButton'
import { useBugMode } from './hooks/useBugMode'
import { useAvgTrigger } from './hooks/useAvgTrigger'
import { useAnalytics } from './hooks/useAnalytics'
import { MARQUEE_ITEMS } from './data/marqueeItems'
import { initializeGlobalProtection } from './utils/contentProtection'
import 'lenis/dist/lenis.css'

// Lazy load pages that are not immediately needed
const About = lazy(() => import('./pages/About'))
const DesignBoard = lazy(() => import('./pages/DesignBoard'))
const Timeline = lazy(() => import('./pages/Timeline'))
const Gallery = lazy(() => import('./pages/Gallery'))
const FunFacts = lazy(() => import('./pages/FunFacts'))
const Achievements = lazy(() => import('./pages/Achievements'))
const BugModeOverlay = lazy(() => import('./components/BugModeOverlay'))
const AvgCinematic = lazy(() => import('./components/AvgCinematic'))

// Create context for Explore Panel
const ExplorePanelContext = createContext()

export const useExplorePanel = () => {
  const context = useContext(ExplorePanelContext)
  if (!context) {
    throw new Error('useExplorePanel must be used within ExplorePanelProvider')
  }
  return context
}

function Home() {
  // Enable easter egg triggers on home page
  useBugMode()
  useAvgTrigger()
  
  return (
    <PageTransition>
      <main id="main-content">
        <Hero />
        <MarqueeStrip items={MARQUEE_ITEMS} />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </PageTransition>
  )
}

function AboutPage() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <About />
        <Footer />
      </Suspense>
    </PageTransition>
  )
}

function DesignBoardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DesignBoard />
    </Suspense>
  )
}

function TimelinePage() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Timeline />
        <Footer />
      </Suspense>
    </PageTransition>
  )
}

function GalleryPage() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Gallery />
        <Footer />
      </Suspense>
    </PageTransition>
  )
}

function FunFactsPage() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <FunFacts />
        <Footer />
      </Suspense>
    </PageTransition>
  )
}

function AchievementsPage() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Achievements />
        <Footer />
      </Suspense>
    </PageTransition>
  )
}

function AvgEasterEggPage() {
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate()

  const handleComplete = () => {
    setIsActive(false)
    navigate('/')
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <AvgCinematic isActive={isActive} onComplete={handleComplete} />
    </Suspense>
  )
}

function BugEasterEggPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Suspense fallback={<PageLoader />}>
      <BugModeOverlay isActive={true} />
    </Suspense>
  )
}

export default function App() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(true)
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false)
  
  // Initialize analytics tracking
  useAnalytics()
  
  // Hide nav and explore button on design board and easter egg pages
  const isDesignBoard = location.pathname === '/design-board'
  const isEasterEgg = location.pathname.startsWith('/secret/')
  const showExploreButton = !isDesignBoard && !isEasterEgg

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Show loader only on initial page load
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    if (hasLoaded) {
      setShowLoader(false)
    } else {
      sessionStorage.setItem('hasLoaded', 'true')
      // Hide loader after 5.6 seconds (5s + 0.6s fade out)
      setTimeout(() => setShowLoader(false), 5600)
    }
  }, [])

  // Initialize global content protection
  useEffect(() => {
    const cleanup = initializeGlobalProtection()
    return cleanup
  }, [])

  const openExplorePanel = () => {
    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'instant' })
    setIsExplorePanelOpen(true)
  }

  const closeExplorePanel = () => {
    setIsExplorePanelOpen(false)
  }

  return (
    <ExplorePanelContext.Provider value={{ openExplorePanel, closeExplorePanel }}>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      {showLoader && <PageLoader />}
      <ScrollProgress />
      {!isDesignBoard && <Nav />}
      
      {/* Global Explore Button */}
      {showExploreButton && <ExploreButton />}
      
      {/* Explore Panel at root level */}
      <ExplorePanel isOpen={isExplorePanelOpen} onClose={closeExplorePanel} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/design-board" element={<DesignBoardPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/fun-facts" element={<FunFactsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/secret/avg" element={<AvgEasterEggPage />} />
          <Route path="/secret/bug" element={<BugEasterEggPage />} />
        </Routes>
      </AnimatePresence>
    </ExplorePanelContext.Provider>
  )
}
