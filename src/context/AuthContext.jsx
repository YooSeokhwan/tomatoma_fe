import React, { createContext, useState, useEffect, useCallback } from 'react'
import { TOKEN_KEY } from '../services/api'
import * as authService from '../services/authService'

/**
 * AuthContext — 전역 인증 상태
 *
 * 상태:
 *   - user: 현재 로그인된 사용자 정보 (null이면 비로그인)
 *   - loading: 초기 토큰 검증 중인지
 *
 * 메소드:
 *   - login(userId, password): 로그인 후 토큰 저장 + user 설정
 *   - logout(): 토큰 제거 + user 비움
 *   - register(payload): 회원가입 (로그인은 별도 호출)
 */
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 앱 시작 시 localStorage에 토큰이 있으면 /me로 검증
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    authService.getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => {
        // 토큰이 무효하면 자동으로 제거 (api 인터셉터가 401 처리)
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (userId, password) => {
    const data = await authService.login({ userId, password })
    localStorage.setItem(TOKEN_KEY, data.accessToken)
    // 토큰 저장 후 /me로 전체 사용자 정보 가져오기
    const me = await authService.getCurrentUser()
    setUser(me)
    return me
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const register = useCallback(async (payload) => {
    return authService.register(payload)
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
