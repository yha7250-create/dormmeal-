import { useState } from 'react'
import EagleMascot from '../../components/EagleMascot'

interface Props { onBack: () => void }

export default function MenuScreen({ onBack }: Props) {
  const [expiryAlert, setExpiryAlert] = useState(true)
  const [chatAlert, setChatAlert] = useState(true)

  const menuItems = [
    { icon: '👤', label: '내 정보', sub: '홍길동 · 신촌학사 A동 302호' },
    { icon: '🍱', label: '음식 등록', sub: '새 음식 추가하기' },
    { icon: '💬', label: '관리자 채팅', sub: '공지사항 및 문의' },
    { icon: '📢', label: '공지사항', sub: '최근 공지 2건' },
    { icon: '❓', label: '문의하기', sub: '1:1 문의' },
    { icon: '📋', label: '정보동의 설정', sub: '개인정보 동의 현황' },
  ]

  return (
    <div style={{ minHeight: '100%', background: '#F4F7F5' }}>
      {/* Header */}
      <div style={{ background: '#1B5E3B', padding: '16px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={{ width: 36, height: 36, border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14L6 9L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <div style={{ width: 48, height: 48, background: 'white', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <EagleMascot size={40} />
            </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0 }}>안녕하세요 👋</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'white', margin: '2px 0 0' }}>홍길동 님</h2>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '2px 0 0' }}>신촌학사 A동 3층 302호</p>
        </div>
      </div>

      {/* Alert settings */}
      <div style={{ padding: '16px 24px' }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>알림 설정</p>
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #D4E4DA', overflow: 'hidden' }}>
          {[
            { label: '유통기한 알림', sub: '3일 전, 1일 전, 당일, 지난 후', val: expiryAlert, set: setExpiryAlert },
            { label: '채팅 알림', sub: '공동구매 및 관리자 채팅', val: chatAlert, set: setChatAlert },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i === 0 ? '1px solid #F0F4F2' : 'none' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, fontWeight: 600, color: '#1A2420', margin: 0 }}>{item.label}</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: '#6B8A7A', margin: '2px 0 0' }}>{item.sub}</p>
              </div>
              <button
                onClick={() => item.set(!item.val)}
                style={{
                  width: 44,
                  height: 26,
                  background: item.val ? '#1B5E3B' : '#D4E4DA',
                  border: 'none',
                  borderRadius: 13,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 3,
                  left: item.val ? 21 : 3,
                  width: 20,
                  height: 20,
                  background: 'white',
                  borderRadius: 10,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Menu list */}
      <div style={{ padding: '0 24px' }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>메뉴</p>
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #D4E4DA', overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < menuItems.length - 1 ? '1px solid #F0F4F2' : 'none', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, background: '#F4F7F5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, fontWeight: 600, color: '#1A2420', margin: 0 }}>{item.label}</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: '#6B8A7A', margin: '1px 0 0' }}>{item.sub}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 10L8 7L5 4" stroke="#B0C4BB" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button style={{ width: '100%', padding: '13px', background: 'white', border: '1.5px solid #D4E4DA', borderRadius: 12, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: '#6B8A7A', cursor: 'pointer' }}>
          로그아웃
        </button>
        <button style={{ width: '100%', padding: '13px', background: 'white', border: '1.5px solid #FECACA', borderRadius: 12, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: '#EF4444', cursor: 'pointer' }}>
          회원 탈퇴
        </button>
      </div>

      {/* App version */}
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#B0C4BB', textAlign: 'center', margin: '0 0 24px' }}>Dormmeal v1.0.0</p>
    </div>
  )
}
