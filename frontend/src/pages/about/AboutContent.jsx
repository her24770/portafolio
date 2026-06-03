import { useEffect } from 'react'
import Intro from './sections/Intro'
import TechStack from './sections/TechStack'
import Trayectoria from './sections/Trayectoria'
import Formacion from './sections/Formacion'

export default function AboutContent({ onSectionChange }) {
  useEffect(() => {
    const sections = document.querySelectorAll('#intro, #stack-ab, #trayectoria, #formacion')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) onSectionChange?.(en.target.id) }),
      { threshold: 0.3 }
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [onSectionChange])

  return (
    <div>
      <Intro />
      <TechStack />
      <Trayectoria />
      <Formacion />
    </div>
  )
}
