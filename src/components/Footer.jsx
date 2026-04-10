import { useNavigate } from 'react-router-dom'
import { FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="https://www.linkedin.com/in/pooja-gaur" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <FaLinkedin />
        </a>
        <button onClick={() => navigate('/contact')} className="footer-social-link">
          <FaEnvelope />
        </button>
      </div>
      <div className="footer-links">
        <button onClick={() => navigate('/experience')}>Experience</button>
        <button onClick={() => navigate('/skills')}>Skills</button>
        <button onClick={() => navigate('/education')}>Education</button>
        <button onClick={() => navigate('/certifications')}>Certifications</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
        <button onClick={() => navigate('/profiles')}>Switch Profile</button>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2025 Pooja Gaur. All rights reserved.</p>
        <p className="footer-tech">
          <FaCode /> Built with React
        </p>
      </div>
    </footer>
  )
}
