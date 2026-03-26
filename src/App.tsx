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
    // Sync theme-color meta tag for mobile browsers
    const color = theme === 'dark' ? '#121212' : '#fafafa'
    document.querySelector('meta[name="theme-color"][media*="light"]')?.setAttribute('content', color)
    document.querySelector('meta[name="theme-color"][media*="dark"]')?.setAttribute('content', color)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <ConstellationField theme={theme} />
      <GradientBlobs theme={theme} />
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 overflow-visible">
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
