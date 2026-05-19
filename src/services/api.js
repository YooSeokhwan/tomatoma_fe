import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8080/api'

// JWT 토큰을 localStorage에 저장할 때 사용할 키
export const TOKEN_KEY = 'tomatoma_access_token'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 요청 인터셉터
 * 모든 HTTP 요청이 나가기 직전에 자동 실행됨.
 * localStorage에 토큰이 있으면 Authorization 헤더에 자동 첨부.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * 응답 인터셉터
 * 모든 응답이 도착하면 자동 실행됨.
 * 401(Unauthorized) 응답 시 토큰을 비우고 로그인 페이지로 리다이렉트.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 또는 무효 -> 자동 로그아웃
      localStorage.removeItem(TOKEN_KEY)
      // 현재 경로가 이미 /login 이 아닐 때만 이동 (무한 리다이렉트 방지)
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
