import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Intro from './sections/Intro'
import Formacion from './sections/Formacion'
import Fortalezas from './sections/Fortalezas'
import Trayectoria from './sections/Trayectoria'
import TechStack from './sections/TechStack'
import Ficha from './sections/Ficha'
import Footer from '../../sections/Footer'

export default function AboutContent() {
  const { onSectionChange } = useOutletContext()

  useEffect(() => {
    const sections = document.querySelectorAll('#intro, #formacion, #fortalezas, #trayectoria, #stack-ab, #ficha')
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
      <Formacion />
      <Fortalezas />
      <Trayectoria />
      <TechStack />
      <Ficha />
      <Footer />
    </div>
  )
}
