import { useMemo, useState, type ChangeEvent } from "react"
import { uid, type FoodItem, type StorageSize } from "../../model"

interface Props {
  onBack: () => void
  onDone: (food: FoodItem) => void
  usedUnits: number
  limit: number
}

const kinds = ["남은 배달음식", "개봉 식품", "구입 식품", "미개봉 냉장식품", "냉동식품"]
const categories = ["유제품", "육류", "채소류", "과일", "음료", "반찬", "냉동식품", "기타"]
const positions = ["상단 선반", "중단 선반", "하단 선반", "도어 포켓", "서랍"]
const sizes: { key: StorageSize; label: string; unit: number; example: string }[] = [
  { key: "small", label: "소형", unit: 1, example: "우유 1팩" },
  { key: "medium", label: "중형", unit: 2, example: "반찬통" },
  { key: "large", label: "대형", unit: 3, example: "냄비·큰 봉투" },
]

const fieldStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid #D4E4DA",
  borderRadius: 12,
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: 14,
  outline: "none",
  background: "white",
  color: "#1A2420",
} as const

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export default function AddFoodScreen({ onBack, onDone, usedUnits, limit }: Props) {
  const [name, setName] = useState("")
  const [kind, setKind] = useState(kinds[0])
  const [category, setCategory] = useState(categories[0])
  const [zone, setZone] = useState<"냉장실" | "냉동고">("냉장실")
  const [position, setPosition] = useState(positions[0])
  const [size, setSize] = useState<StorageSize>("small")
  const [expiry, setExpiry] = useState("")
  const [foodPhoto, setFoodPhoto] = useState("")
  const [expiryProof, setExpiryProof] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const units = sizes.find(item => item.key === size)?.unit ?? 1
  const overLimit = usedUnits + units > limit
  const highRisk = kind === "남은 배달음식" || kind === "개봉 식품"

  const reminder = useMemo(() => {
    if (expiry) return { date: new Date(`${expiry}T09:00:00`), rule: `소비기한 전 단계 알림${expiryProof ? " · 라벨 인증" : " · 미인증"}` }
    if (highRisk) return { date: addDays(new Date(), 1), rule: "부패 위험 식품 · 24시간 후 확인" }
    if (foodPhoto) return { date: addDays(new Date(), 14), rule: "사진 등록 · 14일 후 확인" }
    return { date: addDays(new Date(), 7), rule: "이름만 등록 · 7일 후 확인" }
  }, [expiry, expiryProof, foodPhoto, highRisk])

  function fileName(event: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) {
    setter(event.target.files?.[0]?.name ?? "")
  }

  function submit() {
    setError("")
    if (!name.trim()) {
      setError("음식 이름은 반드시 입력해야 합니다.")
      return
    }
    if (overLimit) {
      setError("보관 한도를 초과합니다. 기존 음식을 소비 또는 폐기 처리한 뒤 등록해 주세요.")
      return
    }
    const now = new Date()
    onDone({
      id: uid("food"), name: name.trim(), kind, category, zone, position, size, units,
      photoName: foodPhoto || undefined,
      expiry: expiry || undefined,
      expiryProofName: expiryProof || undefined,
      expiryVerified: Boolean(expiry && expiryProof),
      registeredAt: now.toISOString(),
      reminderAt: reminder.date.toISOString(),
      reminderRule: reminder.rule,
    })
    setSaved(true)
    window.setTimeout(onBack, 850)
  }

  return (
    <div className="dm-screen">
      <header className="dm-header">
        <button className="dm-icon-button dark" onClick={onBack} aria-label="뒤로 가기">‹</button>
        <div><p>무악학사 1관 3층 · 냉장고 B</p><h2>음식 등록</h2></div>
        <span className="dm-step">필수 1개</span>
      </header>

      <main className="dm-stack">
        <section className="dm-card limit-card">
          <div className="dm-row between">
            <div><span className="dm-eyebrow">MY STORAGE</span><strong>{usedUnits} / {limit}칸 사용 중</strong></div>
            <span className={overLimit ? "dm-badge danger" : "dm-badge green"}>{Math.max(0, limit - usedUnits)}칸 남음</span>
          </div>
          <div className="dm-progress"><span style={{ width: `${Math.min(100, usedUnits / limit * 100)}%` }} /></div>
          <p className="dm-help">부피를 카메라로 억지 추정하지 않고, 용기 크기를 1·2·3칸으로 표준화합니다.</p>
        </section>

        <section>
          <label className="dm-label" htmlFor="food-name">음식 이름 <b>필수</b></label>
          <input id="food-name" value={name} onChange={event => setName(event.target.value)} placeholder="예: 닭가슴살 3팩" style={fieldStyle} />
        </section>

        <section>
          <span className="dm-label">보관 크기</span>
          <div className="dm-choice-grid three">
            {sizes.map(item => (
              <button key={item.key} onClick={() => setSize(item.key)} className={size === item.key ? "dm-choice selected" : "dm-choice"}>
                <strong>{item.label} · {item.unit}칸</strong><small>{item.example}</small>
              </button>
            ))}
          </div>
          {overLimit && <p className="dm-error compact">이 크기는 한도를 넘습니다. 더 작은 용기를 선택하거나 기존 음식을 정리하세요.</p>}
        </section>

        <section className="dm-card">
          <div className="dm-row between align-start">
            <div><span className="dm-label no-margin">보관 위치 사진</span><p className="dm-help">사진을 찍으면 나중에 음식을 빠르게 찾을 수 있어요.</p></div>
            <label className="dm-upload">{foodPhoto ? "사진 변경" : "카메라"}<input type="file" accept="image/*" capture="environment" onChange={event => fileName(event, setFoodPhoto)} /></label>
          </div>
          {foodPhoto && <div className="dm-file">✓ {foodPhoto}</div>}
        </section>

        <section>
          <span className="dm-label">음식 종류</span>
          <div className="dm-pills">{kinds.map(item => <button key={item} onClick={() => setKind(item)} className={kind === item ? "active" : ""}>{item}</button>)}</div>
        </section>

        <section>
          <span className="dm-label">분류</span>
          <div className="dm-pills">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}</div>
        </section>

        <section>
          <span className="dm-label">냉장고 위치</span>
          <div className="dm-segmented">{(["냉장실", "냉동고"] as const).map(item => <button key={item} onClick={() => setZone(item)} className={zone === item ? "active" : ""}>{item}</button>)}</div>
          <select value={position} onChange={event => setPosition(event.target.value)} style={{ ...fieldStyle, marginTop: 8 }}>{positions.map(item => <option key={item}>{item}</option>)}</select>
        </section>

        <section className="dm-card">
          <div className="dm-row between align-start">
            <div><span className="dm-label no-margin">소비기한</span><p className="dm-help">모르면 비워 두어도 됩니다. 식품 라벨은 선택 인증입니다.</p></div>
            <span className="dm-badge neutral">선택</span>
          </div>
          <input type="date" value={expiry} onChange={event => setExpiry(event.target.value)} style={{ ...fieldStyle, marginTop: 10 }} />
          <label className="dm-upload wide">{expiryProof ? `✓ ${expiryProof}` : "소비기한 라벨 사진 첨부"}<input type="file" accept="image/*" capture="environment" onChange={event => fileName(event, setExpiryProof)} /></label>
          <div className={expiry && !expiryProof ? "dm-notice amber" : "dm-notice"}><strong>예정 알림</strong><span>{reminder.rule}</span></div>
        </section>

        {error && <p className="dm-error" role="alert">{error}</p>}
        {saved && <p className="dm-success" role="status">등록되었습니다. 냉장고 현황에 반영했어요.</p>}
        <button className="dm-primary" onClick={submit} disabled={saved}>등록 완료 · {units}칸 사용</button>
      </main>
    </div>
  )
}
