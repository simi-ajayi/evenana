import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export function BookSlugRedirectPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) return

    const branchId = searchParams.get('branchId')
    const query = new URLSearchParams()
    query.set('schedulingPage', slug)
    if (branchId) query.set('branchId', branchId)
    navigate(`/appointments?${query.toString()}`, { replace: true })
  }, [slug, searchParams, navigate])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4">
      <p className="text-sm text-gray-500">Redirecting to booking…</p>
    </div>
  )
}
