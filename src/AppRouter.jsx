import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { BookingsPage } from './pages/BookingsPage'
import { BookSlugRedirectPage } from './pages/BookSlugRedirectPage'
import { CartPage } from './pages/CartPage'
import { DaySpaPage } from './pages/DaySpaPage'
import { GiftCardsPage } from './pages/GiftCardsPage'
import { GiftingPage } from './pages/GiftingPage'
import { HomePage } from './pages/HomePage'
import { MembershipPage } from './pages/MembershipPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PaymentCallbackPage } from './pages/PaymentCallbackPage'
import { ProductsPage } from './pages/ProductsPage'
import { ServicePage } from './pages/ServicePage'
import { TreatmentsPage } from './pages/TreatmentsPage'
import { WellbeingSpacesPage } from './pages/WellbeingSpacesPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/appointments" element={<BookingsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/payment/callback" element={<PaymentCallbackPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/:slug" element={<ServicePage />} />
          <Route path="/services" element={<Navigate to="/treatments" replace />} />
          <Route path="/day-spa" element={<DaySpaPage />} />
          <Route path="/wellbeing-spaces" element={<WellbeingSpacesPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/gifting" element={<GiftingPage />} />
          <Route path="/book/:slug" element={<BookSlugRedirectPage />} />
          <Route path="/services/:slug" element={<Navigate to="/treatments" replace />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
