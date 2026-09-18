import EagleMascot from '../../components/EagleMascot'

interface Props { onNext: (screen: string) => void }

export default function AdminSplashScreen({ onNext }: Props) {
  return (
    <div style={{ minHeight: '100%', background: 'linear-gradient(160deg, #0F3D2B 0%, #1B5E3B 50%, #2E7D52 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
      {/* Admin badge */}
      <div style={{ background: '#F5C518', borderRadius: 10, padding: '4px 12px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5Z" fill="#1A2420" /></svg>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, color: '#1A2420', letterSpacing: '0.1em' }}>ADMIN</span>
      </div>

      {/* Logo */}
      <div style={{ width: 120, height: 120, background: 'white', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.22)' }}>
        <EagleMascot size={85} mood="alert" />
      </div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 800, color: 'white', margin: '0 0 4px', letterSpacing: '-1px' }}>Dormmeal</h1>
      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 0 12px' }}>기숙사 관리자 전용</p>

      <div style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', borderRadius: 12, padding: '10px 16px', marginBottom: 44, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#F5C518', margin: 0 }}>
          냉장고 상태 관리 · 학생 소통 · 음식 정리 알림
        </p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={() => onNext('adminSchoolSelect')} style={{ width: '100%', padding: '16px', background: '#F5C518', border: 'none', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: '#1A2420', cursor: 'pointer' }}>
          관리자 로그인
        </button>
        <button onClick={() => onNext('adminSchoolSelect')} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
          관리자 계정 신청
        </button>
      </div>
    </div>
  )
}
