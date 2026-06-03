const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

function normalize(p, index) {
  const primaryTechs = (p.technologies ?? []).filter(t => t.importance === 'primary')
  return {
    ...p,
    n: String(index + 1).padStart(2, '0'),
    image: p.thumbnail_url,
    desc: p.description,
    tags: primaryTechs.map(t => t.name),
  }
}

export async function fetchProjects() {
  const data = await get('/api/projects')
  return data.sort((a, b) => a.order - b.order).map((p, i) => normalize(p, i))
}

export async function fetchFeaturedProjects() {
  const data = await get('/api/projects/featured')
  return data.sort((a, b) => a.order - b.order).map((p, i) => normalize(p, i))
}

export async function fetchProject(slug) {
  const p = await get(`/api/projects/${slug}`)
  return normalize(p, p.order ?? 0)
}
