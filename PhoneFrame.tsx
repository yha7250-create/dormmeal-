import { type ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  statusLabel?: string
}

export default function PhoneFrame({ children, statusLabel }: PhoneFrameProps) {
  return (
    <div
      style={{
        width: 390,
        height: 780,
        borderRadius: 44,
        background: '#1A2420',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 2px #2E4038, inset 0 0 0 2px #0D1410',
        padding: 10,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 28,
          background: '#1A2420',
          borderRadius: 14,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 6, background: '#2E4038' }} />
        <div style={{ width: 48, height: 8, borderRadius: 4, background: '#2E4038' }} />
      </div>
      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 36,
          overflow: 'hidden',
          background: '#F4F7F5',
          position: 'relative',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: '#1A2420', opacity: 0.7 }}>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: '#1A2420', opacity: 0.6, borderRadius: 1, alignSelf: 'flex-end' }} />
              ))}
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" style={{ opacity: 0.6 }}>
              <path d="M7.5 2.5 Q11 0 14 2 Q11 4 7.5 7.5 Q4 4 1 2 Q4 0 7.5 2.5Z" fill="#1A2420" />
            </svg>
            <div style={{ width: 24, height: 12, border: '1.5px solid rgba(26,36,32,0.5)', borderRadius: 3, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '80%', height: '100%', background: '#1B5E3B', borderRadius: 1.5 }} />
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 44, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
      {statusLabel && (
        <div style={{
          position: 'absolute',
          bottom: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(26,36,32,0.8)',
          color: 'white',
          fontSize: 11,
          fontFamily: "'DM Mono', monospace",
          padding: '4px 12px',
          borderRadius: 20,
          whiteSpace: 'nowrap',
        }}>
          {statusLabel}
        </div>
      )}
    </div>
  )
}
