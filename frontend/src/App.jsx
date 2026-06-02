import { useState, useEffect } from 'react'
import HomeLayout from './components/HomeLayout'
import ContentPanel from './sections/ContentPanel'

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <HomeLayout activeSection={activeSection} theme={theme} onThemeToggle={toggleTheme}>
      <ContentPanel onSectionChange={setActiveSection} />
    </HomeLayout>
  )
}
