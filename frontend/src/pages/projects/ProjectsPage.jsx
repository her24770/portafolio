import Gallery from './components/Gallery'
import { PROJECTS } from '../../data/projects'

export default function ProjectsPage() {
  return <Gallery projects={PROJECTS} />
}
