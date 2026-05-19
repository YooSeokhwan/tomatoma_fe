import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/AuthPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // ProtectedRoute에서 보낸 "원래 가려던 경로" — 로그인 후 그쪽으로 돌려보냄
  const redirectTo = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId || !password) {
      setError('아이디와 비밀번호를 입력하세요.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await login(userId, password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.Error
        || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">로그인</h1>
        <p className="auth-subtitle">토마토마에 오신 것을 환영합니다</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            <span>아이디</span>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
              placeholder="userId"
              disabled={submitting}
              autoFocus
            />
          </label>

          <label className="auth-field">
            <span>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={submitting}
            />
          </label>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? '로그인 중…' : '로그인'}
          </button>
        </form>

        <p className="auth-footer">
          계정이 없으신가요?{' '}
          <Link to="/register" className="auth-link">회원가입</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
