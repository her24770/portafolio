import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import MainLayout from './components/MainLayout'
import ContentPanel from './sections/ContentPanel'
import AboutContent from './pages/about/AboutContent'
import ProjectsPage from './pages/projects/ProjectsPage'
import ProjectDetail from './pages/projects/detail/ProjectDetail'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ContentPanel />} />
            <Route path="/about" element={<AboutContent />} />
          </Route>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
