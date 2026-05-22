import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const [counters, setCounters] = useState({ foods: 0, places: 0 })

  // Intersection Observer for scroll-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.2 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Counter animation for statistics section
  useEffect(() => {
    const section = document.querySelector('.stats-section')
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && counters.foods === 0) {
          animateCounter()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const animateCounter = () => {
    const duration = 2000
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCounters({
        foods: Math.floor(500 * progress),
        places: Math.floor(10000 * progress),
      })

      if (progress === 1) clearInterval(timer)
    }, 30)
  }

  return (
    <div className="landing-page">
      {/* Section 1: Hero */}
      <section className="hero-section">
        <div className="hero-background-tomato">
          <svg viewBox="0 0 200 200" className="bg-tomato-svg">
            <circle cx="100" cy="110" r="80" fill="#e63535" opacity="0.08" />
          </svg>
        </div>

        <div className="hero-content">
          <div className="mascot-container">
            <svg viewBox="0 0 200 200" className="tomato-mascot">
              {/* 토마토 몸통 */}
              <circle cx="100" cy="110" r="80" fill="#e63535" />
              {/* 하이라이트 */}
              <ellipse cx="75" cy="80" rx="20" ry="12" fill="rgba(255,255,255,0.2)" />
              {/* 꼭지 잎들 */}
              <ellipse
                cx="100"
                cy="35"
                rx="8"
                ry="20"
                fill="#2ecc71"
                transform="rotate(-20 100 35)"
              />
              <ellipse
                cx="100"
                cy="35"
                rx="8"
                ry="20"
                fill="#27ae60"
                transform="rotate(20 100 35)"
              />
              <ellipse cx="100" cy="35" rx="6" ry="18" fill="#2ecc71" />
              {/* 줄기 */}
              <rect x="97" y="30" width="6" height="20" rx="3" fill="#27ae60" />
            </svg>
          </div>

          <div className="hero-text">
            <h1 className="hero-title">지금 뜨는 음식, 어디서 먹을까?</h1>
            <p className="hero-subtitle">
              토마토마가 트렌드 음식 판매처를 실시간으로 찾아드립니다
            </p>
            <button className="cta-button" onClick={() => navigate('/app')}>
              지금 시작하기 →
            </button>
          </div>

          <div className="scroll-indicator">
            <span className="arrow">↓</span>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="features-section">
        <h2 className="section-title reveal">토마토마만의 특별함</h2>
        <div className="features-grid">
          <div className="feature-card reveal">
            <div className="feature-icon">🔥</div>
            <h3 className="feature-title">실시간 트렌드</h3>
            <p className="feature-description">
              SNS와 검색 데이터를 분석해 지금 가장 핫한 음식을 알려드려요
            </p>
          </div>

          <div className="feature-card reveal">
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">내 주변 판매처</h3>
            <p className="feature-description">
              현재 위치 기반으로 트렌드 음식을 파는 곳을 지도에서 바로 찾아요
            </p>
          </div>

          <div className="feature-card reveal">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">나만의 리스트</h3>
            <p className="feature-description">
              관심 있는 음식과 장소를 저장하고 언제든 다시 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Ad Copy */}
      <section className="ad-section reveal">
        <div className="ad-content">
          <h2 className="ad-title">"오늘 뭐 먹지?" 고민은 이제 그만.</h2>
          <p className="ad-subtitle">
            토마토마와 함께라면 매일매일 새로운 맛집 발견
          </p>
        </div>
      </section>

      {/* Section 4: Statistics */}
      <section className="stats-section reveal">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{counters.foods.toLocaleString()}+</div>
            <div className="stat-label">트렌드 음식</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{counters.places.toLocaleString()}+</div>
            <div className="stat-label">판매처</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">매일</div>
            <div className="stat-label">업데이트</div>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="final-cta-section reveal">
        <div className="final-cta-content">
          <h2 className="final-cta-title">지금 바로 시작해보세요</h2>
          <p className="final-cta-subtitle">
            회원가입하고 나만의 트렌드 음식 지도를 만들어보세요
          </p>
          <div className="final-cta-buttons">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              회원가입
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              로그인
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 토마토마. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
