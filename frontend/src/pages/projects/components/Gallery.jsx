import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import Panel from './Panel'

/* ── helpers ── */
const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

function falloff(ao) {
  let scale, opacity
  if (ao <= 1)      { scale = lerp(1.38, 0.58, ao);       opacity = lerp(1, 0.42, ao) }
  else if (ao <= 2) { scale = lerp(0.58, 0.34, ao - 1);   opacity = lerp(0.42, 0.18, ao - 1) }
  else if (ao <= 3) { scale = lerp(0.34, 0.22, ao - 2);   opacity = lerp(0.18, 0.07, ao - 2) }
  else              { scale = lerp(0.22, 0.18, clamp(ao - 3, 0, 1)); opacity = lerp(0.07, 0, clamp(ao - 3, 0, 1)) }
  return { scale, opacity }
}

function computeLayout(N) {
  N = N || 8
  const W = window.innerWidth, H = window.innerHeight
  const panelW = Math.max(400, W * 0.42)
  const rightW = W - panelW
  const D = clamp(Math.min(rightW * 0.64, H * 0.5), 240, 430)
  const activeX = panelW + rightW * 0.46
  const cy = H * 0.5
  const R = Math.max(H * 0.72, 540)
  const cx = activeX + R
  const step = (32 * Math.PI) / 180
  const introScale = 0.38
  const itemD = introScale * D
  const maxFit = Math.min(W, H) / 2 - itemD / 2 - 26
  const need = (itemD * 1.32 * N) / (2 * Math.PI)
  const Rintro = clamp(need, 170, maxFit)
  return { W, H, panelW, D, cx, cy, R, step, sx: W * 0.5, sy: H * 0.5, Rintro, introScale }
}

function galleryPlace(offset, L) {
  const theta = Math.PI - offset * L.step
  const x = L.cx + L.R * Math.cos(theta)
  const y = L.cy + L.R * Math.sin(theta)
  const { scale, opacity } = falloff(Math.abs(offset))
  return { x, y, scale, opacity }
}

function ringPlace(i, n, rot, L) {
  const ang = (i / n) * Math.PI * 2 + rot - Math.PI / 2
  return {
    x: L.sx + L.Rintro * Math.cos(ang),
    y: L.sy + L.Rintro * Math.sin(ang),
    scale: L.introScale,
    opacity: 0.92,
  }
}

export default function Gallery({ projects }) {
  const N = projects.length
  const stageRef    = useRef(null)
  const itemRefs    = useRef([])
  const layoutRef   = useRef(computeLayout(N))
  const posRef      = useRef(0)
  const targetRef   = useRef(0)
  const introRef    = useRef(0)
  const ringRestRef = useRef([])
  const panelRef    = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [dir, setDir]                 = useState(1)
  const [introReady, setIntroReady]   = useState(false)

  const applyFrame = useCallback(() => {
    const L = layoutRef.current
    const introT = introRef.current
    const pos = posRef.current
    const ringHold = 0.46

    const wrap = (raw) => {
      let o = raw % N
      if (o > N / 2) o -= N
      if (o < -N / 2) o += N
      return o
    }

    for (let i = 0; i < N; i++) {
      const el = itemRefs.current[i]
      if (!el) continue
      const off = wrap(i - pos)
      let place
      if (introT >= 1) {
        place = galleryPlace(off, L)
      } else if (introT < ringHold) {
        const ph = easeOut(introT / ringHold)
        const rot = lerp(-Math.PI * 0.6, 0, ph)
        place = ringPlace(i, N, rot, L)
        const appear = clamp((introT / ringHold) * 2.4 - i * 0.06, 0, 1)
        place = { ...place, opacity: place.opacity * appear }
      } else {
        const ph = easeInOut((introT - ringHold) / (1 - ringHold))
        const start = ringRestRef.current[i] || ringPlace(i, N, 0, L)
        const end = galleryPlace(i, L)
        place = {
          x: lerp(start.x, end.x, ph),
          y: lerp(start.y, end.y, ph),
          scale: lerp(start.scale, end.scale, ph),
          opacity: lerp(start.opacity, end.opacity, ph),
        }
      }
      el.style.transform = `translate3d(${place.x}px,${place.y}px,0) translate(-50%,-50%) scale(${place.scale})`
      el.style.opacity = place.opacity.toFixed(3)
      el.style.zIndex = String(Math.round(1000 - Math.abs(off) * 100))
    }

    if (panelRef.current) {
      const pv = introT >= 1 ? 1 : clamp((introT - 0.64) / 0.3, 0, 1)
      panelRef.current.style.opacity = pv.toFixed(3)
      panelRef.current.style.transform = `translateY(${lerp(14, 0, pv).toFixed(1)}px)`
    }
  }, [N])

  useLayoutEffect(() => {
    layoutRef.current = computeLayout(N)
    ringRestRef.current = projects.map((_, i) => ringPlace(i, N, 0, layoutRef.current))
    applyFrame()
  }, []) // eslint-disable-line

  useEffect(() => {
    let raf
    const introDuration = 2900
    let introStart = null
    ringRestRef.current = projects.map((_, i) => ringPlace(i, N, 0, layoutRef.current))

    const loop = (ts) => {
      if (introRef.current < 1) {
        if (introStart === null) introStart = ts
        const t = clamp((ts - introStart) / introDuration, 0, 1)
        introRef.current = t
        if (t > 0.72 && !introReady) setIntroReady(true)
        if (t >= 1) {
          introRef.current = 1
          setIntroReady(true)
        }
      } else {
        const d = targetRef.current - posRef.current
        if (Math.abs(d) > 0.0005) posRef.current += d * 0.12
        else posRef.current = targetRef.current
      }
      applyFrame()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const fallback = setTimeout(() => {
      if (introRef.current < 1) {
        introRef.current = 1; setIntroReady(true)
        applyFrame()
      }
    }, introDuration + 900)

    return () => { cancelAnimationFrame(raf); clearTimeout(fallback) }
  }, []) // eslint-disable-line

  useEffect(() => {
    const onResize = () => {
      layoutRef.current = computeLayout(N)
      ringRestRef.current = projects.map((_, i) => ringPlace(i, N, 0, layoutRef.current))
      applyFrame()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyFrame, N, projects])

  const mod = (x) => ((x % N) + N) % N

  const step = useCallback((d) => {
    setDir(d > 0 ? 1 : -1)
    targetRef.current += d
    setActiveIndex(mod(targetRef.current))
  }, [N]) // eslint-disable-line

  const goTo = useCallback((i) => {
    const cur = mod(targetRef.current)
    let delta = i - cur
    if (delta > N / 2) delta -= N
    if (delta < -N / 2) delta += N
    if (delta === 0) return
    setDir(delta > 0 ? 1 : -1)
    targetRef.current += delta
    setActiveIndex(mod(targetRef.current))
  }, [N]) // eslint-disable-line

  useEffect(() => {
    let acc = 0, lock = false, touchY = null
    const fire = (delta) => {
      if (introRef.current < 1) return
      acc += delta
      if (!lock && Math.abs(acc) > 36) {
        lock = true
        step(acc > 0 ? 1 : -1)
        acc = 0
        setTimeout(() => { lock = false }, 560)
      }
    }
    const onWheel = (e) => { e.preventDefault(); fire(e.deltaY) }
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); step(-1) }
    }
    const onTouchStart = (e) => { touchY = e.touches[0].clientY }
    const onTouchMove  = (e) => {
      if (touchY === null) return
      const dy = touchY - e.touches[0].clientY
      if (Math.abs(dy) > 44) { fire(dy * 4); touchY = e.touches[0].clientY }
    }
    const node = stageRef.current
    node.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    node.addEventListener('touchstart', onTouchStart, { passive: true })
    node.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      node.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchmove', onTouchMove)
    }
  }, [step])

  return (
    <div className="pg-stage" ref={stageRef}>
      <Panel
        index={activeIndex} dir={dir} total={N}
        projects={projects} panelRef={panelRef}
      />

      <div className="pg-wheel">
        {projects.map((p, i) => (
          <div
            key={i}
            className="pg-orb"
            ref={el => (itemRefs.current[i] = el)}
            onClick={() => introRef.current >= 1 && goTo(i)}
            style={{ width: layoutRef.current.D, height: layoutRef.current.D }}
          >
            <div className="pg-orb-ring" />
            <div className="pg-orb-img" key={'img' + (i === activeIndex ? 'a' : '')}>
              <img
                src={p.image} alt={p.title.replace('\n', ' ')}
                draggable="false"
                className={i === activeIndex ? 'pg-zoom' : ''}
              />
            </div>
            <span className="pg-orb-num">{p.n}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
