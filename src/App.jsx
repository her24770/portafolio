import { useState } from 'react'
import HomeLayout from './components/HomeLayout'
import ContentPanel from './sections/ContentPanel'

export default function App() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <HomeLayout activeSection={activeSection}>
      <ContentPanel onSectionChange={setActiveSection} />
    </HomeLayout>
  )
}
