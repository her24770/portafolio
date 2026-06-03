import { motion } from 'framer-motion'
import Icon from '../../../../components/Icon'

export default function NextProject({ project, onNavigate, prev, onPrev }) {
  return (
    <section className="det-next">
      <div className="det-next-inner">

        {/* ── Proyecto anterior (compacto) ── */}
        {prev && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}
          >
            <button className="det-prev-btn" onClick={onPrev}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              <span>
                <span className="det-prev-label">proyecto anterior</span>
                <span className="det-prev-title">{prev.title}</span>
              </span>
            </button>
          </motion.div>
        )}

        {/* ── Siguiente proyecto (grande) ── */}
        <motion.div
          className="det-next-row"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.18 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="det-next-orb" onClick={onNavigate}>
            <img src={project.image} alt={project.title} />
          </div>

          <div className="det-next-text">
            <p className="det-next-kicker">siguiente proyecto</p>
            <h2 className="det-next-title">{project.title}</h2>
            <p className="det-next-desc">{project.desc}</p>
            <button className="det-next-cta" onClick={onNavigate}>
              Ver proyecto <Icon name="arrow" width={15} height={15} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
