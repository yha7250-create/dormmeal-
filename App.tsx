import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import EagleMascot from './components/EagleMascot'

// Student screens
import SplashScreen from './screens/student/SplashScreen'
import SchoolSelectScreen from './screens/student/SchoolSelectScreen'
import DormSelectScreen from './screens/student/DormSelectScreen'
import ProfileRegisterScreen from './screens/student/ProfileRegisterScreen'
import FridgeScreen from './screens/student/FridgeScreen'
import MenuScreen from './screens/student/MenuScreen'
import GroupBuyScreen from './screens/student/GroupBuyScreen'
import AddFoodScreen from './screens/student/AddFoodScreen'
import ImpactScreen from './screens/student/ImpactScreen'
import ReportScreen from './screens/student/ReportScreen'
import CommunityScreen from './screens/student/CommunityScreen'

// Admin screens
import AdminSplashScreen from './screens/admin/AdminSplashScreen'
import AdminDormSelectScreen from './screens/admin/AdminDormSelectScreen'
import AdminFridgeOverviewScreen from './screens/admin/AdminFridgeOverviewScreen'
import AdminFoodDetailScreen from './screens/admin/AdminFoodDetailScreen'
import AdminMenuScreen from './screens/admin/AdminMenuScreen'
import AdminOperationsScreen from './screens/admin/AdminOperationsScreen'
import { useDormMealStore, type DormMealStore } from './useDormMealStore'

type StudentScreen = 'splash' | 'schoolSelect' | 'dormSelect' | 'profileRegister' | 'fridge' | 'impact' | 'report' | 'community' | 'menu' | 'groupBuy' | 'addFood'
type AdminScreen = 'adminSplash' | 'adminSchoolSelect' | 'adminDormSelect' | 'adminProfileRegister' | 'adminFridge' | 'adminOperations' | 'adminFoodDetail' | 'adminMenu'

const studentScreenLabels: Record<StudentScreen, string> = {
  splash: '시작화면',
  schoolSelect: '학교 선택',
  dormSelect: '기숙사 선택',
  profileRegister: '내 정보 등록',
  fridge: '냉장고 화면',
  impact: '공간·내 음식',
  report: '문제 신고',
  community: '층 커뮤니티',
  menu: '메뉴',
  groupBuy: '공동구매',
  addFood: '음식 등록',
}

const adminScreenLabels: Record<AdminScreen, string> = {
  adminSplash: '시작화면',
  adminSchoolSelect: '학교 선택',
  adminDormSelect: '구역 설정',
  adminProfileRegister: '내 정보 등록',
  adminFridge: '냉장고 현황',
  adminOperations: '정리 운영센터',
  adminFoodDetail: '음식 정보',
  adminMenu: '메뉴',
}

const studentFlow: StudentScreen[] = ['splash', 'schoolSelect', 'dormSelect', 'profileRegister', 'fridge', 'impact', 'report', 'community', 'addFood', 'menu']
const adminFlow: AdminScreen[] = ['adminSplash', 'adminSchoolSelect', 'adminDormSelect', 'adminProfileRegister', 'adminFridge', 'adminOperations', 'adminFoodDetail', 'adminMenu']

function StudentApp({ store }: { store: DormMealStore }) {
  const [screen, setScreen] = useState<StudentScreen>('splash')
  const [history, setHistory] = useState<StudentScreen[]>([])

  const go = (s: string) => {
    setHistory(h => [...h, screen])
    setScreen(s as StudentScreen)
  }
  const back = () => {
    if (history.length > 0) {
      setScreen(history[history.length - 1])
      setHistory(h => h.slice(0, -1))
    }
  }

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen onNext={go} />
      case 'schoolSelect': return <SchoolSelectScreen onNext={go} onBack={back} />
      case 'dormSelect': return <DormSelectScreen onNext={go} onBack={back} />
      case 'profileRegister': return <ProfileRegisterScreen onNext={go} onBack={back} />
      case 'fridge': return <FridgeScreen onNext={go} />
      case 'impact': return <ImpactScreen onBack={back} foods={store.foods} fridges={store.fridges} usedUnits={store.usedUnits} limit={store.personalLimit} onRemoveFood={store.removeFood} />
      case 'report': return <ReportScreen onBack={back} reports={store.reports} onSubmit={store.addReport} />
      case 'community': return <CommunityScreen onBack={back} rooms={store.rooms} onAddRoom={store.addRoom} onSend={store.sendMessage} />
      case 'menu': return <MenuScreen onBack={back} />
      case 'groupBuy': return <GroupBuyScreen onBack={back} />
      case 'addFood': return <AddFoodScreen onBack={back} onDone={store.addFood} usedUnits={store.usedUnits} limit={store.personalLimit} />
      default: return <SplashScreen onNext={go} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Screen tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 420 }}>
        {studentFlow.map(s => (
          <button
            key={s}
            onClick={() => { setHistory([]); setScreen(s) }}
            style={{
              padding: '5px 12px',
              background: screen === s ? '#1B5E3B' : 'rgba(255,255,255,0.7)',
              border: screen === s ? '1.5px solid #1B5E3B' : '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 20,
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 11,
              fontWeight: screen === s ? 700 : 400,
              color: screen === s ? 'white' : '#1A2420',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            {studentScreenLabels[s]}
          </button>
        ))}
      </div>
      <PhoneFrame statusLabel={`학생앱 · ${studentScreenLabels[screen]}`}>
        {renderScreen()}
      </PhoneFrame>
    </div>
  )
}

function AdminApp({ store }: { store: DormMealStore }) {
  const [screen, setScreen] = useState<AdminScreen>('adminSplash')
  const [history, setHistory] = useState<AdminScreen[]>([])

  const go = (s: string) => {
    setHistory(h => [...h, screen])
    setScreen(s as AdminScreen)
  }
  const back = () => {
    if (history.length > 0) {
      setScreen(history[history.length - 1])
      setHistory(h => h.slice(0, -1))
    }
  }

  const renderScreen = () => {
    switch (screen) {
      case 'adminSplash': return <AdminSplashScreen onNext={go} />
      case 'adminSchoolSelect': return <SchoolSelectScreen onNext={go} onBack={back} nextScreen="adminDormSelect" />
      case 'adminDormSelect': return <AdminDormSelectScreen onNext={go} onBack={back} />
      case 'adminProfileRegister': return <ProfileRegisterScreen onNext={go} onBack={back} nextScreen="adminFridge" />
      case 'adminFridge': return <AdminFridgeOverviewScreen onNext={go} />
      case 'adminOperations': return <AdminOperationsScreen onBack={back} fridges={store.fridges} reports={store.reports} onUpdateStatus={store.updateReportStatus} />
      case 'adminFoodDetail': return <AdminFoodDetailScreen onBack={back} />
      case 'adminMenu': return <AdminMenuScreen onBack={back} />
      default: return <AdminSplashScreen onNext={go} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 420 }}>
        {adminFlow.map(s => (
          <button
            key={s}
            onClick={() => { setHistory([]); setScreen(s) }}
            style={{
              padding: '5px 12px',
              background: screen === s ? '#F5C518' : 'rgba(255,255,255,0.7)',
              border: screen === s ? '1.5px solid #F5C518' : '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 20,
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 11,
              fontWeight: screen === s ? 700 : 400,
              color: '#1A2420',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            {adminScreenLabels[s]}
          </button>
        ))}
      </div>
      <PhoneFrame statusLabel={`관리자앱 · ${adminScreenLabels[screen]}`}>
        {renderScreen()}
      </PhoneFrame>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'both' | 'student' | 'admin'>('both')
  const store = useDormMealStore()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F3D2B 0%, #1B5E3B 40%, #2E7D52 70%, #1B5E3B 100%)', padding: '24px 20px 60px' }}>
      {/* Top header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 52, height: 52, background: 'white', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <EagleMascot size={44} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-1px' }}>Dormmeal</h1>
            <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>함께 쓰는 냉장고를 더 깨끗하고 공정하게</p>
          </div>
        </div>
        {/* Tab switcher */}
        <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.25)', borderRadius: 14, padding: 4, gap: 2 }}>
          {([['both', '학생 + 관리자'], ['student', '학생앱만'], ['admin', '관리자앱만']] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 18px',
                background: activeTab === tab ? 'white' : 'transparent',
                border: 'none',
                borderRadius: 10,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? '#1B5E3B' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {(activeTab === 'both' || activeTab === 'student') && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: 16 }}>🎓</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: 'white' }}>학생용 앱</span>
              </div>
            </div>
            <StudentApp store={store} />
          </div>
        )}

        {activeTab === 'both' && (
          <div style={{ width: 1, background: 'rgba(255,255,255,0.15)', alignSelf: 'stretch', margin: '0 0', borderRadius: 1 }} />
        )}

        {(activeTab === 'both' || activeTab === 'admin') && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,197,24,0.2)', borderRadius: 20, padding: '6px 14px', border: '1px solid rgba(245,197,24,0.4)' }}>
                <span style={{ fontSize: 16 }}>⭐</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: '#F5C518' }}>관리자용 앱</span>
              </div>
            </div>
            <AdminApp store={store} />
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 20, background: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: '12px 20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { color: '#22C55E', label: '안전 (Safe)' },
            { color: '#F59E0B', label: '주의 (7일+)' },
            { color: '#EF4444', label: '임박 (3일-)' },
            { color: '#991B1B', label: '기한 초과' },
            { color: '#D4E4DA', label: '비어있음' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
              <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
