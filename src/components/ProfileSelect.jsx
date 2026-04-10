import { useNavigate } from 'react-router-dom'
import { profiles } from '../data/portfolio'
import {
  FaBriefcase, FaCode, FaUsers, FaCompass
} from 'react-icons/fa'

const iconMap = {
  briefcase: FaBriefcase,
  code: FaCode,
  users: FaUsers,
  compass: FaCompass,
}

export default function ProfileSelect() {
  const navigate = useNavigate()

  const handleSelect = (profileName) => {
    navigate(`/browse?profile=${profileName}`)
  }

  return (
    <div className="profile-select-screen">
      <div className="profile-select-content">
        <h1 className="profile-select-title">Who's Watching?</h1>
        <div className="profile-grid">
          {profiles.map((p, i) => {
            const Icon = iconMap[p.icon]
            return (
              <button
                key={p.name}
                className="profile-card"
                onClick={() => handleSelect(p.name)}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="profile-avatar"
                  style={{ background: p.gradient }}
                >
                  <Icon size={48} />
                </div>
                <span className="profile-name">{p.name}</span>
                <span className="profile-desc">{p.description}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
