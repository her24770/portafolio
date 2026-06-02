import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import HomeLayout from './components/HomeLayout'
import ContentPanel from './sections/ContentPanel'
import ProjectsPage from './pages/projects/ProjectsPage'

function HomePage() {
  const [activeSection, setActiveSection] = useState('about')
  return (
    <HomeLayout activeSection={activeSection}>
      <ContentPanel onSectionChange={setActiveSection} />
    </HomeLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
