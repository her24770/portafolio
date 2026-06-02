import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Hero from './Hero'

export default function HomeLayout({ children, activeSection }) {
  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, { stiffness: 55, damping: 18, mass: 1 })

  const contentRef = useRef(null)
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

  const heroWidth   = useTransform(progress, [0, 1], ['100%', '35%'])
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
        className="relative z-20 h-full flex-shrink-0 overflow-hidden"
        style={{ width: heroWidth, background: 'var(--bg)' }}
      >
        <Hero progress={progress} activeSection={activeSection} />
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
