import { useState } from 'react'

interface Props { onNext: (screen: string) => void; onBack: () => void; nextScreen?: string }

export default function ProfileRegisterScreen({ onNext, onBack, nextScreen = 'fridge' }: Props) {
  const [agreed, setAgreed] = useState(false)
  const [agreed2, setAgreed2] = useState(false)

  return (
    <div style={{ minHeight: '100%', background: '#F4F7F5', paddingBottom: 32 }}>
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, border: 'none', background: 'white', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14L6 9L11 4" stroke="#1A2420" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: '#1A2420', margin: 0 }}>내 정보 등록</h2>
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#6B8A7A', margin: '2px 0 0' }}>기본 정보를 입력해주세요</p>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: '이름', placeholder: '홍길동', type: 'text' },
          { label: '학번', placeholder: '2024123456', type: 'text' },
          { label: '전화번호', placeholder: '010-1234-5678', type: 'tel' },
          { label: '호수', placeholder: '302호', type: 'text' },
        ].map(field => (
          <div key={field.label}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{field.label}</p>
            <input
              type={field.type}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'white',
                border: '1.5px solid #D4E4DA',
                borderRadius: 12,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 15,
                color: '#1A2420',
                outline: 'none',
              }}
            />
          </div>
        ))}

        {/* Privacy agreements */}
        <div style={{ marginTop: 8 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B8A7A', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>개인정보 동의</p>
          <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #D4E4DA', overflow: 'hidden' }}>
            {[
              { label: '(필수) 개인정보 수집 및 이용 동의', val: agreed, set: setAgreed },
              { label: '(선택) 마케팅 활용 동의', val: agreed2, set: setAgreed2 },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => item.set(!item.val)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i === 0 ? '1px solid #F0F4F2' : 'none', cursor: 'pointer' }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 6, background: item.val ? '#1B5E3B' : 'white', border: item.val ? '2px solid #1B5E3B' : '1.5px solid #D4E4DA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.val && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>}
                </div>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: '#1A2420', flex: 1 }}>{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 10L8 7L5 4" stroke="#B0C4BB" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <button
          onClick={() => onNext(nextScreen)}
          style={{ width: '100%', padding: '16px', background: '#1B5E3B', border: 'none', borderRadius: 16, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: 'white', cursor: 'pointer' }}
        >
          가입 완료
        </button>
      </div>
    </div>
  )
}
