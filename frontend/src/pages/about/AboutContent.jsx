import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Intro from './sections/Intro'
import TechStack from './sections/TechStack'
import Trayectoria from './sections/Trayectoria'
import Formacion from './sections/Formacion'
import Ficha from './sections/Ficha'
import Footer from '../../sections/Footer'

export default function AboutContent() {
  const { onSectionChange } = useOutletContext()
  useEffect(() => {
    const sections = document.querySelectorAll('#intro, #stack-ab, #trayectoria, #formacion, #ficha')
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
      <Ficha />
      <Footer />
    </div>
  )
}
