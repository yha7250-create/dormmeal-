export type StorageSize = "small" | "medium" | "large"

export interface FoodItem {
  id: string
  name: string
  kind: string
  category: string
  zone: "냉장실" | "냉동고"
  position: string
  size: StorageSize
  units: number
  photoName?: string
  expiry?: string
  expiryProofName?: string
  expiryVerified: boolean
  registeredAt: string
  reminderAt: string
  reminderRule: string
}

export type ReportCategory = "도난·무단 수거" | "소비기한 경과" | "라벨 미부착" | "악취·오염" | "기타"
export type ReportStatus = "접수" | "확인 중" | "처리 완료"

export interface IncidentReport {
  id: string
  category: ReportCategory
  location: string
  description: string
  photoName?: string
  reporter: string
  status: ReportStatus
  createdAt: string
}

export interface ChatMessage {
  id: string
  author: string
  role: "student" | "admin"
  text: string
  sentAt: string
}

export interface ChatRoom {
  id: string
  type: "care" | "groupbuy"
  title: string
  location: string
  adminPresent: boolean
  participants: number
  pickupPlace?: string
  settlement?: string
  messages: ChatMessage[]
}

export interface FridgeMetric {
  id: string
  building: string
  floor: string
  label: string
  used: number
  capacity: number
  reports: number
  expired: number
}

export const initialFoods: FoodItem[] = [
  {
    id: "food-1",
    name: "그릭요거트",
    kind: "미개봉 냉장식품",
    category: "유제품",
    zone: "냉장실",
    position: "중단 선반",
    size: "small",
    units: 1,
    expiry: "2026-09-21",
    expiryProofName: "yogurt-label.jpg",
    expiryVerified: true,
    registeredAt: "2026-09-17T09:00:00.000Z",
    reminderAt: "2026-09-20T09:00:00.000Z",
    reminderRule: "소비기한 1일 전",
  },
  {
    id: "food-2",
    name: "닭가슴살 3팩",
    kind: "냉동식품",
    category: "육류",
    zone: "냉동고",
    position: "상단 선반",
    size: "medium",
    units: 2,
    photoName: "chicken.jpg",
    expiryVerified: false,
    registeredAt: "2026-09-15T12:00:00.000Z",
    reminderAt: "2026-09-29T12:00:00.000Z",
    reminderRule: "사진 등록 · 14일 후 확인",
  },
]

export const initialReports: IncidentReport[] = [
  {
    id: "report-1",
    category: "악취·오염",
    location: "무악학사 1관 3층 · 냉장고 B 하단",
    description: "검은 봉투 주변에서 강한 냄새가 납니다.",
    photoName: "fridge-zone-b.jpg",
    reporter: "302호 · 익명",
    status: "접수",
    createdAt: "2026-09-18T08:40:00.000Z",
  },
  {
    id: "report-2",
    category: "라벨 미부착",
    location: "무악학사 1관 2층 · 냉장고 A",
    description: "소유자 표시가 없는 큰 용기가 공간을 차지하고 있어요.",
    reporter: "215호",
    status: "확인 중",
    createdAt: "2026-09-17T14:20:00.000Z",
  },
]

export const initialRooms: ChatRoom[] = [
  {
    id: "care-3f",
    type: "care",
    title: "3층 냉장고 정리방",
    location: "무악학사 1관 3층",
    adminPresent: true,
    participants: 18,
    messages: [
      { id: "m1", author: "RC 김관리", role: "admin", text: "오늘 22시까지 기한이 지난 음식 확인 부탁드립니다.", sentAt: "18:10" },
      { id: "m2", author: "318호", role: "student", text: "하단 검은 봉투 제 것이 아닙니다. 신고로 남길게요.", sentAt: "18:14" },
    ],
  },
  {
    id: "buy-chicken",
    type: "groupbuy",
    title: "닭가슴살 20팩 공동구매",
    location: "무악학사 1관 3층",
    adminPresent: true,
    participants: 5,
    pickupPlace: "1관 1층 로비",
    settlement: "1인 12,500원 · 계좌이체",
    messages: [
      { id: "m3", author: "302호", role: "student", text: "금요일 19시에 수령하겠습니다.", sentAt: "17:42" },
    ],
  },
]

export const initialFridges: FridgeMetric[] = [
  { id: "1-2-a", building: "1관", floor: "2층", label: "냉장고 A", used: 26, capacity: 40, reports: 1, expired: 1 },
  { id: "1-3-a", building: "1관", floor: "3층", label: "냉장고 A", used: 34, capacity: 40, reports: 1, expired: 4 },
  { id: "1-3-b", building: "1관", floor: "3층", label: "냉장고 B", used: 38, capacity: 40, reports: 3, expired: 6 },
  { id: "2-4-a", building: "2관", floor: "4층", label: "냉장고 A", used: 19, capacity: 40, reports: 0, expired: 0 },
]

export function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
