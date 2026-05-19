import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Header.css'

function Header({ onRefresh }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <span className="logo">🍅</span>
            <h1>토마토마</h1>
          </Link>
        </div>

        <h2 className="subtitle">트렌드 음식 판매처 찾기</h2>

        <div className="header-actions">
          <button
            className="btn btn-icon"
            onClick={onRefresh}
            title="새로고침"
            aria-label="Refresh trending foods"
          >
            ↻
          </button>
          <button
            className="btn btn-icon"
            title="도움말"
            aria-label="Help"
          >
            ?
          </button>
          <button
            className="btn btn-icon"
            title="설정"
            aria-label="Settings"
          >
            ⚙️
          </button>

          {isAuthenticated ? (
            <>
              <span className="header-user" title={`로그인: ${user?.userId}`}>
                {user?.userId}
              </span>
              <button
                className="btn btn-text"
                onClick={handleLogout}
                title="로그아웃"
                aria-label="Logout"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-text">로그인</Link>
              <Link to="/register" className="btn btn-text btn-primary">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
