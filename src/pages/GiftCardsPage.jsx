import { useEffect, useState } from 'react'
import spa12 from '../assets/spa/spa-12.jpg'
import { PageHero } from '../components/site/PageHero'
import { getBranches, getPublicGiftCardOffers, purchaseGiftCard } from '../services/publicApi'

export function GiftCardsPage() {
  const [branches, setBranches] = useState([])
  const [offers, setOffers] = useState([])
  const [selectedOfferId, setSelectedOfferId] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [form, setForm] = useState({
    branchId: '',
    purchaserName: '',
    purchaserEmail: '',
    recipientName: '',
    recipientEmail: '',
    amount: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const hero = {
    label: 'Gift Cards',
    title: 'Buy eGift Card',
    description: 'Choose a card and continue to checkout.',
    image: spa12,
    primaryCta: {
      to: '/products',
      label: 'View Products',
    },
    secondaryCta: {
      to: '/bookings',
      label: 'Book Consultation',
    },
  }

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const data = await getBranches()
        if (active) {
          setBranches(data)
          if (data.length > 0) {
            setForm((prev) => ({ ...prev, branchId: prev.branchId || data[0].id }))
          }
        }
      } catch {
        if (active) setError('Unable to load branches. Please refresh and try again.')
      }
    })()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!form.branchId) return
    let active = true
    ;(async () => {
      try {
        const data = await getPublicGiftCardOffers(form.branchId)
        if (active) setOffers(data)
      } catch {
        if (active) setOffers([])
      }
    })()
    return () => {
      active = false
    }
  }, [form.branchId])

  const currency = offers[0]?.currency ?? 'NGN'

  const openCheckoutForOffer = (offer) => {
    setSelectedOfferId(offer.id)
    setSelectedAmount(offer.displayValue)
    setForm((prev) => ({ ...prev, amount: '' }))
    setShowCheckout(true)
  }

  const openCheckoutForAmount = (amount) => {
    setSelectedOfferId('')
    setSelectedAmount(amount)
    setForm((prev) => ({ ...prev, amount: String(amount) }))
    setShowCheckout(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!form.branchId || !form.purchaserEmail || !form.recipientEmail) {
      setError('Please fill in all required fields.')
      return
    }
    const selectedOffer = offers.find((o) => o.id === selectedOfferId)
    const customAmount = Number(form.amount)
    const finalAmount = selectedOffer ? selectedOffer.displayValue : selectedAmount ?? customAmount
    if (!selectedOffer && (!Number.isFinite(customAmount) || customAmount <= 0)) {
      setError('Select an offer or enter a valid custom amount.')
      return
    }
    setLoading(true)
    try {
      const result = await purchaseGiftCard({
        branchId: form.branchId,
        purchaserName: form.purchaserName,
        purchaserEmail: form.purchaserEmail,
        recipientName: form.recipientName,
        recipientEmail: form.recipientEmail,
        offerId: selectedOffer?.id,
        amount: selectedOffer ? selectedOffer.displayValue : finalAmount,
        customAmount: selectedOffer ? undefined : finalAmount,
        message: form.message || undefined,
      })
      window.location.href = result.paymentUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize gift card purchase.'
      setError(message)
      setLoading(false)
    }
  }

  const cards = offers.map((offer) => ({
    id: offer.id,
    title: `${currency} ${offer.displayValue.toLocaleString()}`,
    subtitle: offer.name,
    price: `${currency} ${offer.priceToPay.toLocaleString()}`,
    onBuy: () => openCheckoutForOffer(offer),
  }))

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} heightClass="h-[40vh]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Buy eGift Card</h1>
        <p className="mt-2 text-sm text-gray-600">Choose a card and continue to checkout.</p>

        {branches.length > 1 ? (
          <div className="mt-4 max-w-sm">
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={form.branchId}
              onChange={(e) => {
                setOffers([])
                setSelectedOfferId('')
                setForm((prev) => ({ ...prev, branchId: e.target.value }))
              }}
              required
            >
              <option value="">Select branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {cards.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.id} className="overflow-hidden rounded-xl border border-gray-200 bg-[#f4f7ff]">
                <div className="p-5">
                  <p className="text-4xl font-bold">{card.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{card.subtitle}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-5 py-4">
                  <p className="text-sm font-medium">Price: {card.price}</p>
                  <button
                    type="button"
                    onClick={card.onBuy}
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">No gift card offers have been added yet.</div>
        )}

        <div className="mt-6 max-w-md">
          <label className="mb-2 block text-sm font-medium text-gray-700">Or enter custom amount</label>
          <div className="flex gap-2">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Custom amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={(e) => {
                setSelectedOfferId('')
                setSelectedAmount(null)
                setForm((p) => ({ ...p, amount: e.target.value }))
              }}
            />
            <button
              type="button"
              className="rounded-md bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                const amount = Number(form.amount)
                if (!Number.isFinite(amount) || amount <= 0) {
                  setError('Enter a valid custom amount.')
                  return
                }
                setError(null)
                openCheckoutForAmount(amount)
              }}
            >
              Continue
            </button>
          </div>
        </div>

        {showCheckout ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gift Card Checkout</h2>
                <button type="button" onClick={() => setShowCheckout(false)} className="text-sm text-gray-500">
                  Close
                </button>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                You are purchasing: <span className="font-semibold">{currency} {((selectedAmount ?? Number(form.amount)) || 0).toLocaleString()}</span>
              </p>
              <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Your name" value={form.purchaserName} onChange={(e) => setForm((p) => ({ ...p, purchaserName: e.target.value }))} required />
                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Your email" type="email" value={form.purchaserEmail} onChange={(e) => setForm((p) => ({ ...p, purchaserEmail: e.target.value }))} required />
                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Recipient name" value={form.recipientName} onChange={(e) => setForm((p) => ({ ...p, recipientName: e.target.value }))} required />
                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Recipient email" type="email" value={form.recipientEmail} onChange={(e) => setForm((p) => ({ ...p, recipientEmail: e.target.value }))} required />
                <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Optional message" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button disabled={loading} className="w-full rounded-md bg-[#0B1F3A] py-2 text-sm font-semibold text-white">
                  {loading ? 'Redirecting...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
