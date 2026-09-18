import { useState } from 'react'

interface Props { onNext: (screen: string) => void }

type BoxStatus = 'safe' | 'warn' | 'urgent' | 'expired' | 'empty'

interface RoomBox {
  room: string
  status: BoxStatus
  count: number
  items?: { name: string; type: string; expiry: string; stored: string }[]
}

const statusColor: Record<BoxStatus, string> = {
  safe: '#34D399',
  warn: '#FBBF24',
  urgent: '#F87171',
  expired: '#DC2626',
  empty: '#CBD5E1',
}
const statusBg: Record<BoxStatus, string> = {
  safe: '#ECFDF5',
  warn: '#FFFBEB',
  urgent: '#FEF2F2',
  expired: '#FEF2F2',
  empty: '#F8FAFC',
}
const statusLabel: Record<BoxStatus, string> = {
  safe: '안전', warn: '주의', urgent: '임박', expired: '기한초과', empty: '비어있음',
}

// 냉장실 section data
const fridgeSections: { id: string; label: string; boxes: RoomBox[]; isDrawer?: boolean }[] = [
  {
    id: 'top', label: '상단 선반',
    boxes: [
      { room: '301', status: 'safe', count: 3, items: [{ name: '우유 1L', type: '유제품', expiry: '2026-08-15', stored: '3일 전' }, { name: '요거트', type: '유제품', expiry: '2026-08-12', stored: '3일 전' }, { name: '치즈', type: '유제품', expiry: '2026-08-20', stored: '1일 전' }] },
      { room: '302', status: 'warn', count: 5, items: [{ name: '닭가슴살', type: '육류', expiry: '2026-08-10', stored: '5일 전' }, { name: '삶은 달걀', type: '구입 식품', expiry: '2026-08-11', stored: '4일 전' }, { name: '두유', type: '음료', expiry: '2026-08-18', stored: '2일 전' }] },
      { room: '303', status: 'urgent', count: 2, items: [{ name: '배달음식 (중국집)', type: '남은 배달음식', expiry: '2026-08-08', stored: '2일 전' }, { name: '반찬 (김치)', type: '개봉 식품', expiry: '2026-08-09', stored: '2일 전' }] },
    ],
  },
  {
    id: 'mid1', label: '중단 선반 (위)',
    boxes: [
      { room: '304', status: 'empty', count: 0 },
      { room: '305', status: 'safe', count: 1, items: [{ name: '오렌지 주스', type: '음료', expiry: '2026-08-22', stored: '1일 전' }] },
      { room: '306', status: 'expired', count: 3, items: [{ name: '두부', type: '냉장식품', expiry: '2026-08-05', stored: '7일 전' }, { name: '어묵', type: '냉장식품', expiry: '2026-08-04', stored: '8일 전' }, { name: '묵은지', type: '개봉 식품', expiry: '2026-08-03', stored: '9일 전' }] },
    ],
  },
  {
    id: 'mid2', label: '중단 선반 (아래)',
    boxes: [
      { room: '307', status: 'warn', count: 4, items: [{ name: '삼겹살', type: '육류', expiry: '2026-08-10', stored: '4일 전' }, { name: '쌈장', type: '개봉 식품', expiry: '2026-08-12', stored: '3일 전' }, { name: '된장국', type: '남은 배달음식', expiry: '2026-08-09', stored: '3일 전' }, { name: '두부찌개', type: '남은 배달음식', expiry: '2026-08-09', stored: '2일 전' }] },
      { room: '308', status: 'safe', count: 2, items: [{ name: '사과 주스', type: '음료', expiry: '2026-08-25', stored: '2일 전' }, { name: '요구르트', type: '유제품', expiry: '2026-08-20', stored: '1일 전' }] },
      { room: '309', status: 'safe', count: 2, items: [{ name: '계란 10구', type: '구입 식품', expiry: '2026-08-28', stored: '3일 전' }, { name: '버터', type: '유제품', expiry: '2026-09-01', stored: '2일 전' }] },
    ],
  },
  {
    id: 'bot', label: '하단 선반',
    boxes: [
      { room: '310', status: 'urgent', count: 1, items: [{ name: '피자 (남은 것)', type: '남은 배달음식', expiry: '2026-08-08', stored: '3일 전' }] },
      { room: '311', status: 'empty', count: 0 },
      { room: '312', status: 'safe', count: 3, items: [{ name: '식혜', type: '음료', expiry: '2026-08-20', stored: '1일 전' }, { name: '포도', type: '과일', expiry: '2026-08-15', stored: '2일 전' }, { name: '방울토마토', type: '채소류', expiry: '2026-08-16', stored: '1일 전' }] },
    ],
  },
  {
    id: 'fresh1', label: '신선실 1 (서랍)', isDrawer: true,
    boxes: [
      { room: '313', status: 'safe', count: 4, items: [{ name: '상추', type: '채소류', expiry: '2026-08-14', stored: '2일 전' }, { name: '오이', type: '채소류', expiry: '2026-08-13', stored: '3일 전' }, { name: '당근', type: '채소류', expiry: '2026-08-18', stored: '1일 전' }, { name: '파프리카', type: '채소류', expiry: '2026-08-17', stored: '1일 전' }] },
      { room: '314', status: 'warn', count: 2, items: [{ name: '딸기', type: '과일', expiry: '2026-08-10', stored: '5일 전' }, { name: '바나나', type: '과일', expiry: '2026-08-09', stored: '4일 전' }] },
    ],
  },
  {
    id: 'fresh2', label: '신선실 2 (서랍)', isDrawer: true,
    boxes: [
      { room: '315', status: 'empty', count: 0 },
      { room: '316', status: 'safe', count: 1, items: [{ name: '샐러드 채소', type: '채소류', expiry: '2026-08-16', stored: '1일 전' }] },
    ],
  },
]

const doorSections: { id: string; label: string; boxes: RoomBox[] }[] = [
  {
    id: 'door-1', label: '도어 1',
    boxes: [{ room: '301', status: 'safe', count: 1 }, { room: '305', status: 'warn', count: 1 }],
  },
  {
    id: 'door-2', label: '도어 2',
    boxes: [{ room: '302', status: 'safe', count: 1 }],
  },
  {
    id: 'door-3', label: '도어 3',
    boxes: [{ room: '308', status: 'urgent', count: 1 }],
  },
  {
    id: 'door-4', label: '도어 4',
    boxes: [{ room: '303', status: 'warn', count: 2 }, { room: '307', status: 'safe', count: 1 }],
  },
]

// 냉동실 section data
const freezerSections: { id: string; label: string; boxes: RoomBox[]; isDrawer?: boolean }[] = [
  {
    id: 'fz-top', label: '상단 선반',
    boxes: [
      { room: '301', status: 'safe', count: 2 },
      { room: '304', status: 'warn', count: 1 },
    ],
  },
  {
    id: 'fz-mid1', label: '중단 선반 (위)',
    boxes: [
      { room: '306', status: 'safe', count: 3 },
      { room: '309', status: 'empty', count: 0 },
    ],
  },
  {
    id: 'fz-mid2', label: '중단 선반 (아래)',
    boxes: [
      { room: '311', status: 'urgent', count: 1 },
      { room: '312', status: 'safe', count: 2 },
    ],
  },
  {
    id: 'fz-bot', label: '하단 선반',
    boxes: [
      { room: '314', status: 'empty', count: 0 },
      { room: '315', status: 'warn', count: 1 },
    ],
  },
  {
    id: 'fz-fresh1', label: '신선실 1 (서랍)', isDrawer: true,
    boxes: [
      { room: '316', status: 'safe', count: 2 },
      { room: '317', status: 'empty', count: 0 },
    ],
  },
  {
    id: 'fz-fresh2', label: '신선실 2 (서랍)', isDrawer: true,
    boxes: [
      { room: '318', status: 'safe', count: 1 },
      { room: '319', status: 'empty', count: 0 },
    ],
  },
]

const freezerDoorSections: { id: string; label: string; boxes: RoomBox[]; iceMaker?: boolean }[] = [
  { id: 'fzd-1', label: '도어 1', boxes: [{ room: '301', status: 'safe', count: 1 }] },
  { id: 'fzd-2', label: '도어 2', boxes: [{ room: '302', status: 'warn', count: 1 }], iceMaker: true },
  { id: 'fzd-3', label: '도어 3', boxes: [{ room: '303', status: 'safe', count: 2 }] },
  { id: 'fzd-4', label: '도어 4', boxes: [{ room: '308', status: 'empty', count: 0 }] },
  { id: 'fzd-5', label: '도어 5', boxes: [{ room: '310', status: 'urgent', count: 1 }] },
  { id: 'fzd-6', label: '도어 6', boxes: [{ room: '311', status: 'safe', count: 1 }] },
]

function RoomChip({ box, onClick, selected }: { box: RoomBox; onClick: () => void; selected: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 7px',
        background: selected ? statusColor[box.status] : statusBg[box.status],
        border: `1.5px solid ${statusColor[box.status]}`,
        borderRadius: 8,
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: 44,
        boxShadow: selected ? `0 2px 8px ${statusColor[box.status]}55` : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.15s',
        flexShrink: 0,
      }}
    >
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, color: selected ? 'white' : '#1A2420', margin: 0, lineHeight: 1.2 }}>{box.room}</p>
      {box.count > 0 && (
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: selected ? 'rgba(255,255,255,0.85)' : '#94A3B8', margin: '1px 0 0' }}>{box.count}개</p>
      )}
    </button>
  )
}

function ShelfRow({ section, selected, onSelect, isDrawer = false }: {
  section: { id: string; label: string; boxes: RoomBox[] }
  selected: RoomBox | null
  onSelect: (b: RoomBox | null) => void
  isDrawer?: boolean
}) {
  return (
    <div style={{
      background: 'rgba(240,249,255,0.7)',
      minHeight: isDrawer ? 38 : 44,
      display: 'flex',
      alignItems: 'center',
      padding: '5px 8px',
      gap: 5,
      flexWrap: 'wrap',
      position: 'relative',
    }}>
      {isDrawer && (
        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 28, height: 3, background: '#93C5DA', borderRadius: 2 }} />
      )}
      {isDrawer && <div style={{ width: '100%', height: 8 }} />}
      {section.boxes.length === 0 ? (
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#CBD5E1' }}>비어있음</span>
      ) : (
        section.boxes.map(box => (
          <RoomChip
            key={box.room}
            box={box}
            selected={selected?.room === box.room}
            onClick={() => onSelect(selected?.room === box.room ? null : box)}
          />
        ))
      )}
    </div>
  )
}

function DoorPocket({ section, selected, onSelect, tall = false }: {
  section: { id: string; label: string; boxes: RoomBox[] }
  selected: RoomBox | null
  onSelect: (b: RoomBox | null) => void
  tall?: boolean
}) {
  return (
    <div style={{
      background: 'rgba(224,242,254,0.6)',
      flex: tall ? 2 : 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 4px',
      gap: 4,
      minHeight: tall ? 64 : 36,
    }}>
      {section.boxes.map(box => (
        <RoomChip
          key={box.room}
          box={box}
          selected={selected?.room === box.room}
          onClick={() => onSelect(selected?.room === box.room ? null : box)}
        />
      ))}
      {section.boxes.length === 0 && (
        <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(203,213,225,0.4)', border: '1px dashed #CBD5E1' }} />
      )}
    </div>
  )
}

const SHELF_COLOR = '#7AB8D0'
const BODY_OUTER = 'linear-gradient(180deg, #D6EAF4 0%, #BDD8EC 100%)'
const BODY_BORDER = '#7AAFCB'
const DOOR_OUTER = 'linear-gradient(180deg, #C8E0EF 0%, #B0CDE3 100%)'

export default function FridgeScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<RoomBox | null>(null)
  const [zone, setZone] = useState<'fridge' | 'freezer'>('fridge')

  const totalCount = [...fridgeSections, ...doorSections].flatMap(s => s.boxes).reduce((s, b) => s + b.count, 0)
  const urgentCount = [...fridgeSections, ...doorSections].flatMap(s => s.boxes).filter(b => b.status === 'urgent' || b.status === 'expired').length
  const longCount = [...fridgeSections, ...doorSections].flatMap(s => s.boxes).filter(b => b.status === 'warn').length

  const handleSelect = (box: RoomBox | null) => setSelected(box)

  return (
    <div style={{ height: 'calc(100vh - 44px)', background: '#F4F7F5', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#1B5E3B', padding: '16px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: '0 0 2px' }}>신촌학사 A동 3층</p>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: 'white', margin: 0 }}>냉장고 현황</h2>
          </div>
          <button onClick={() => onNext('menu')} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 1H17M1 7H17M1 13H17" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {[
            { label: '전체 음식', value: totalCount, unit: '개', color: 'white' },
            { label: '소비기한 임박', value: urgentCount, unit: '구역', color: '#FCA5A5' },
            { label: '장기간 방치', value: longCount, unit: '구역', color: '#FCD34D' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 8px', backdropFilter: 'blur(4px)' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 500, color: stat.color, margin: 0 }}>{stat.value}<span style={{ fontSize: 10, marginLeft: 2 }}>{stat.unit}</span></p>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

      {/* Zone toggle */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', background: 'white', borderRadius: 12, padding: 4, gap: 4, border: '1.5px solid #D4E4DA' }}>
          {([['fridge', '❄️ 냉장실'], ['freezer', '🧊 냉동실']] as const).map(([z, label]) => (
            <button
              key={z}
              onClick={() => { setZone(z); setSelected(null) }}
              style={{
                flex: 1, padding: '9px', border: 'none', borderRadius: 8,
                background: zone === z ? (z === 'freezer' ? '#1565C0' : '#1B5E3B') : 'transparent',
                fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
                fontWeight: zone === z ? 700 : 400,
                color: zone === z ? 'white' : '#6B8A7A',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: '8px 16px 0', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {(['safe', 'warn', 'urgent', 'expired', 'empty'] as BoxStatus[]).map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, background: statusColor[s] }} />
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#6B8A7A' }}>{statusLabel[s]}</span>
          </div>
        ))}
      </div>

      {/* Fridge illustration */}
      <div style={{ padding: '10px 14px 8px' }}>
        {zone === 'fridge' ? (
          /* ── 냉장실 view ── */
          <div key="fridge" style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', border: `2px solid ${BODY_BORDER}`, boxShadow: '0 6px 24px rgba(100,160,200,0.18)' }}>

            {/* Main body (left, wider) */}
            <div style={{ flex: 3, background: BODY_OUTER, display: 'flex', flexDirection: 'column' }}>
              {/* Body label */}
              <div style={{ padding: '6px 10px 5px', borderBottom: `2px solid ${SHELF_COLOR}` }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: '#4A9BB5', letterSpacing: '0.06em' }}>REFRIGERATOR</span>
              </div>

              {/* Shelves */}
              {fridgeSections.map((sec, i) => (
                <div key={sec.id}>
                  <ShelfRow section={sec} selected={selected} onSelect={handleSelect} isDrawer={!!sec.isDrawer} />
                  {i < fridgeSections.length - 1 && (
                    <div style={{ height: 6, background: `linear-gradient(180deg, ${SHELF_COLOR} 0%, #5A9BB5 50%, ${SHELF_COLOR} 100%)`, borderTop: `1px solid #A8D4E8`, borderBottom: `1px solid #5A9BB5` }}>
                      <div style={{ height: 2, background: 'rgba(255,255,255,0.3)', marginTop: 1 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Door body (right, narrower) */}
            <div style={{ flex: 1.4, background: DOOR_OUTER, borderLeft: `2px solid ${BODY_BORDER}`, display: 'flex', flexDirection: 'column' }}>
              {/* Door label */}
              <div style={{ padding: '6px 6px 5px', borderBottom: `2px solid ${SHELF_COLOR}` }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: '#4A9BB5', letterSpacing: '0.06em' }}>DOOR</span>
              </div>

              {/* Door pockets */}
              {doorSections.map((sec, i) => (
                <div key={sec.id} style={{ flex: sec.id === 'door-top' ? 2 : 1, display: 'flex', flexDirection: 'column', borderBottom: i < doorSections.length - 1 ? `2px solid ${SHELF_COLOR}` : 'none' }}>
                  <DoorPocket section={sec} selected={selected} onSelect={handleSelect} tall={sec.id === 'door-top'} />
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ── 냉동실 view: 도어가 왼쪽 ── */
          <div key="freezer" style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', border: '2px solid #5B8CC4', boxShadow: '0 6px 24px rgba(80,120,200,0.18)' }}>

            {/* Door (left side) */}
            <div style={{ flex: 1.2, background: 'linear-gradient(180deg, #C5D8F0 0%, #AECAE6 100%)', borderRight: '2px solid #5B8CC4', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '6px 6px 5px', borderBottom: '2px solid #5B8CC4' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: '#3A6EA5', letterSpacing: '0.06em' }}>DOOR</span>
              </div>
              {freezerDoorSections.map((sec, i) => (
                <div key={sec.id} style={{ display: 'flex', flexDirection: 'column', borderBottom: i < freezerDoorSections.length - 1 ? '2px solid #5B8CC4' : 'none' }}>
                  <DoorPocket section={sec} selected={selected} onSelect={handleSelect} />
                  {sec.iceMaker && (
                    <div style={{
                      background: 'linear-gradient(180deg, #B8CCE8 0%, #9BB8DC 100%)',
                      borderTop: '1.5px dashed #6A9AC8',
                      padding: '5px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                    }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[0,1,2].map(k => (
                          <div key={k} style={{ width: 8, height: 8, background: 'rgba(200,225,248,0.9)', border: '1px solid #7AAFCB', borderRadius: 2, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)' }} />
                        ))}
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: '#4A7BA5', fontWeight: 500, letterSpacing: '0.04em' }}>ICE</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main freezer body (right, wider) */}
            <div style={{ flex: 3, background: 'linear-gradient(180deg, #DAEAF8 0%, #C8DDF0 100%)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '6px 10px 5px', borderBottom: '2px solid #5B8CC4' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: '#3A6EA5', letterSpacing: '0.06em' }}>FREEZER</span>
              </div>
              {freezerSections.map((sec, i) => (
                <div key={sec.id}>
                  <ShelfRow section={sec} selected={selected} onSelect={handleSelect} isDrawer={!!sec.isDrawer} />
                  {i < freezerSections.length - 1 && (
                    <div style={{ height: 6, background: 'linear-gradient(180deg, #5B8CC4 0%, #3A6EA5 50%, #5B8CC4 100%)', borderTop: '1px solid #8AB4D8', borderBottom: '1px solid #3A6EA5' }}>
                      <div style={{ height: 2, background: 'rgba(255,255,255,0.25)', marginTop: 1 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      </div>{/* end scrollable body */}

      {/* Detail bottom sheet — inside phone frame via absolute */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 56, left: 0, right: 0,
          background: 'white',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -6px 32px rgba(0,0,0,0.16)',
          borderTop: `2px solid ${statusColor[selected.status]}`,
          borderLeft: `2px solid ${statusColor[selected.status]}`,
          borderRight: `2px solid ${statusColor[selected.status]}`,
          borderBottom: 'none',
          zIndex: 20,
          maxHeight: '55%',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
            <div style={{ width: 36, height: 4, background: '#D4E4DA', borderRadius: 2 }} />
          </div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: statusBg[selected.status], border: `2px solid ${statusColor[selected.status]}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: statusColor[selected.status] }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 800, color: '#1A2420', margin: 0 }}>{selected.room}호 보관 음식</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: statusColor[selected.status], margin: 0, fontWeight: 600 }}>
                  {statusLabel[selected.status]} · 총 {selected.count}개
                </p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{ width: 28, height: 28, border: 'none', background: '#F4F7F5', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1L10 10M10 1L1 10" stroke="#6B8A7A" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
          {/* Food list */}
          <div style={{ overflowY: 'auto', padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {selected.items && selected.items.length > 0 ? selected.items.map((item, i) => {
              const daysLeft = Math.ceil((new Date(item.expiry).getTime() - Date.now()) / 86400000)
              const expiryColor = daysLeft < 0 ? '#DC2626' : daysLeft <= 1 ? '#EF4444' : daysLeft <= 3 ? '#F59E0B' : '#6B8A7A'
              return (
                <div key={i} style={{ background: '#F4F7F5', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: expiryColor, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, fontWeight: 600, color: '#1A2420', margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#94A3B8', margin: '1px 0 0' }}>{item.type} · {item.stored} 보관</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, color: expiryColor, margin: 0 }}>
                      {daysLeft < 0 ? `${Math.abs(daysLeft)}일 초과` : daysLeft === 0 ? '오늘 만료' : `${daysLeft}일 남음`}
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#94A3B8', margin: '1px 0 0' }}>{item.expiry}</p>
                  </div>
                </div>
              )
            }) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: 28, margin: '0 0 6px' }}>📭</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: '#B0C4BB', margin: 0 }}>등록된 음식이 없어요</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E8F0EC', display: 'flex', padding: '8px 0 12px', zIndex: 10 }}>
        {[
          { icon: '❄️', label: '냉장고', active: true },
          { icon: '📊', label: '공간', active: false, screen: 'impact' },
          { icon: '🚨', label: '신고', active: false, screen: 'report' },
          { icon: '💬', label: '커뮤니티', active: false, screen: 'community' },
          { icon: '➕', label: '음식등록', active: false, screen: 'addFood' },
        ].map(tab => (
          <button
            key={tab.label}
            onClick={() => tab.screen && onNext(tab.screen)}
            style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 0' }}
          >
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: tab.active ? '#1B5E3B' : '#B0C4BB', fontWeight: tab.active ? 700 : 400 }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
