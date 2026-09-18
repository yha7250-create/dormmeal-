import { useState } from 'react'

interface Props { onNext: (screen: string) => void }

type BoxStatus = 'safe' | 'warn' | 'urgent' | 'expired' | 'empty'
const statusColor: Record<BoxStatus, string> = { safe: '#22C55E', warn: '#F59E0B', urgent: '#EF4444', expired: '#991B1B', empty: '#D4E4DA' }
const statusBg: Record<BoxStatus, string> = { safe: '#DCFCE7', warn: '#FEF3C7', urgent: '#FEE2E2', expired: '#FEE2E2', empty: '#F4F7F5' }
const statusLabel: Record<BoxStatus, string> = { safe: '안전', warn: '주의', urgent: '임박', expired: '기한초과', empty: '비어있음' }

type RoomData = { room: string; status: BoxStatus; count: number; fridgeZone: string; freezerZone: string }

const FRIDGE_BODY = ['상단 선반', '중단 선반(위)', '중단 선반(아래)', '하단 선반']
const FRIDGE_DRAWER = ['신선실 1', '신선실 2']
const FRIDGE_DOOR = ['도어 1', '도어 2', '도어 3', '도어 4']
const FREEZER_BODY = ['상단 선반', '중단 선반(위)', '중단 선반(아래)', '하단 선반']
const FREEZER_DRAWER = ['신선실 1', '신선실 2']
const FREEZER_DOOR = ['도어 1', '도어 2', '도어 3', '도어 4', '도어 5', '도어 6']

const fridges = [
  {
    id: '무악1관-3F',
    location: '무악학사 1관 3F',
    total: 18, urgent: 2, long: 3,
    rooms: [
      { room: '301', status: 'safe'    as BoxStatus, count: 3, fridgeZone: '상단 선반',      freezerZone: '도어 1' },
      { room: '302', status: 'warn'    as BoxStatus, count: 5, fridgeZone: '중단 선반(위)',   freezerZone: '상단 선반' },
      { room: '303', status: 'urgent'  as BoxStatus, count: 2, fridgeZone: '중단 선반(아래)', freezerZone: '도어 3' },
      { room: '304', status: 'empty'   as BoxStatus, count: 0, fridgeZone: '하단 선반',       freezerZone: '' },
      { room: '305', status: 'safe'    as BoxStatus, count: 1, fridgeZone: '도어 1',          freezerZone: '중단 선반(위)' },
      { room: '306', status: 'expired' as BoxStatus, count: 3, fridgeZone: '신선실 1',         freezerZone: '하단 선반' },
      { room: '307', status: 'warn'    as BoxStatus, count: 4, fridgeZone: '도어 3',           freezerZone: '도어 5' },
      { room: '308', status: 'safe'    as BoxStatus, count: 2, fridgeZone: '하단 선반',        freezerZone: '신선실 1' },
    ] as RoomData[],
  },
  {
    id: '무악1관-4F',
    location: '무악학사 1관 4F',
    total: 12, urgent: 1, long: 1,
    rooms: [
      { room: '401', status: 'safe'   as BoxStatus, count: 2, fridgeZone: '상단 선반',      freezerZone: '상단 선반' },
      { room: '402', status: 'safe'   as BoxStatus, count: 4, fridgeZone: '중단 선반(위)',   freezerZone: '도어 2' },
      { room: '403', status: 'warn'   as BoxStatus, count: 3, fridgeZone: '하단 선반',       freezerZone: '도어 4' },
      { room: '404', status: 'empty'  as BoxStatus, count: 0, fridgeZone: '도어 2',           freezerZone: '' },
      { room: '405', status: 'urgent' as BoxStatus, count: 1, fridgeZone: '신선실 2',         freezerZone: '하단 선반' },
      { room: '406', status: 'safe'   as BoxStatus, count: 2, fridgeZone: '도어 4',           freezerZone: '중단 선반(아래)' },
      { room: '407', status: 'empty'  as BoxStatus, count: 0, fridgeZone: '도어 1',           freezerZone: '' },
      { room: '408', status: 'safe'   as BoxStatus, count: 3, fridgeZone: '중단 선반(아래)', freezerZone: '도어 6' },
    ] as RoomData[],
  },
  {
    id: '송도A동-5F',
    location: '송도학사 A동 5F',
    total: 22, urgent: 4, long: 2,
    rooms: [
      { room: '501', status: 'warn'    as BoxStatus, count: 4, fridgeZone: '상단 선반',      freezerZone: '도어 2' },
      { room: '502', status: 'expired' as BoxStatus, count: 2, fridgeZone: '신선실 1',         freezerZone: '상단 선반' },
      { room: '503', status: 'safe'    as BoxStatus, count: 5, fridgeZone: '중단 선반(위)',   freezerZone: '도어 4' },
      { room: '504', status: 'urgent'  as BoxStatus, count: 1, fridgeZone: '도어 3',           freezerZone: '중단 선반(위)' },
      { room: '505', status: 'safe'    as BoxStatus, count: 3, fridgeZone: '하단 선반',        freezerZone: '하단 선반' },
      { room: '506', status: 'safe'    as BoxStatus, count: 2, fridgeZone: '중단 선반(아래)', freezerZone: '도어 1' },
      { room: '507', status: 'urgent'  as BoxStatus, count: 1, fridgeZone: '도어 4',           freezerZone: '신선실 2' },
      { room: '508', status: 'expired' as BoxStatus, count: 2, fridgeZone: '신선실 2',         freezerZone: '도어 6' },
    ] as RoomData[],
  },
]

/* ---- Mini room chip ---- */
function RoomChip({ room, status, onClick }: { room: string; status: BoxStatus; onClick: () => void }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick() }}
      style={{
        padding: '2px 5px', borderRadius: 5, border: `1px solid ${statusColor[status]}55`,
        background: statusBg[status], cursor: 'pointer',
        fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 700,
        color: status === 'empty' ? '#B0C4BB' : '#1A2420', lineHeight: 1.4, whiteSpace: 'nowrap',
      }}
    >
      {room}
    </button>
  )
}

/* ---- Fridge illustration for a single fridge ---- */
function FridgeIllustrationAdmin({
  rooms, zone, onRoomClick,
}: {
  rooms: RoomData[]
  zone: 'fridge' | 'freezer'
  onRoomClick: (room: string) => void
}) {
  const zoneKey = zone === 'fridge' ? 'fridgeZone' : 'freezerZone'
  const roomsIn = (zoneName: string) =>
    rooms.filter(r => r[zoneKey] === zoneName && r.count > 0)

  const bodyZones = zone === 'fridge' ? FRIDGE_BODY : FREEZER_BODY
  const drawerZones = zone === 'fridge' ? FRIDGE_DRAWER : FREEZER_DRAWER
  const doorZones = zone === 'fridge' ? FRIDGE_DOOR : FREEZER_DOOR
  const bodyColor = zone === 'fridge' ? '#E8F5EE' : '#EBF4FF'
  const bodyBorder = zone === 'fridge' ? '#B8D8C8' : '#BFCFE8'
  const doorColor = zone === 'fridge' ? '#F0FAF4' : '#E0EEFF'
  const doorBorder = zone === 'fridge' ? '#B8D8C8' : '#93C5FD'
  const labelColor = zone === 'fridge' ? '#1B5E3B' : '#1565C0'

  function ZoneSlot({ name, height = 28 }: { name: string; height?: number }) {
    const inZone = roomsIn(name)
    return (
      <div style={{
        minHeight: height, background: inZone.length ? 'white' : (zone === 'fridge' ? '#F4FAF7' : '#F0F6FF'),
        borderRadius: 6, border: `1px solid ${inZone.length ? (zone === 'fridge' ? '#A8D4B8' : '#93C5FD') : bodyBorder}`,
        padding: '3px 4px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
      }}>
        {inZone.length > 0
          ? inZone.map(r => <RoomChip key={r.room} room={r.room} status={r.status} onClick={() => onRoomClick(r.room)} />)
          : <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: '#B0C4BB', lineHeight: 1 }}>{name}</span>
        }
      </div>
    )
  }

  function DoorSlot({ name, height = 26 }: { name: string; height?: number }) {
    const inZone = roomsIn(name)
    return (
      <div style={{
        minHeight: height, background: inZone.length ? 'white' : doorColor,
        borderRadius: 6, border: `1px solid ${inZone.length ? (zone === 'fridge' ? '#A8D4B8' : '#93C5FD') : doorBorder}`,
        padding: '3px 4px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
      }}>
        {inZone.length > 0
          ? inZone.map(r => <RoomChip key={r.room} room={r.room} status={r.status} onClick={() => onRoomClick(r.room)} />)
          : <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: '#B0C4BB', lineHeight: 1 }}>{name}</span>
        }
      </div>
    )
  }

  const body = (
    <div style={{ flex: 3, background: bodyColor, borderRadius: 8, padding: '5px', border: `1px solid ${bodyBorder}` }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fontWeight: 700, color: labelColor, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>본체</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {bodyZones.map(z => <ZoneSlot key={z} name={z} />)}
      </div>
      <div style={{ height: 1, background: bodyBorder, margin: '4px 0 3px' }} />
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fontWeight: 700, color: labelColor, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>신선실</p>
      <div style={{ display: 'flex', gap: 3 }}>
        {drawerZones.map(z => <div key={z} style={{ flex: 1 }}><ZoneSlot name={z} height={24} /></div>)}
      </div>
    </div>
  )

  const hinge = (
    <div style={{ width: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
      {[0,1,2].map(i => <div key={i} style={{ width: 2, height: 6, background: bodyBorder, borderRadius: 1 }} />)}
    </div>
  )

  const door = (
    <div style={{ flex: 1.8, background: doorColor, borderRadius: 8, padding: '5px', border: `1px solid ${doorBorder}` }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fontWeight: 700, color: labelColor, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>도어</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {doorZones.map((z, i) => (
          <div key={z}>
            <DoorSlot name={z} height={24} />
            {zone === 'freezer' && i === 1 && (
              <div style={{ margin: '2px 0', padding: '2px 4px', background: '#DBEAFE', borderRadius: 4, border: '1px dashed #93C5FD', display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 7 }}>🧊</span>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 6, color: '#1565C0', fontWeight: 600 }}>얼음 제조기</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {zone === 'fridge' ? <>{body}{hinge}{door}</> : <>{door}{hinge}{body}</>}
    </div>
  )
}

/* ---- Split card with fridge illustration ---- */
function FridgeCard({
  fridge, onClick, onRoomClick,
}: {
  fridge: typeof fridges[0]
  onClick: () => void
  onRoomClick: (room: string, fridgeId: string) => void
}) {
  const [zone, setZone] = useState<'fridge' | 'freezer'>('fridge')

  return (
    <div style={{ background: 'white', border: '1.5px solid #D4E4DA', borderRadius: 16, overflow: 'hidden' }}>
      {/* Card header */}
      <button
        onClick={onClick}
        style={{ width: '100%', padding: '10px 12px 8px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <div>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: '#6B8A7A', margin: '0 0 1px' }}>{fridge.location}</p>
          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#1A2420', background: '#F4F7F5', padding: '1px 5px', borderRadius: 4 }}>{fridge.total}개</span>
            {fridge.urgent > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#EF4444', background: '#FEE2E2', padding: '1px 5px', borderRadius: 4 }}>⚠ {fridge.urgent}</span>}
          </div>
        </div>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: 4 }}><path d="M3 7L5.5 4.5L3 2" stroke="#B0C4BB" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>

      {/* Zone toggle */}
      <div style={{ display: 'flex', margin: '0 10px 6px', background: '#F0F4F2', borderRadius: 8, padding: 3, gap: 2 }}>
        {(['fridge', 'freezer'] as const).map(z => (
          <button
            key={z}
            onClick={() => setZone(z)}
            style={{
              flex: 1, padding: '4px 0', border: 'none', borderRadius: 6,
              background: zone === z ? 'white' : 'transparent',
              boxShadow: zone === z ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9,
              fontWeight: zone === z ? 700 : 400,
              color: zone === z ? (z === 'freezer' ? '#1565C0' : '#1B5E3B') : '#6B8A7A',
              cursor: 'pointer',
            }}
          >
            {z === 'fridge' ? '❄ 냉장실' : '🧊 냉동고'}
          </button>
        ))}
      </div>

      {/* Fridge illustration */}
      <div style={{ padding: '0 10px 10px' }}>
        <FridgeIllustrationAdmin
          rooms={fridge.rooms}
          zone={zone}
          onRoomClick={room => onRoomClick(room, fridge.id)}
        />
      </div>
    </div>
  )
}

export default function AdminFridgeOverviewScreen({ onNext }: Props) {
  const [viewMode, setViewMode] = useState<'split' | 'single'>('split')
  const [splitSubView, setSplitSubView] = useState<'room' | 'fridge'>('room')
  const [singleSubView, setSingleSubView] = useState<'room' | 'fridge'>('room')
  const [singleFridgeZone, setSingleFridgeZone] = useState<'fridge' | 'freezer'>('fridge')
  const [selFridge, setSelFridge] = useState(fridges[0].id)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatRoom, setChatRoom] = useState('')
  const [chatFridgeId, setChatFridgeId] = useState(fridges[0].id)

  const current = fridges.find(f => f.id === selFridge) || fridges[0]
  const chatFridge = fridges.find(f => f.id === chatFridgeId) || fridges[0]

  function openChat(room: string, fridgeId: string) {
    setChatRoom(room)
    setChatFridgeId(fridgeId)
    setChatOpen(true)
  }

  return (
    <div style={{ height: '100%', background: '#F4F7F5', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 56 }}>
      {/* Header */}
      <div style={{ background: '#0F3D2B', padding: '16px 24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
              <span style={{ background: '#F5C518', borderRadius: 6, padding: '1px 7px', fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: '#1A2420' }}>ADMIN</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>전체 냉장고 현황</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'single' : 'split')}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'white', cursor: 'pointer' }}
            >
              {viewMode === 'split' ? '🔲 분할보기' : '📋 단독보기'}
            </button>
            <button onClick={() => onNext('adminMenu')} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 1H17M1 7H17M1 13H17" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        {/* Global stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
          {[
            { label: '관리 냉장고', value: fridges.length, color: 'white' },
            { label: '전체 음식', value: fridges.reduce((s,f) => s+f.total, 0), color: '#7DD3A8' },
            { label: '소비기한 임박', value: fridges.reduce((s,f) => s+f.urgent, 0), color: '#FCA5A5' },
            { label: '정리 필요', value: fridges.reduce((s,f) => s+f.long, 0), color: '#FCD34D' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 500, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.55)', margin: '2px 0 0', lineHeight: 1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Split view ── */}
      {viewMode === 'split' ? (
        <div>
          {/* Sub-view toggle */}
          <div style={{ padding: '12px 24px 10px', display: 'flex', background: '#F4F7F5' }}>
            <div style={{ display: 'flex', background: 'white', borderRadius: 12, padding: 4, gap: 4, border: '1.5px solid #D4E4DA' }}>
              {[
                { key: 'room', label: '🏠 호수별 보기' },
                { key: 'fridge', label: '❄️ 냉장고 보기' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setSplitSubView(t.key as 'room' | 'fridge')}
                  style={{
                    padding: '7px 14px', border: 'none', borderRadius: 9, cursor: 'pointer',
                    background: splitSubView === t.key ? '#1B5E3B' : 'transparent',
                    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12,
                    fontWeight: splitSubView === t.key ? 700 : 400,
                    color: splitSubView === t.key ? 'white' : '#6B8A7A',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {splitSubView === 'room' ? (
            /* 호수별 보기 */
            <div style={{ padding: '0 24px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {fridges.map(fridge => (
                <button
                  key={fridge.id}
                  onClick={() => { setSelFridge(fridge.id); setViewMode('single') }}
                  style={{ background: 'white', border: '1.5px solid #D4E4DA', borderRadius: 16, padding: '12px', cursor: 'pointer', textAlign: 'left' }}
                >
                  <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#6B8A7A', margin: '0 0 2px' }}>{fridge.location}</p>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#1A2420', background: '#F4F7F5', padding: '2px 6px', borderRadius: 5 }}>{fridge.total}개</span>
                    {fridge.urgent > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#EF4444', background: '#FEE2E2', padding: '2px 6px', borderRadius: 5 }}>⚠ {fridge.urgent}</span>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4 }}>
                    {fridge.rooms.map(box => (
                      <div key={box.room} style={{ background: statusBg[box.status], borderRadius: 6, padding: '5px 3px', textAlign: 'center' }}>
                        <div style={{ width: 5, height: 5, borderRadius: 3, background: statusColor[box.status], margin: '0 auto 3px' }} />
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 700, color: '#1A2420', margin: 0 }}>{box.room}</p>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
              <button style={{ background: 'white', border: '1.5px dashed #D4E4DA', borderRadius: 16, padding: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 120 }}>
                <div style={{ width: 28, height: 28, background: '#F4F7F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="#B0C4BB" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: '#B0C4BB' }}>구역 추가</span>
              </button>
            </div>
          ) : (
            /* 냉장고 보기 */
            <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {fridges.map(fridge => (
                <FridgeCard
                  key={fridge.id}
                  fridge={fridge}
                  onClick={() => { setSelFridge(fridge.id); setViewMode('single') }}
                  onRoomClick={openChat}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── Single fridge detail ── */
        <div>
          {/* Fridge selector */}
          <div style={{ padding: '12px 24px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {fridges.map(f => (
              <button
                key={f.id}
                onClick={() => setSelFridge(f.id)}
                style={{ padding: '7px 14px', background: selFridge === f.id ? '#1B5E3B' : 'white', border: selFridge === f.id ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: selFridge === f.id ? 700 : 400, color: selFridge === f.id ? 'white' : '#1A2420', cursor: 'pointer', flexShrink: 0 }}>
                {f.location.split(' ').slice(1).join(' ')}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ padding: '12px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: '전체', value: current.total, color: '#1A2420' },
              { label: '기한 임박', value: current.urgent, color: '#EF4444' },
              { label: '장기 방치', value: current.long, color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '12px', textAlign: 'center', border: '1.5px solid #D4E4DA' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 500, color: s.color, margin: 0 }}>{s.value}</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#6B8A7A', margin: '2px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Sub-view toggle */}
          <div style={{ padding: '0 24px 12px', display: 'flex' }}>
            <div style={{ display: 'flex', background: 'white', borderRadius: 12, padding: 4, gap: 4, border: '1.5px solid #D4E4DA' }}>
              {[
                { key: 'room', label: '🏠 호수별 보기' },
                { key: 'fridge', label: '❄️ 냉장고 보기' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setSingleSubView(t.key as 'room' | 'fridge')}
                  style={{
                    padding: '7px 14px', border: 'none', borderRadius: 9, cursor: 'pointer',
                    background: singleSubView === t.key ? '#1B5E3B' : 'transparent',
                    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12,
                    fontWeight: singleSubView === t.key ? 700 : 400,
                    color: singleSubView === t.key ? 'white' : '#6B8A7A',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {singleSubView === 'room' ? (
            /* 호수별 */
            <div>
              <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                {current.rooms.map(box => (
                  <button
                    key={box.room}
                    onClick={() => openChat(box.room, current.id)}
                    style={{ padding: '10px 6px', background: statusBg[box.status], border: `1.5px solid ${statusColor[box.status]}33`, borderRadius: 14, cursor: 'pointer', textAlign: 'center', position: 'relative' }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: statusColor[box.status], margin: '0 auto 5px' }} />
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: '#1A2420', margin: 0 }}>{box.room}</p>
                    {box.count > 0 && <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#6B8A7A', margin: '1px 0 0' }}>{box.count}개</p>}
                    <div style={{ position: 'absolute', top: 5, right: 5, width: 14, height: 14, background: '#1B5E3B', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="0.5" y="0.5" width="7" height="5.5" rx="1.5" fill="white" opacity="0.8" /></svg>
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: '#6B8A7A', margin: '14px 24px 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>상태 범례</p>
              <div style={{ padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(Object.keys(statusLabel) as BoxStatus[]).map(k => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: statusBg[k], borderRadius: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: statusColor[k] }} />
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#1A2420' }}>{statusLabel[k]}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 냉장고 보기 */
            <div style={{ padding: '0 20px' }}>
              {/* 냉장실 / 냉동고 toggle */}
              <div style={{ display: 'flex', background: '#F0F4F2', borderRadius: 12, padding: 4, gap: 4, marginBottom: 12 }}>
                {(['fridge', 'freezer'] as const).map(z => (
                  <button
                    key={z}
                    onClick={() => setSingleFridgeZone(z)}
                    style={{
                      flex: 1, padding: '9px', border: 'none', borderRadius: 9,
                      background: singleFridgeZone === z ? 'white' : 'transparent',
                      boxShadow: singleFridgeZone === z ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                      fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
                      fontWeight: singleFridgeZone === z ? 700 : 400,
                      color: singleFridgeZone === z ? (z === 'freezer' ? '#1565C0' : '#1B5E3B') : '#6B8A7A',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    }}
                  >
                    {z === 'fridge' ? '❄️ 냉장실' : '🧊 냉동고'}
                  </button>
                ))}
              </div>
              <div style={{ background: 'white', borderRadius: 16, border: `1.5px solid ${singleFridgeZone === 'fridge' ? '#D4E4DA' : '#BBDEFB'}`, padding: 12 }}>
                <FridgeIllustrationAdmin
                  rooms={current.rooms}
                  zone={singleFridgeZone}
                  onRoomClick={room => openChat(room, current.id)}
                />
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {(Object.keys(statusLabel) as BoxStatus[]).map(k => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: statusBg[k], borderRadius: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: statusColor[k] }} />
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#1A2420' }}>{statusLabel[k]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat modal */}
      {chatOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '20px 24px 32px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: 0 }}>{chatFridge.location}</p>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: '#1A2420', margin: 0 }}>{chatRoom}호 학생에게 채팅</h3>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ width: 32, height: 32, border: 'none', background: '#F4F7F5', borderRadius: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="#6B8A7A" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ background: '#F4F7F5', borderRadius: 14, padding: '14px', marginBottom: 12 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: '#6B8A7A', margin: 0 }}>예: 안녕하세요, {chatRoom}호 학생! 냉장고에 유통기한이 지난 음식이 있어요. 확인 부탁드립니다.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="메시지를 입력하세요" style={{ flex: 1, padding: '12px 14px', border: '1.5px solid #D4E4DA', borderRadius: 12, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, outline: 'none' }} />
              <button style={{ padding: '12px 16px', background: '#1B5E3B', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2L9 14L7 9L2 7L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {['유통기한 확인 요청', '음식 정리 부탁드려요', '오늘까지 처리 부탁드립니다'].map(t => (
                <button key={t} style={{ padding: '5px 10px', background: '#E8F5EE', border: '1px solid #B8D8C8', borderRadius: 8, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#1B5E3B', cursor: 'pointer', flexShrink: 0 }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
    {/* Bottom nav */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E8F0EC', display: 'flex', padding: '8px 0 12px', zIndex: 10 }}>
      {[
        { icon: '❄️', label: '냉장고', active: true },
        { icon: '🚨', label: '운영센터', active: false, screen: 'adminOperations' },
        { icon: '📋', label: '음식정보', active: false, screen: 'adminFoodDetail' },
        { icon: '⚙️', label: '메뉴', active: false, screen: 'adminMenu' },
      ].map(tab => (
        <button
          key={tab.label}
          onClick={() => tab.screen && onNext(tab.screen)}
          style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 0' }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: tab.active ? '#1B5E3B' : '#B0C4BB', fontWeight: tab.active ? 700 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
    </div>
  )
}
