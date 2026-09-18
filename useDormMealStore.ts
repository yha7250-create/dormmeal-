import { useEffect, useMemo, useState } from "react"
import {
  initialFoods,
  initialFridges,
  initialReports,
  initialRooms,
  uid,
  type ChatRoom,
  type FoodItem,
  type FridgeMetric,
  type IncidentReport,
  type ReportStatus,
} from "./model"

function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export function useDormMealStore() {
  const [foods, setFoods] = useStoredState<FoodItem[]>("dormmeal.foods.v2", initialFoods)
  const [reports, setReports] = useStoredState<IncidentReport[]>("dormmeal.reports.v2", initialReports)
  const [rooms, setRooms] = useStoredState<ChatRoom[]>("dormmeal.rooms.v2", initialRooms)
  const [fridges, setFridges] = useStoredState<FridgeMetric[]>("dormmeal.fridges.v2", initialFridges)

  const usedUnits = useMemo(() => foods.reduce((sum, item) => sum + item.units, 0), [foods])
  const personalLimit = 8

  function addFood(food: FoodItem) {
    setFoods(current => [food, ...current])
    setFridges(current => current.map(fridge => fridge.id === "1-3-b"
      ? { ...fridge, used: Math.min(fridge.capacity, fridge.used + food.units) }
      : fridge))
  }

  function removeFood(id: string) {
    const target = foods.find(food => food.id === id)
    setFoods(current => current.filter(food => food.id !== id))
    if (target) {
      setFridges(current => current.map(fridge => fridge.id === "1-3-b"
        ? { ...fridge, used: Math.max(0, fridge.used - target.units) }
        : fridge))
    }
  }

  function addReport(report: IncidentReport) {
    setReports(current => [report, ...current])
    setFridges(current => current.map(fridge => fridge.id === "1-3-b"
      ? { ...fridge, reports: fridge.reports + 1 }
      : fridge))
  }

  function updateReportStatus(id: string, status: ReportStatus) {
    setReports(current => current.map(report => report.id === id ? { ...report, status } : report))
  }

  function addRoom(room: ChatRoom) {
    setRooms(current => [room, ...current])
  }

  function sendMessage(roomId: string, text: string, role: "student" | "admin" = "student") {
    const clean = text.trim()
    if (!clean) return
    setRooms(current => current.map(room => room.id === roomId ? {
      ...room,
      messages: [...room.messages, {
        id: uid("message"),
        author: role === "admin" ? "RC 김관리" : "302호",
        role,
        text: clean,
        sentAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }),
      }],
    } : room))
  }

  return {
    foods,
    reports,
    rooms,
    fridges,
    usedUnits,
    personalLimit,
    addFood,
    removeFood,
    addReport,
    updateReportStatus,
    addRoom,
    sendMessage,
  }
}

export type DormMealStore = ReturnType<typeof useDormMealStore>
