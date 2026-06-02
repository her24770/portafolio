import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Hero from './Hero'

export default function HomeLayout({ children, activeSection, theme, onThemeToggle }) {
  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, { stiffness: 55, damping: 18, mass: 1 })

  const contentRef = useRef(null)
  const heroRef    = useRef(null)
  const [transitioned, setTransitioned] = useState(false)

  // Scroll abajo → hero se encoge a sidebar
  useEffect(() => {
    if (transitioned) return
    const onWheel = (e) => {
      if (e.deltaY > 0) {
        rawProgress.set(1)
        setTransitioned(true)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [transitioned, rawProgress])

  // Scroll arriba desde el tope → regresa a hero completo
  useEffect(() => {
    if (!transitioned) return
    const el = contentRef.current
    if (!el) return
    const onWheel = (e) => {
      if (e.deltaY < 0 && el.scrollTop === 0) {
        rawProgress.set(0)
        setTransitioned(false)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [transitioned, rawProgress])

  const contentScroll = useMotionValue(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const onScroll = () => contentScroll.set(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [contentScroll])

  // Reenviar wheel del panel izquierdo al panel derecho
  useEffect(() => {
    if (!transitioned) return
    const heroEl    = heroRef.current
    const contentEl = contentRef.current
    if (!heroEl || !contentEl) return
    const onWheel = (e) => { contentEl.scrollTop += e.deltaY }
    heroEl.addEventListener('wheel', onWheel, { passive: true })
    return () => heroEl.removeEventListener('wheel', onWheel)
  }, [transitioned])

  const heroWidth      = useTransform(progress, [0, 1], ['100%', '35%'])
  const contentWidth   = useTransform(progress, [0, 1], ['0%', '65%'])
  const contentOpacity = useTransform(progress, [0, 0.5], [0, 1])
  const contentX       = useTransform(progress, [0, 1], ['24px', '0px'])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex"
      style={{ background: 'var(--bg)' }}
    >
      {/* Panel izquierdo — Hero (estático) */}
      <motion.div
        ref={heroRef}
        className="relative z-20 h-full flex-shrink-0 overflow-hidden"
        style={{ width: heroWidth, background: 'var(--bg)' }}
      >
        <Hero progress={progress} activeSection={activeSection} contentScroll={contentScroll} theme={theme} onThemeToggle={onThemeToggle} />
      </motion.div>

      {/* Panel derecho — contenido scrolleable */}
      <motion.div
        ref={contentRef}
        className="scroll-container relative z-10 h-full overflow-y-auto flex-shrink-0"
        style={{
          width: contentWidth,
          opacity: contentOpacity,
          x: contentX,
          background: 'var(--bg)',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
