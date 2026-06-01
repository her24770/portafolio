/**
 * ContentPanel
 * Panel izquierdo — aquí irán todas las secciones:
 * Proyectos, Stack, Sobre mí, Contacto, etc.
 *
 * Por ahora es un placeholder visual para validar el layout y la animación.
 */
export default function ContentPanel() {
  return (
    <div className="px-12 py-16 min-h-screen">

      {/* Sección placeholder — Proyectos */}
      <section className="mb-24">
        <p className="text-xs font-semibold tracking-widest text-violet-500 uppercase mb-2">
          Proyectos destacados
        </p>
        <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
          Lo que he<br />construido.
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {['Proyecto Alpha', 'Proyecto Beta', 'Proyecto Gamma'].map((name, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-violet-200 transition-colors"
            >
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-violet-100 to-cyan-50 mb-4" />
              <h3 className="font-bold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">Descripción breve del proyecto.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección placeholder — Stack */}
      <section className="mb-24">
        <p className="text-xs font-semibold tracking-widest text-cyan-500 uppercase mb-2">
          Stack
        </p>
        <h2 className="text-4xl font-black text-gray-900 mb-6">
          Herramientas.
        </h2>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Framer Motion'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Sección placeholder — Sobre mí */}
      <section className="mb-24">
        <p className="text-xs font-semibold tracking-widest text-violet-500 uppercase mb-2">
          Sobre mí
        </p>
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Un poco de mí.
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-sm">
          Desarrollador frontend apasionado por crear interfaces que combinan
          funcionalidad y estética. Me enfoco en la experiencia del usuario
          y el detalle visual.
        </p>
      </section>

    </div>
  )
}
