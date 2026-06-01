import { useEffect } from 'react'
import Projects from './Projects'
import Stack from './Stack'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'

export default function ContentPanel() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add('in')
        else en.target.classList.remove('in')
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div>
      <Projects />
      <Stack />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
