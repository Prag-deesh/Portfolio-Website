import { useState, useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import ConstellationField from './components/ConstellationField'
import GradientBlobs from './components/FloatingShapes'
import SectionReveal from './components/SectionReveal'
import { initAnalytics } from './helpers/analytics'

// Lazy load below-the-fold sections — only fetched when needed
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Qualification = lazy(() => import('./components/Qualification'))
const Work = lazy(() => import('./components/Work'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const ScrollUp = lazy(() => import('./components/ScrollUp'))

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    // Sync theme-color meta tag for mobile browsers
    const color = theme === 'dark' ? '#121212' : '#fafafa'
    document.querySelector('meta[name="theme-color"][media*="light"]')?.setAttribute('content', color)
    document.querySelector('meta[name="theme-color"][media*="dark"]')?.setAttribute('content', color)
  }, [theme])

  // Analytics — fire once on mount
  useEffect(() => { initAnalytics() }, [])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <ConstellationField theme={theme} />
      <GradientBlobs theme={theme} />
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 overflow-visible">
        <Home />
        <Suspense fallback={null}>
          <SectionReveal parallaxY={30}>
            <About />
          </SectionReveal>
          <SectionReveal parallaxY={25} scaleFrom={0.98}>
            <Skills />
          </SectionReveal>
          <SectionReveal parallaxY={35}>
            <Qualification />
          </SectionReveal>
          <SectionReveal parallaxY={30} scaleFrom={0.98}>
            <Work />
          </SectionReveal>
          <SectionReveal parallaxY={25}>
            <Contact />
          </SectionReveal>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <ScrollUp />
      </Suspense>
    </>
  )
}

export default App
