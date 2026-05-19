import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * AuthContext를 편하게 꺼내쓰는 훅.
 * 컴포넌트에서: const { user, login, logout, isAuthenticated } = useAuth()
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth는 <AuthProvider> 안에서만 사용 가능합니다.')
  }
  return ctx
}
