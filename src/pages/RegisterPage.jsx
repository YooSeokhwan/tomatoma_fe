import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/AuthPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, login } = useAuth()

  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 기본 클라이언트 검증 — 서버에도 검증 있지만 즉시 피드백
    if (!userId || !email || !password) {
      setError('모든 필드를 입력하세요.')
      return
    }
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.')
      return
    }

    setError('')
    setSubmitting(true)
    try {
      await register({ userId, password, email })
      // 가입 성공 -> 자동 로그인까지 한 번에
      await login(userId, password)
      navigate('/', { replace: true })
    } catch (err) {
      const raw = err.response?.data?.message || err.response?.data?.Error
      const msg = raw
        ? raw.replace(/^Error:\s*/, '')
        : '회원가입 실패: 서버에 연결할 수 없습니다.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">회원가입</h1>
        <p className="auth-subtitle">토마토마 계정을 만들어 보세요</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            <span>아이디 (3–20자)</span>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
              placeholder="alice123"
              disabled={submitting}
              autoFocus
            />
          </label>

          <label className="auth-field">
            <span>이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="alice@example.com"
              disabled={submitting}
            />
          </label>

          <label className="auth-field">
            <span>비밀번호 (8자 이상)</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              disabled={submitting}
            />
          </label>

          <label className="auth-field">
            <span>비밀번호 확인</span>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              disabled={submitting}
            />
          </label>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? '가입 중…' : '회원가입'}
          </button>
        </form>

        <p className="auth-footer">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="auth-link">로그인</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
