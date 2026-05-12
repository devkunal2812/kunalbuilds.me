import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect, createContext, useContext } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import About from './pages/About'
import DesignBoard from './pages/DesignBoard'
import Timeline from './pages/Timeline'
import Gallery from './pages/Gallery'
import FunFacts from './pages/FunFacts'
import Achievements from './pages/Achievements'
import PageLoader from './components/PageLoader'
import PageTransition from './components/PageTransition'
import BugModeOverlay from './components/BugModeOverlay'
import AvgCinematic from './components/AvgCinematic'
import ScrollProgress from './components/ScrollProgress'
import ExplorePanel from './components/ExplorePanel'
import ExploreButton from './components/ExploreButton'
import { useBugMode } from './hooks/useBugMode'
import { useAvgTrigger } from './hooks/useAvgTrigger'
import { useAnalytics } from './hooks/useAnalytics'
import { initializeGlobalProtection } from './utils/contentProtection'

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
      <About />
      <Footer />
    </PageTransition>
  )
}

function DesignBoardPage() {
  return <DesignBoard />
}

function TimelinePage() {
  return (
    <PageTransition>
      <Timeline />
      <Footer />
    </PageTransition>
  )
}

function GalleryPage() {
  return (
    <PageTransition>
      <Gallery />
      <Footer />
    </PageTransition>
  )
}

function FunFactsPage() {
  return (
    <PageTransition>
      <FunFacts />
      <Footer />
    </PageTransition>
  )
}

function AchievementsPage() {
  return (
    <PageTransition>
      <Achievements />
      <Footer />
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

  return <AvgCinematic isActive={isActive} onComplete={handleComplete} />
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

  return <BugModeOverlay isActive={true} />
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
      // Hide loader after 2.5 seconds (2s + 0.4s delay + 0.1s buffer)
      setTimeout(() => setShowLoader(false), 2500)
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
