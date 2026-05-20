import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/MyPage.css'

function MyPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // user는 ProtectedRoute가 비로그인을 차단하므로 항상 존재함
  const roleLabel = user.role === 'ADMIN' ? '관리자' : '일반 사용자'
  const roleBadgeClass = user.role === 'ADMIN' ? 'role-admin' : 'role-user'

  // 프로필 이모지 — userId 첫 글자에 따라 분기 (간단한 다양화)
  const profileEmoji = '🍅'

  return (
    <div className="mypage">
      <div className="mypage-container">

        {/* 헤더 영역 */}
        <div className="mypage-header">
          <button
            className="mypage-back"
            onClick={() => navigate('/')}
            aria-label="메인으로 돌아가기"
          >
            ← 메인으로
          </button>
          <h1 className="mypage-title">마이페이지</h1>
          <div style={{ width: 90 }} /> {/* 좌우 균형 */}
        </div>

        {/* 프로필 카드 */}
        <section className="profile-card">
          <div className="profile-avatar">
            <span className="profile-emoji">{profileEmoji}</span>
          </div>

          <div className="profile-info">
            <div className="profile-userid">{user.userId}</div>
            <div className="profile-email">{user.email}</div>
            <span className={`profile-role ${roleBadgeClass}`}>{roleLabel}</span>
          </div>

          <div className="profile-id-section">
            <span className="profile-id-label">계정 번호</span>
            <span className="profile-id-value">#{String(user.id).padStart(6, '0')}</span>
          </div>
        </section>

        {/* 액션 섹션 */}
        <section className="actions-section">
          <h2 className="section-title">계정 관리</h2>

          <button
            className="action-item action-disabled"
            disabled
            title="추후 제공 예정"
          >
            <div className="action-icon">🔑</div>
            <div className="action-text">
              <div className="action-name">비밀번호 변경</div>
              <div className="action-desc">현재 비밀번호 확인 후 새 비밀번호 설정</div>
            </div>
            <div className="action-tag">준비 중</div>
          </button>

          <button
            className="action-item action-disabled"
            disabled
            title="추후 제공 예정"
          >
            <div className="action-icon">📧</div>
            <div className="action-text">
              <div className="action-name">이메일 변경</div>
              <div className="action-desc">새 이메일로 인증 메일 발송</div>
            </div>
            <div className="action-tag">준비 중</div>
          </button>

          <button
            className="action-item action-danger"
            disabled
            title="추후 제공 예정"
          >
            <div className="action-icon">⚠️</div>
            <div className="action-text">
              <div className="action-name">회원 탈퇴</div>
              <div className="action-desc">계정과 작성한 모든 데이터 영구 삭제</div>
            </div>
            <div className="action-tag">준비 중</div>
          </button>
        </section>

        {/* 활동 섹션 */}
        <section className="actions-section">
          <h2 className="section-title">내 활동</h2>

          <button
            className="action-item action-disabled"
            disabled
            title="게시판 기능 추가 후 활성화"
          >
            <div className="action-icon">📝</div>
            <div className="action-text">
              <div className="action-name">내가 쓴 글</div>
              <div className="action-desc">작성한 게시글 모아보기</div>
            </div>
            <div className="action-tag">Phase 2</div>
          </button>

          <button
            className="action-item action-disabled"
            disabled
            title="게시판 기능 추가 후 활성화"
          >
            <div className="action-icon">💬</div>
            <div className="action-text">
              <div className="action-name">내가 쓴 댓글</div>
              <div className="action-desc">달았던 댓글 모아보기</div>
            </div>
            <div className="action-tag">Phase 2</div>
          </button>
        </section>

        {/* 로그아웃 */}
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>

      </div>
    </div>
  )
}

export default MyPage
