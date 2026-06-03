import { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import AboutContent from './AboutContent'

const ABOUT_NAV = [
  { id: 'intro',        label: 'Sobre mí'    },
  { id: 'formacion',    label: 'Formación'   },
  { id: 'fortalezas',   label: 'Fortalezas'  },
  { id: 'trayectoria',  label: 'Trayectoria' },
  { id: 'stack-ab',     label: 'Stack'       },
]

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('intro')
  return (
    <HomeLayout activeSection={activeSection} navItems={ABOUT_NAV} startCollapsed>
      <AboutContent onSectionChange={setActiveSection} />
    </HomeLayout>
  )
}
