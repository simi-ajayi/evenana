import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import spa11 from '../assets/spa/spa-11.jpg'
import { PageHero } from '../components/site/PageHero'
import { useCart } from '../context/CartContext'
import { useHomePageMotion } from '../hooks/useHomePageMotion'
import { verifyPublicPayment } from '../services/publicApi'

export function PaymentCallbackPage() {
  const pageRef = useRef(null)
  useHomePageMotion(pageRef, { imageMotionBlockers: null })

  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()

  const reference = useMemo(
    () => searchParams.get('reference') || searchParams.get('trxref') || '',
    [searchParams],
  )
  const hasReference = Boolean(reference)

  const [status, setStatus] = useState(hasReference ? 'loading' : 'failed')
  const [message, setMessage] = useState(hasReference ? 'Verifying payment...' : 'Missing payment reference.')

  useEffect(() => {
    if (!reference) return

    let cancelled = false
    ;(async () => {
      try {
        await verifyPublicPayment(reference)
        if (cancelled) return
        clearCart()
        setStatus('success')
        setMessage('Payment confirmed. Your order is complete.')
      } catch (nextError) {
        if (cancelled) return
        setStatus('failed')
        setMessage(nextError instanceof Error ? nextError.message : 'Payment verification failed.')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [reference, clearCart])

  const hero = {
    label: 'Payment',
    title: status === 'success' ? 'Payment Successful' : 'Payment Status',
    description: message,
    image: spa11,
    primaryCta: {
      to: '/products',
      label: 'Continue Shopping',
    },
    secondaryCta: {
      to: '/cart',
      label: 'Back To Cart',
    },
  }

  return (
    <div ref={pageRef} className="min-h-screen space-y-8 pb-10 text-[#171b16] md:space-y-10 md:pb-14">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} />
      </div>

      <section data-ani-section className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <div className="rounded-[1.6rem] bg-[#f5eefb] p-5 shadow-[0_24px_50px_-38px_rgba(22,28,20,0.62)] sm:p-6">
          <div className="rounded-xl border border-[#e2d5f0] bg-[#fffcff] p-4 text-[0.86rem] text-[#312836]">
            {status === 'loading' ? (
              <p>Please wait while we confirm your payment.</p>
            ) : null}

            {status === 'success' ? (
              <div className="space-y-3">
                <p>Payment confirmed. We have sent your receipt and order details.</p>
                <Link
                  to="/products"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-[#6e4d87] px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#f3e9fb] transition hover:bg-[#4f365f]"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : null}

            {status === 'failed' ? (
              <div className="space-y-3">
                <p>We could not verify this payment automatically. Contact support if your card was charged.</p>
                <Link
                  to="/cart"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-[#ccb8df] px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#5e574c] transition hover:bg-[#f1e6f9]"
                >
                  Return To Cart
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
