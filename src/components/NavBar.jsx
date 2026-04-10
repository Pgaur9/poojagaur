import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  FaSearch, FaBell, FaCaretDown, FaBars, FaTimes,
  FaHome, FaBriefcase, FaTools, FaGraduationCap,
  FaCertificate, FaEnvelope
} from 'react-icons/fa'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const profileName = params.get('profile') || 'Recruiter'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', path: `/browse?profile=${profileName}`, icon: FaHome },
    { label: 'Experience', path: '/experience', icon: FaBriefcase },
    { label: 'Skills', path: '/skills', icon: FaTools },
    { label: 'Education', path: '/education', icon: FaGraduationCap },
    { label: 'Certifications', path: '/certifications', icon: FaCertificate },
    { label: 'Contact', path: '/contact', icon: FaEnvelope },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate(`/browse?profile=${profileName}`)}>
            POOJA GAUR
          </div>
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="navbar-link"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div className="navbar-right">
          <div className={`navbar-search ${searchOpen ? 'open' : ''}`}>
            <FaSearch
              className="navbar-search-icon"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            {searchOpen && (
              <input
                type="text"
                placeholder="Skills, companies, tech..."
                value={searchQuery}
                onChange={handleSearch}
                className="navbar-search-input"
                autoFocus
              />
            )}
          </div>
          <FaBell className="navbar-icon" />
          <div className="navbar-profile-menu">
            <div className="navbar-avatar" style={{ background: 'linear-gradient(135deg, #e50914, #b20710)' }}>
              PG
            </div>
            <FaCaretDown className="navbar-caret" />
            <div className="navbar-dropdown">
              <button onClick={() => navigate('/profiles')}>Switch Profile</button>
              <button onClick={() => navigate('/contact')}>Contact</button>
              <button onClick={() => navigate('/')}>Sign Out</button>
            </div>
          </div>
          <button className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {/* Mobile sidebar */}
      <div className={`mobile-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-sidebar-content">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.label}
                className="mobile-sidebar-link"
                onClick={() => { navigate(link.path); setMobileOpen(false) }}
              >
                <Icon /> {link.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
