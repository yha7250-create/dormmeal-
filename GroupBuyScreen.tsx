import { useState } from 'react'

interface Props { onBack: () => void }

const categories = ['전체', '유제품', '육류', '채소류', '과일', '냉동식품', '음료']

const rooms = [
  {
    id: 1,
    title: '🥛 우유 4개 공동구매',
    category: '유제품',
    host: '302호',
    currentMembers: 3,
    maxMembers: 4,
    status: 'open',
    deadline: '8월 10일',
    price: '3,500원/개',
    account: '신한 110-123-456789 홍길동',
    paid: ['301호', '304호'],
    unpaid: ['305호'],
  },
  {
    id: 2,
    title: '🥩 닭가슴살 세트 공구',
    category: '육류',
    host: '307호',
    currentMembers: 2,
    maxMembers: 5,
    status: 'open',
    deadline: '8월 12일',
    price: '12,000원/묶음',
    account: '카카오 3333-01-234567 김철수',
    paid: ['309호'],
    unpaid: ['310호'],
  },
  {
    id: 3,
    title: '🥬 쌈채소 모둠 구매',
    category: '채소류',
    host: '311호',
    currentMembers: 4,
    maxMembers: 4,
    status: 'full',
    deadline: '8월 9일',
    price: '2,000원/봉',
    account: '국민 123456-78-901234 이영희',
    paid: ['301호', '302호', '307호', '308호'],
    unpaid: [],
  },
]

export default function GroupBuyScreen({ onBack }: Props) {
  const [selCat, setSelCat] = useState('전체')
  const [expanded, setExpanded] = useState<number | null>(1)
  const [showCreate, setShowCreate] = useState(false)

  const filtered = rooms.filter(r => selCat === '전체' || r.category === selCat)

  return (
    <div style={{ height: '100%', background: '#F4F7F5', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 56 }}>
      {/* Header */}
      <div style={{ background: '#1B5E3B', padding: '16px 24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <div>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: 0 }}>신촌학사 A동 3층</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: 'white', margin: 0 }}>공동 구매</h2>
            </div>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#F5C518', border: 'none', borderRadius: 10, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: '#1A2420', cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="#1A2420" strokeWidth="2.5" strokeLinecap="round" /></svg>
            채팅방 개설
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ padding: '12px 24px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelCat(c)}
            style={{
              padding: '7px 14px',
              background: selCat === c ? '#1B5E3B' : 'white',
              border: selCat === c ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA',
              borderRadius: 20,
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 12,
              fontWeight: selCat === c ? 700 : 400,
              color: selCat === c ? 'white' : '#1A2420',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Create form */}
      {showCreate && (
        <div style={{ margin: '12px 24px 0', background: 'white', borderRadius: 20, border: '2px solid #1B5E3B', padding: '16px 20px' }}>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: '#1A2420', margin: '0 0 14px' }}>새 채팅방 개설</h3>
          {[
            { label: '제목', placeholder: '예: 우유 4개 공동구매' },
            { label: '참여 조건', placeholder: '예: 3층 거주 학생만' },
            { label: '대표자 계좌', placeholder: '예: 신한 110-123-456789' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: '#6B8A7A', margin: '0 0 5px' }}>{f.label}</p>
              <input placeholder={f.placeholder} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #D4E4DA', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: '#6B8A7A', margin: '0 0 5px' }}>식품 종류</p>
              <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #D4E4DA', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, outline: 'none', background: 'white' }}>
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: '#6B8A7A', margin: '0 0 5px' }}>최대 인원</p>
              <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #D4E4DA', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, outline: 'none', background: 'white' }}>
                {[2,3,4,5,6,'제한없음'].map(n => <option key={n}>{n}명</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowCreate(false)} style={{ width: '100%', padding: '12px', background: '#1B5E3B', border: 'none', borderRadius: 12, fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer' }}>
            개설하기
          </button>
        </div>
      )}

      {/* Room list */}
      <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(room => (
          <div key={room.id} style={{ background: 'white', borderRadius: 20, border: '1.5px solid #D4E4DA', overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(expanded === room.id ? null : room.id)}
              style={{ width: '100%', padding: '16px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                  <span style={{ padding: '2px 8px', background: room.status === 'full' ? '#FEE2E2' : '#E8F5EE', borderRadius: 6, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, fontWeight: 600, color: room.status === 'full' ? '#EF4444' : '#1B5E3B' }}>
                    {room.status === 'full' ? '마감' : '모집중'}
                  </span>
                  <span style={{ padding: '2px 8px', background: '#F4F7F5', borderRadius: 6, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: '#6B8A7A' }}>{room.category}</span>
                </div>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, fontWeight: 600, color: '#1A2420', margin: 0 }}>{room.title}</p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: '#6B8A7A', margin: '3px 0 0' }}>
                  {room.host} 개설 · {room.currentMembers}/{room.maxMembers}명 · {room.deadline}까지 · {room.price}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: expanded === room.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}><path d="M5 10L8 7L5 4" stroke="#B0C4BB" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>

            {expanded === room.id && (
              <div style={{ padding: '0 20px 16px', borderTop: '1px solid #F0F4F2' }}>
                {/* Member bar */}
                <div style={{ display: 'flex', gap: 6, margin: '12px 0' }}>
                  {Array.from({ length: room.maxMembers }, (_, i) => (
                    <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < room.currentMembers ? '#1B5E3B' : '#E8F0EC' }} />
                  ))}
                </div>
                {/* Account */}
                <div style={{ background: '#E8F5EE', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#6B8A7A', margin: '0 0 2px' }}>대표자 계좌 (고정 공지)</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#1A2420', margin: 0, fontWeight: 500 }}>{room.account}</p>
                </div>
                {/* Paid list */}
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: '#6B8A7A', margin: '0 0 6px' }}>입금 체크리스트</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {room.paid.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#DCFCE7', borderRadius: 8 }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#16A34A', fontWeight: 500 }}>{p}</span>
                    </div>
                  ))}
                  {room.unpaid.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#FEE2E2', borderRadius: 8 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#EF4444', fontWeight: 500 }}>{p}</span>
                    </div>
                  ))}
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button style={{ flex: 1, padding: '10px', background: '#1B5E3B', border: 'none', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer' }}>참여하기</button>
                  <button style={{ padding: '10px 14px', background: '#FEE2E2', border: 'none', borderRadius: 10, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: '#EF4444', cursor: 'pointer' }}>신고</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      </div>
      {/* Bottom nav */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E8F0EC', display: 'flex', padding: '8px 0 12px', zIndex: 10 }}>
        {[
          { icon: '❄️', label: '냉장고', active: false },
          { icon: '🛒', label: '공동구매', active: true },
          { icon: '➕', label: '음식등록', active: false },
          { icon: '👤', label: '메뉴', active: false },
        ].map(tab => (
          <button
            key={tab.label}
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
