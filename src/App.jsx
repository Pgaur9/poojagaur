import { Routes, Route } from 'react-router-dom'
import NetflixIntro from './components/NetflixIntro'
import ProfileSelect from './components/ProfileSelect'
import Browse from './components/Browse'
import ExperiencePage from './components/ExperiencePage'
import SkillsPage from './components/SkillsPage'
import EducationPage from './components/EducationPage'
import CertificationsPage from './components/CertificationsPage'
import ContactPage from './components/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NetflixIntro />} />
      <Route path="/profiles" element={<ProfileSelect />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
