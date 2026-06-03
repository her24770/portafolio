import { motion } from 'framer-motion'
import Icon from '../../../../components/Icon'

export default function NextProject({ project, onNavigate }) {
  return (
    <section className="det-next">
      <div className="det-next-inner">
        <motion.div
          className="det-next-row"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.18 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: orb image */}
          <div className="det-next-orb" onClick={onNavigate}>
            <img src={project.image} alt={project.title} />
          </div>

          {/* Right: text */}
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
