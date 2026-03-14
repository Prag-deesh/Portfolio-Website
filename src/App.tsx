import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Qualification from './components/Qualification'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollUp from './components/ScrollUp'
import ConstellationField from './components/ConstellationField'
import GradientBlobs from './components/FloatingShapes'
import SectionReveal from './components/SectionReveal'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <>
      {/* Layer 0: Constellation canvas (opaque, draws its own bg + particles) */}
      <ConstellationField theme={theme} />

      {/* Layer 1: Gradient blobs floating above canvas */}
      <GradientBlobs theme={theme} />

      {/* Layer 2: Header (z-50 via own styles) */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Layer 3: Main content — transparent bg so particles show through */}
      <main className="relative z-10">
        <Home />
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
      </main>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default App
