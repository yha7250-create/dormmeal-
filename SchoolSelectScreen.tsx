interface Props { onNext: (screen: string) => void; onBack: () => void; nextScreen?: string }

const schools = [
  { name: '연세대학교', icon: '🦅', dormCount: 12, selected: true },
  { name: '고려대학교', icon: '🐯', dormCount: 8, selected: false },
  { name: '서울대학교', icon: '🦁', dormCount: 15, selected: false },
  { name: '성균관대학교', icon: '⚡', dormCount: 6, selected: false },
]

export default function SchoolSelectScreen({ onNext, onBack, nextScreen = 'dormSelect' }: Props) {
  return (
    <div style={{ minHeight: '100%', background: '#F4F7F5', paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, border: 'none', background: 'white', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14L6 9L11 4" stroke="#1A2420" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: '#1A2420', margin: 0 }}>학교 선택</h2>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: '2px 0 0' }}>재학 중인 학교를 선택해주세요</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 24px' }}>
        <div style={{ background: 'white', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1.5px solid #D4E4DA' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#6B8A7A" strokeWidth="1.5" /><path d="M10.5 10.5L14 14" stroke="#6B8A7A" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: '#B0C4BB' }}>학교 이름으로 검색</span>
        </div>
      </div>

      {/* School list */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {schools.map((s) => (
          <button
            key={s.name}
            onClick={() => onNext(nextScreen)}
            style={{
              width: '100%',
              padding: '16px 20px',
              background: s.selected ? '#E8F5EE' : 'white',
              border: s.selected ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ width: 48, height: 48, background: s.selected ? '#1B5E3B' : '#F4F7F5', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              {s.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: '#1A2420', margin: 0 }}>{s.name}</p>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: '2px 0 0' }}>기숙사 {s.dormCount}개 등록됨</p>
            </div>
            {s.selected && (
              <div style={{ width: 24, height: 24, background: '#1B5E3B', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom button */}
      <div style={{ padding: '24px 24px 0' }}>
        <button
          onClick={() => onNext(nextScreen)}
          style={{ width: '100%', padding: '16px', background: '#1B5E3B', border: 'none', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: 'white', cursor: 'pointer' }}
        >
          연세대학교 선택하기
        </button>
      </div>
    </div>
  )
}
