import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import spa03 from '../assets/spa/spa-03.jpg'
import { PageHero } from '../components/site/PageHero'
import { useCart } from '../context/CartContext'
import { checkout } from '../services/publicApi'

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('DELIVERY')
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingCity, setShippingCity] = useState('')
  const [shippingState, setShippingState] = useState('')
  const [shippingZipCode, setShippingZipCode] = useState('')
  const [shippingCountry, setShippingCountry] = useState('Nigeria')
  const [error, setError] = useState(null)
  const [giftCardCode, setGiftCardCode] = useState('')

  const hero = {
    label: 'Checkout',
    title: 'Cart And Checkout',
    description: 'Review your order details and complete secure payment in minutes.',
    image: spa03,
    primaryCta: {
      to: '/products',
      label: 'Continue Shopping',
    },
    secondaryCta: {
      to: '/bookings',
      label: 'Book Consultation',
    },
  }

  const deliveryFee = deliveryMethod === 'DELIVERY' ? 3000 : 0
  const vatAmount = useMemo(
    () => Math.round((total + deliveryFee) * 0.075),
    [total, deliveryFee],
  )
  const grandTotal = useMemo(
    () => Math.round((total + deliveryFee) * 1.075),
    [total, deliveryFee],
  )

  const inputClass =
    'w-full rounded-xl border border-[#d9cee6] bg-white px-4 py-2.5 text-sm text-[#241a2f] shadow-sm outline-none transition duration-200 focus:border-[#5c3f73] focus:ring-4 focus:ring-[#9a80b0]/20'

  const handleCheckout = async () => {
    if (items.length === 0) return

    if (!showCustomerForm) {
      setShowCustomerForm(true)
      return
    }

    if (!customerName.trim()) {
      setError('Name is required')
      return
    }

    if (!customerEmail.trim()) {
      setError('Email is required for payment')
      return
    }

    if (!customerPhone.trim()) {
      setError('Phone number is required')
      return
    }

    if (deliveryMethod === 'DELIVERY') {
      if (!shippingAddress.trim()) {
        setError('Street address is required for delivery orders')
        return
      }
      if (!shippingCity.trim()) {
        setError('City is required for delivery orders')
        return
      }
      if (!shippingState.trim()) {
        setError('State is required for delivery orders')
        return
      }
      if (!shippingZipCode.trim()) {
        setError('Zip code is required for delivery orders')
        return
      }
      if (!shippingCountry.trim()) {
        setError('Country is required for delivery orders')
        return
      }
    }

    setError(null)
    setCheckingOut(true)

    try {
      const paymentItems = items.map((item) => ({
        itemType: 'INVENTORY',
        itemId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      }))

      const subtotal = paymentItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

      const result = await checkout({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        amount: subtotal,
        deliveryMethod,
        shippingAddress: deliveryMethod === 'DELIVERY' ? shippingAddress.trim() : undefined,
        shippingCity: deliveryMethod === 'DELIVERY' ? shippingCity.trim() : undefined,
        shippingState: deliveryMethod === 'DELIVERY' ? shippingState.trim() : undefined,
        shippingZipCode: deliveryMethod === 'DELIVERY' ? shippingZipCode.trim() : undefined,
        shippingCountry: deliveryMethod === 'DELIVERY' ? shippingCountry.trim() : undefined,
        giftCardCode: giftCardCode.trim() || undefined,
        items: paymentItems,
      })

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl
      } else {
        throw new Error('No payment URL received')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.')
      setCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[radial-gradient(120%_120%_at_10%_0%,#f4edf9_0%,#faf7fd_45%,#ffffff_100%)] text-[#1f1827]">
        <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
          <PageHero hero={hero} heightClass="h-[44vh]"/>
        </div>

        <main className="relative  w-full max-w-4xl px-4 pb-14">


          <section className="relative rounded-3xl border border-[#dacdea] bg-white/95 p-10 text-center shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)] backdrop-blur">
            <h1 className="text-3xl font-semibold tracking-tight text-[#241a2f]">Your cart is empty</h1>
            <p className="mt-3 text-sm text-[#6f5e7f]">
              Add products to your cart to continue with checkout.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/products"
                className="rounded-full bg-[#5c3f73] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4b335f]"
              >
                Browse Products
              </Link>
              <Link
                to="/bookings"
                className="rounded-full border border-[#ccb8df] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f4f70] transition hover:bg-[#f1e6f9]"
              >
                Book Appointment
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(120%_120%_at_10%_0%,#f4edf9_0%,#faf7fd_45%,#ffffff_100%)] text-[#1f1827]">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} heightClass="h-[44vh]"   />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-14">
   

        <section className="relative rounded-3xl mt-4 border border-[#dacdea] bg-white/95 p-6 shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)] backdrop-blur md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e4d87]/90">Checkout</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#241a2f] md:text-4xl">Cart and payment</h1>
              <p className="mt-2 text-sm text-[#5f4f70]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart.
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="rounded-full border border-[#ccb8df] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f5e7f] transition hover:bg-[#f1e6f9]"
            >
              Clear Cart
            </button>
          </div>
        </section>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-[#e3d7ef] bg-white p-4 shadow-[0_14px_30px_-24px_rgba(37,20,53,0.35)]"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#241a2f]">{item.name}</h3>
                    {item.category && (
                      <p className="mt-1 inline-flex rounded-full border border-[#e2d4ef] bg-[#faf7fd] px-2.5 py-1 text-[11px] font-medium text-[#6f5e7f]">
                        {item.category}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-medium text-[#5c3f73]">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-[#d9cee6] bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-lg text-base text-[#6f5e7f] transition hover:bg-[#f3ebf9] hover:text-[#4b335f]"
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-sm font-semibold text-[#241a2f]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-lg text-base text-[#6f5e7f] transition hover:bg-[#f3ebf9] hover:text-[#4b335f]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#8e78a2] transition hover:bg-rose-50 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#241a2f]">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit space-y-5 rounded-3xl border border-[#dacdea] bg-white/95 p-6 shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)] backdrop-blur lg:sticky lg:top-6">
            <div>
              <h2 className="text-lg font-semibold text-[#241a2f]">Order Summary</h2>
              <p className="mt-1 text-xs text-[#7b6b8b]">Transparent pricing and secure checkout.</p>
            </div>

            <div className="space-y-3 border-t border-[#e3d7ef] pt-4 text-sm">
              <div className="flex justify-between text-[#5f4f70]">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              {deliveryMethod === 'DELIVERY' && (
                <div className="flex justify-between text-[#5f4f70]">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5f4f70]">
                <span>VAT (7.5%)</span>
                <span>₦{vatAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-[#e3d7ef] pt-3">
                <div className="flex justify-between text-base font-semibold text-[#241a2f]">
                  <span>Total</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {showCustomerForm && (
              <div className="space-y-4 border-t border-[#e3d7ef] pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6e4d87]/90">Customer Information</h3>

                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    Full Name <span className="text-rose-500">*</span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={inputClass}
                      placeholder="Full name"
                      required
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    Email <span className="text-rose-500">*</span>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className={inputClass}
                      placeholder="Email address"
                      required
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    Phone Number <span className="text-rose-500">*</span>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={inputClass}
                      placeholder="Phone number"
                      required
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    Gift Card Code
                    <input
                      type="text"
                      value={giftCardCode}
                      onChange={(e) => setGiftCardCode(e.target.value)}
                      className={inputClass}
                      placeholder="Enter 16-digit gift card code"
                    />
                  </label>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    Delivery Method <span className="text-rose-500">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('DELIVERY')}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition ${
                        deliveryMethod === 'DELIVERY'
                          ? 'border-[#5c3f73] bg-[#f1e8f8] text-[#5c3f73]'
                          : 'border-[#d9cee6] bg-white text-[#6f5e7f] hover:border-[#cdb9de]'
                      }`}
                    >
                      Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('PICKUP')}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition ${
                        deliveryMethod === 'PICKUP'
                          ? 'border-[#5c3f73] bg-[#f1e8f8] text-[#5c3f73]'
                          : 'border-[#d9cee6] bg-white text-[#6f5e7f] hover:border-[#cdb9de]'
                      }`}
                    >
                      Pickup
                    </button>
                  </div>
                </div>

                {deliveryMethod === 'DELIVERY' && (
                  <div className="space-y-3 rounded-2xl border border-[#e3d7ef] bg-[#faf7fd] p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6e4d87]/90">Delivery Address</p>

                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                      Street Address <span className="text-rose-500">*</span>
                      <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className={inputClass}
                        placeholder="Full address"
                        rows={2}
                        required
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                        City <span className="text-rose-500">*</span>
                        <input
                          type="text"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          className={inputClass}
                          placeholder="City"
                          required
                        />
                      </label>

                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                        State <span className="text-rose-500">*</span>
                        <input
                          type="text"
                          value={shippingState}
                          onChange={(e) => setShippingState(e.target.value)}
                          className={inputClass}
                          placeholder="State"
                          required
                        />
                      </label>

                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                        Zip Code <span className="text-rose-500">*</span>
                        <input
                          type="text"
                          value={shippingZipCode}
                          onChange={(e) => setShippingZipCode(e.target.value)}
                          className={inputClass}
                          placeholder="Zip code"
                          required
                        />
                      </label>

                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                        Country <span className="text-rose-500">*</span>
                        <input
                          type="text"
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className={inputClass}
                          placeholder="Country"
                          required
                        />
                      </label>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'PICKUP' && (
                  <div className="rounded-2xl border border-[#e3d7ef] bg-[#faf7fd] p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6e4d87]/90">Pickup Details</p>
                    <p className="mt-1 text-xs text-[#6f5e7f]">
                      You will receive a notification when your order is ready for pickup at our location.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!showCustomerForm && error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full rounded-xl bg-[#5c3f73] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#4b335f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkingOut ? 'Processing...' : showCustomerForm ? 'Proceed to Payment' : 'Proceed to Checkout'}
            </button>

            {showCustomerForm && (
              <button
                type="button"
                onClick={() => {
                  setShowCustomerForm(false)
                  setError(null)
                }}
                className="w-full rounded-xl border border-[#d9cee6] bg-white px-4 py-2.5 text-sm font-semibold text-[#6f5e7f] transition hover:bg-[#faf7fd]"
              >
                Cancel
              </button>
            )}

            <p className="text-xs text-[#7b6b8b]">
              Secure payment powered by Paystack. Your payment information is encrypted and protected.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
