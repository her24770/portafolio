import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import { fetchProjects } from '../../services/api'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      cargando proyectos…
    </div>
  )

  return <Gallery projects={projects} />
}
