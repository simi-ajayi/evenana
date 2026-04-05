import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { DaySpaPage } from './pages/DaySpaPage'
import { GiftingPage } from './pages/GiftingPage'
import { HomePage } from './pages/HomePage'
import { MembershipPage } from './pages/MembershipPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicePage } from './pages/ServicePage'
import { TreatmentsPage } from './pages/TreatmentsPage'
import { WellbeingSpacesPage } from './pages/WellbeingSpacesPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/:slug" element={<ServicePage />} />
          <Route path="/day-spa" element={<DaySpaPage />} />
          <Route path="/wellbeing-spaces" element={<WellbeingSpacesPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/gifting" element={<GiftingPage />} />
          <Route path="/services/:slug" element={<Navigate to="/treatments" replace />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
