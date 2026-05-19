import apiClient from './api'

/**
 * 회원가입
 * @param {{ userId: string, password: string, email: string }} payload
 * @returns {Promise<{ userId, email, role }>}
 */
export async function register(payload) {
  const { data } = await apiClient.post('/auth/register', payload)
  return data
}

/**
 * 로그인
 * @param {{ userId: string, password: string }} payload
 * @returns {Promise<{ accessToken, userId, role }>}
 */
export async function login(payload) {
  const { data } = await apiClient.post('/auth/login', payload)
  return data
}

/**
 * 본인 정보 조회 (토큰 필요)
 * @returns {Promise<{ id, userId, email, role }>}
 */
export async function getCurrentUser() {
  const { data } = await apiClient.get('/auth/me')
  return data
}
