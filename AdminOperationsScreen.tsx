import { useMemo, useState } from "react"
import type { FridgeMetric, IncidentReport, ReportStatus } from "../../model"

interface Props {
  onBack: () => void
  fridges: FridgeMetric[]
  reports: IncidentReport[]
  onUpdateStatus: (id: string, status: ReportStatus) => void
}

const nextStatus: Record<ReportStatus, ReportStatus> = { "접수": "확인 중", "확인 중": "처리 완료", "처리 완료": "처리 완료" }

export default function AdminOperationsScreen({ onBack, fridges, reports, onUpdateStatus }: Props) {
  const [filter, setFilter] = useState<"all" | "open">("open")
  const ranked = useMemo(() => [...fridges].sort((a, b) => ((b.used / b.capacity) * 100 + b.reports * 8 + b.expired * 4) - ((a.used / a.capacity) * 100 + a.reports * 8 + a.expired * 4)), [fridges])
  const visible = filter === "all" ? reports : reports.filter(report => report.status !== "처리 완료")

  return (
    <div className="dm-screen">
      <header className="dm-header admin-header">
        <button className="dm-icon-button dark" onClick={onBack} aria-label="뒤로 가기">‹</button>
        <div><p>RC 운영 화면 · 실시간 우선순위</p><h2>정리 운영센터</h2></div>
        <span className="dm-step admin">ADMIN</span>
      </header>

      <main className="dm-stack">
        <section className="admin-kpis">
          <div><span>미처리 신고</span><strong>{reports.filter(item => item.status !== "처리 완료").length}</strong></div>
          <div><span>90% 이상</span><strong>{fridges.filter(item => item.used / item.capacity >= .9).length}</strong></div>
          <div><span>기한 경과</span><strong>{fridges.reduce((sum, item) => sum + item.expired, 0)}</strong></div>
        </section>

        <section>
          <div className="dm-section-title"><div><span className="dm-eyebrow">PRIORITY</span><h3>관리 우선 냉장고</h3></div></div>
          <div className="priority-list">
            {ranked.map((item, index) => {
              const percent = Math.round(item.used / item.capacity * 100)
              return (
                <article className="dm-card priority" key={item.id}>
                  <span className={index === 0 ? "rank top" : "rank"}>{index + 1}</span>
                  <div className="grow"><strong>{item.building} {item.floor} · {item.label}</strong><div className="dm-progress"><span className={percent >= 90 ? "danger-bar" : "warn-bar"} style={{ width: `${percent}%` }} /></div><small>점유 {percent}% · 신고 {item.reports}건 · 기한 경과 {item.expired}개</small></div>
                  <button className="dm-text-button">공지</button>
                </article>
              )
            })}
          </div>
        </section>

        <section>
          <div className="dm-section-title"><div><span className="dm-eyebrow">REPORT QUEUE</span><h3>신고 처리</h3></div><div className="mini-toggle"><button className={filter === "open" ? "active" : ""} onClick={() => setFilter("open")}>미처리</button><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>전체</button></div></div>
          <div className="dm-list">
            {visible.map(report => (
              <article className="dm-card admin-report" key={report.id}>
                <div className="dm-row between align-start"><div><span className="dm-badge coral">{report.category}</span><h4>{report.location}</h4></div><span className={`status ${report.status.replace(" ", "-")}`}>{report.status}</span></div>
                <p>{report.description}</p>
                <div className="dm-row between"><small>{report.reporter} · {report.photoName ? "사진 첨부" : "사진 없음"}</small>{report.status !== "처리 완료" && <button className="dm-text-button" onClick={() => onUpdateStatus(report.id, nextStatus[report.status])}>{nextStatus[report.status]}으로</button>}</div>
              </article>
            ))}
            {visible.length === 0 && <div className="dm-empty">처리할 신고가 없습니다.</div>}
          </div>
        </section>
      </main>
    </div>
  )
}
