import { useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function ContentRow({ title, items, onCardClick, delay = 0 }) {
  const rowRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const scroll = (dir) => {
    const el = rowRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const el = rowRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 20)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20)
  }

  return (
    <section className="content-row-section" style={{ animationDelay: `${delay}s` }}>
      <h2 className="row-title">{title}</h2>
      <div className="content-row-wrapper">
        {showLeft && (
          <button className="row-arrow row-arrow-left" onClick={() => scroll('left')}>
            <FaChevronLeft />
          </button>
        )}
        <div className="content-row" ref={rowRef} onScroll={handleScroll}>
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className="content-card"
              onClick={() => onCardClick(item)}
              style={{ animationDelay: `${i * 0.07 + delay}s` }}
            >
              <div className="card-thumbnail" style={{ background: item.gradient }}>
                <div className="card-thumbnail-content">
                  {item.company && <span className="card-company-initial">{item.company?.[0] || item.title?.[0]}</span>}
                  {!item.company && item.institution && <span className="card-company-initial">{item.institution?.[0]}</span>}
                  {!item.company && !item.institution && item.issuer && <span className="card-company-initial">{item.issuer?.[0]}</span>}
                  {!item.company && !item.institution && !item.issuer && <span className="card-company-initial">{item.title?.[0]}</span>}
                </div>
                {item.isNew && <span className="card-badge-new">NEW</span>}
                {item.matchPercent >= 95 && <span className="card-badge-hd">HD</span>}
              </div>
              <div className="card-info">
                <div className="card-info-row">
                  <span className="card-match">{item.matchPercent}% Match</span>
                  {item.maturity && <span className="card-maturity">{item.maturity}</span>}
                  {item.badge && <span className="card-period">{item.badge}</span>}
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-subtitle">{item.subtitle}</p>
                {item.skills && (
                  <div className="card-tags">
                    {(item.skills || []).slice(0, 4).map((s) => {
                      const skillName = typeof s === 'string' ? s : s.name
                      return <span key={skillName} className="card-tag">{skillName}</span>
                    })}
                    {(item.skills || []).length > 4 && (
                      <span className="card-tag card-tag-more">+{item.skills.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showRight && items.length > 3 && (
          <button className="row-arrow row-arrow-right" onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  )
}
