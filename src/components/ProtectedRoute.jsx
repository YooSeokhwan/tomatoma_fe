import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoute — 로그인 안 된 사용자를 /login 으로 보냄.
 *
 * 사용:
 *   <Route path="/profile" element={
 *     <ProtectedRoute><ProfilePage /></ProtectedRoute>
 *   } />
 *
 * 로그인 후엔 원래 가려던 페이지로 자동 복귀 (state.from에 저장).
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        인증 확인 중…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
