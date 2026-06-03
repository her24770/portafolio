import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import About from './About'
import Projects from './Projects'
import Stack from './Stack'
import Contact from './Contact'
import Footer from './Footer'

export default function ContentPanel() {
  const { onSectionChange } = useOutletContext()
  useEffect(() => {
    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal')
    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add('in')
        else en.target.classList.remove('in')
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    revealEls.forEach((el) => revealIO.observe(el))

    // Active section tracking
    const sections = document.querySelectorAll('section[id]')
    const sectionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) onSectionChange?.(en.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach((el) => sectionIO.observe(el))

    return () => {
      revealIO.disconnect()
      sectionIO.disconnect()
    }
  }, [onSectionChange])

  return (
    <div>
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
