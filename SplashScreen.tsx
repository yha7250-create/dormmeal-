import EagleMascot from '../../components/EagleMascot'

interface Props { onNext: (screen: string) => void }

export default function SplashScreen({ onNext }: Props) {
  return (
    <div style={{ minHeight: '100%', background: 'linear-gradient(160deg, #1B5E3B 0%, #2E7D52 60%, #1B5E3B 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 0 }}>
      {/* Logo area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ width: 120, height: 120, background: 'white', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
          <EagleMascot size={100} />
        </div>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-1px' }}>
          Dormmeal
        </h1>
        <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '6px 0 0', letterSpacing: '0.05em' }}>
          기숙사 냉장고 관리 서비스
        </p>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
          우리 기숙사 냉장고,<br />깔끔하게 같이 관리해요 🐦
        </p>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => onNext('schoolSelect')}
          style={{ width: '100%', padding: '16px', background: '#F5C518', border: 'none', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: '#1A2420', cursor: 'pointer', letterSpacing: '-0.2px' }}
        >
          로그인
        </button>
        <button
          onClick={() => onNext('schoolSelect')}
          style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: 'white', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
        >
          회원가입
        </button>
      </div>

      {/* Bottom hint */}
      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 32, textAlign: 'center' }}>
        연세대학교 기숙사 입주생 전용 서비스
      </p>
    </div>
  )
}
