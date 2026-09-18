import type { FoodItem, FridgeMetric } from "../../model"

interface Props {
  onBack: () => void
  foods: FoodItem[]
  fridges: FridgeMetric[]
  usedUnits: number
  limit: number
  onRemoveFood: (id: string) => void
}

function occupancy(metric: FridgeMetric) {
  return Math.round(metric.used / metric.capacity * 100)
}

export default function ImpactScreen({ onBack, foods, fridges, usedUnits, limit, onRemoveFood }: Props) {
  const available = [...fridges].sort((a, b) => occupancy(a) - occupancy(b))[0]
  const urgent = [...fridges].sort((a, b) => (occupancy(b) + b.reports * 8) - (occupancy(a) + a.reports * 8))[0]

  return (
    <div className="dm-screen">
      <header className="dm-header">
        <button className="dm-icon-button dark" onClick={onBack} aria-label="뒤로 가기">‹</button>
        <div><p>무악학사 전체 현황</p><h2>공간 & 내 음식</h2></div>
      </header>

      <main className="dm-stack">
        <section className="dm-hero-card">
          <span className="dm-eyebrow light">THIS WEEK</span>
          <h3>이번 주 정리로<br /><b>냉장고 3칸</b>을 확보했어요</h3>
          <div className="mission-progress"><span style={{ width: "70%" }} /></div>
          <div className="dm-row between"><small>3층 공동 목표</small><strong>7 / 10개 정리</strong></div>
        </section>

        <section className="dm-grid two">
          <div className="dm-card recommendation good">
            <span>여유 공간</span><strong>{available.building} {available.floor}</strong><small>{available.label} · {100 - occupancy(available)}% 남음</small>
          </div>
          <div className="dm-card recommendation urgent">
            <span>정리 우선</span><strong>{urgent.building} {urgent.floor}</strong><small>{urgent.label} · 신고 {urgent.reports}건</small>
          </div>
        </section>

        <section>
          <div className="dm-section-title"><div><span className="dm-eyebrow">LIVE CAPACITY</span><h3>동·층별 냉장고 사용량</h3></div><span className="dm-badge neutral">40칸 기준</span></div>
          <div className="dm-list">
            {fridges.map(metric => {
              const percent = occupancy(metric)
              return (
                <article className="dm-card metric" key={metric.id}>
                  <div className="dm-row between"><div><strong>{metric.building} {metric.floor} · {metric.label}</strong><small>{metric.used}/{metric.capacity}칸 사용</small></div><b className={percent >= 90 ? "red" : percent >= 75 ? "amber-text" : "green-text"}>{percent}%</b></div>
                  <div className="dm-progress"><span className={percent >= 90 ? "danger-bar" : percent >= 75 ? "warn-bar" : ""} style={{ width: `${percent}%` }} /></div>
                  <div className="dm-row gap"><span>기한 경과 {metric.expired}</span><span>신고 {metric.reports}</span></div>
                </article>
              )
            })}
          </div>
        </section>

        <section>
          <div className="dm-section-title"><div><span className="dm-eyebrow">MY FOOD</span><h3>내 보관 목록</h3></div><span className="dm-badge green">{usedUnits}/{limit}칸</span></div>
          <div className="dm-list">
            {foods.map(food => (
              <article className="dm-card food-row" key={food.id}>
                <div className="food-unit">{food.units}</div>
                <div className="grow"><div className="dm-row gap"><strong>{food.name}</strong>{food.expiryVerified && <span className="verified">인증</span>}</div><small>{food.zone} · {food.position}</small><p>{food.reminderRule}</p></div>
                <button className="dm-text-button danger" onClick={() => onRemoveFood(food.id)}>처리</button>
              </article>
            ))}
            {foods.length === 0 && <div className="dm-empty">등록된 음식이 없습니다.</div>}
          </div>
        </section>
      </main>
    </div>
  )
}
