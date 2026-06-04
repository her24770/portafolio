import { useRef, useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DetailCtx } from '../DetailContext'

export default function VideoPlayer({ src, poster }) {
  const videoRef   = useRef(null)
  const wrapRef    = useRef(null)
  const scrollRoot = useContext(DetailCtx)

  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [icon,     setIcon]     = useState(null) // 'play' | 'pause'

  // Auto-play when visible inside the overlay container
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { root: scrollRoot?.current ?? null, threshold: 0.5 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [scrollRoot])

  // Sync state with native video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay    = () => setPlaying(true)
    const onPause   = () => setPlaying(false)
    const onUpdate  = () => video.duration && setProgress(video.currentTime / video.duration)
    video.addEventListener('play',       onPlay)
    video.addEventListener('pause',      onPause)
    video.addEventListener('timeupdate', onUpdate)
    return () => {
      video.removeEventListener('play',       onPlay)
      video.removeEventListener('pause',      onPause)
      video.removeEventListener('timeupdate', onUpdate)
    }
  }, [])

  const handleMetadata = () => {
    const video = videoRef.current
    const container = wrapRef.current?.closest('.det-media')
    if (!video || !container) return
    const { videoWidth, videoHeight } = video
    if (videoWidth && videoHeight) {
      container.style.aspectRatio = `${videoWidth} / ${videoHeight}`
    }
  }

  const handleClick = () => {
    const video = videoRef.current
    if (!video) return
    let next
    if (video.paused) { video.play().catch(() => {}); next = 'play' }
    else              { video.pause();                  next = 'pause' }
    setIcon(next)
    setTimeout(() => setIcon(null), 650)
  }

  return (
    <div ref={wrapRef} className="vid-wrap" onClick={handleClick}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        onLoadedMetadata={handleMetadata}
      />

      {/* Click feedback — icon bursts then fades */}
      <AnimatePresence>
        {icon && (
          <motion.div
            key={icon}
            className="vid-icon-flash"
            initial={{ opacity: 0.85, scale: 0.65 }}
            animate={{ opacity: 0,    scale: 1.55 }}
            exit={{}}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {icon === 'play'
              ? <svg viewBox="0 0 24 24" width="48" height="48" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              : <svg viewBox="0 0 24 24" width="48" height="48" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom: playing indicator + progress bar */}
      <div className="vid-bottom">
        <AnimatePresence>
          {playing && (
            <motion.div
              className="vid-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="vid-dot" />
              reproduciendo
            </motion.div>
          )}
        </AnimatePresence>
        <div className="vid-bar">
          <div className="vid-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
