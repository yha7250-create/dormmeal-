import { useState } from 'react'

interface Props { onNext: (screen: string) => void; onBack: () => void }

const dorms = ['무악학사', '송도학사', '법현학사', '제중학사', 'SK국제학사']
const buildings: Record<string, string[] | null> = {
  '무악학사':   ['1관', '2관', '3관', '4관', '6관(우정관)'],
  '송도학사':   ['A동', 'B동', 'C동', 'D동', 'E동', 'F동', 'G동'],
  '법현학사':   null,
  '제중학사':   null,
  'SK국제학사': ['SK글로벌하우스', '인터내셔널하우스'],
}

const floorRange: Record<string, { min: number; max: number }> = {
  '무악학사':   { min: -2, max: 6 },
  '송도학사':   { min: 3,  max: 13 },
  '법현학사':   { min: -3, max: 7 },
  '제중학사':   { min: -3, max: 7 },
  'SK국제학사': { min: -3, max: 7 },
}

function getFloors(dorm: string) {
  const { min, max } = floorRange[dorm] ?? { min: 1, max: 8 }
  return Array.from({ length: max - min + 1 }, (_, i) => min + i).filter(f => f !== 0)
}

function floorLabel(f: number) {
  return f < 0 ? `B${Math.abs(f)}` : `${f}F`
}

export default function DormSelectScreen({ onNext, onBack }: Props) {
  const [selDorm, setSelDorm] = useState('무악학사')
  const [selBuilding, setSelBuilding] = useState('1관')
  const [selFloor, setSelFloor] = useState(1)

  const floors = getFloors(selDorm)

  return (
    <div style={{ minHeight: '100%', background: '#F4F7F5', paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, border: 'none', background: 'white', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14L6 9L11 4" stroke="#1A2420" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: '#1A2420', margin: 0 }}>기숙사 선택</h2>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: '2px 0 0' }}>연세대학교 · 기숙사 / 동 / 층을 선택해주세요</p>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Dorm selection */}
        <div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>기숙사</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {dorms.map(d => (
              <button
                key={d}
                onClick={() => { setSelDorm(d); setSelBuilding(buildings[d]?.[0] ?? ''); setSelFloor(getFloors(d)[0]) }}
                style={{
                  padding: '9px 16px',
                  background: selDorm === d ? '#1B5E3B' : 'white',
                  border: selDorm === d ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA',
                  borderRadius: 10,
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 13,
                  fontWeight: selDorm === d ? 700 : 400,
                  color: selDorm === d ? 'white' : '#1A2420',
                  cursor: 'pointer',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Building selection — only if dorm has multiple buildings */}
        {buildings[selDorm] !== null && (
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>동</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(buildings[selDorm] as string[]).map(b => (
                <button
                  key={b}
                  onClick={() => setSelBuilding(b)}
                  style={{
                    padding: '9px 16px',
                    background: selBuilding === b ? '#1B5E3B' : 'white',
                    border: selBuilding === b ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA',
                    borderRadius: 10,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 13,
                    fontWeight: selBuilding === b ? 700 : 400,
                    color: selBuilding === b ? 'white' : '#1A2420',
                    cursor: 'pointer',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floor */}
        <div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>층</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {floors.map(f => (
              <button
                key={f}
                onClick={() => setSelFloor(f)}
                style={{
                  width: 48,
                  height: 48,
                  background: selFloor === f ? '#1B5E3B' : 'white',
                  border: selFloor === f ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA',
                  borderRadius: 12,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: f < 0 ? 12 : 15,
                  fontWeight: 700,
                  color: selFloor === f ? 'white' : '#1A2420',
                  cursor: 'pointer',
                }}
              >
                {floorLabel(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Summary card */}
        <div style={{ background: '#E8F5EE', border: '1.5px solid #B8D8C8', borderRadius: 16, padding: '16px 20px' }}>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#1B5E3B', margin: '0 0 4px', fontWeight: 600 }}>선택된 위치</p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: '#1A2420', margin: 0 }}>
            연세대 {selDorm} {buildings[selDorm] !== null ? selBuilding + ' ' : ''}{selFloor < 0 ? `지하 ${Math.abs(selFloor)}층` : `${selFloor}층`}
          </p>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: '4px 0 0' }}>이 층의 냉장고를 관리할 수 있어요</p>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <button
          onClick={() => onNext('profileRegister')}
          style={{ width: '100%', padding: '16px', background: '#1B5E3B', border: 'none', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: 'white', cursor: 'pointer' }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
