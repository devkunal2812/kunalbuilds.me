import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
import Resume from './pages/Resume'
import Achievements from './pages/Achievements'
import PageLoader from './components/PageLoader'
import PageTransition from './components/PageTransition'
import BugModeOverlay from './components/BugModeOverlay'
import AvgCinematic from './components/AvgCinematic'
import ScrollProgress from './components/ScrollProgress'
import { useBugMode } from './hooks/useBugMode'
import { useAvgTrigger } from './hooks/useAvgTrigger'
import { initializeGlobalProtection } from './utils/contentProtection'

function Home() {
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

function ResumePage() {
  return (
    <PageTransition>
      <Resume />
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

export default function App() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(true)
  const { isBugMode } = useBugMode()
  const { isCinematicActive, onCinematicComplete } = useAvgTrigger({ keyword: 'avg' })
  
  // Hide nav on design board page
  const isDesignBoard = location.pathname === '/design-board'

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

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      {showLoader && <PageLoader />}
      <ScrollProgress />
      <BugModeOverlay isActive={isBugMode} />
      {isCinematicActive && <AvgCinematic isActive={isCinematicActive} onComplete={onCinematicComplete} />}
      {!isDesignBoard && <Nav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/design-board" element={<DesignBoardPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/fun-facts" element={<FunFactsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
