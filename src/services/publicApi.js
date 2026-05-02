import { apiConfig } from '../config/apiConfig'

function getErrorMessage(body, fallbackMessage) {
  if (typeof body === 'string') return body
  if (!body || typeof body !== 'object') return fallbackMessage

  if (typeof body.message === 'string' && body.message.trim()) {
    return body.message
  }

  if (typeof body.error === 'string' && body.error.trim()) {
    return body.error
  }

  if (Array.isArray(body.errors) && body.errors.length > 0) {
    return body.errors
      .map((item) => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object' && typeof item.message === 'string') {
          if (typeof item.path === 'string') return `${item.path}: ${item.message}`
          if (Array.isArray(item.path) && item.path.length > 0) return `${item.path.join('.')}: ${item.message}`
          if (typeof item.field === 'string') return `${item.field}: ${item.message}`
          return item.message
        }
        return String(item)
      })
      .join(', ')
  }

  return fallbackMessage
}

async function request(path, init) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${apiConfig.apiBaseUrl}${normalizedPath}`
  let response

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("We couldn't reach the server. Please try again.")
    }
    throw error
  }

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    throw new Error(getErrorMessage(body, `Request failed with status ${response.status}`))
  }

  if (body && typeof body === 'object' && 'success' in body) {
    if (!body.success) {
      throw new Error(getErrorMessage(body, 'Request failed'))
    }
    return body.data
  }

  return body
}

export async function getBranches() {
  const result = await request('/public/branches')
  return Array.isArray(result) ? result : []
}

export async function getPublicServices(branchId, branchSlug) {
  if (!branchId && !branchSlug) {
    throw new Error('A branch is required to load services.')
  }

  const query = new URLSearchParams()
  if (branchId) query.set('branchId', branchId)
  if (branchSlug) query.set('branchSlug', branchSlug)
  return request(`/public/services?${query.toString()}`)
}

export async function getPublicStaff(branchId, branchSlug) {
  const query = new URLSearchParams()
  if (branchId) query.set('branchId', branchId)
  if (branchSlug) query.set('branchSlug', branchSlug)
  const q = query.toString()
  return request(q ? `/public/staff?${q}` : '/public/staff')
}

export async function getBookingForm(params) {
  const query = new URLSearchParams({ branchId: params.branchId })
  if (params.serviceId) query.set('serviceId', params.serviceId)
  if (params.schedulingPageSlug) query.set('schedulingPageSlug', params.schedulingPageSlug)
  const result = await request(`/public/booking-form?${query.toString()}`)
  return result ?? null
}

export async function getSchedulingPageBySlug(branchId, slug) {
  const query = new URLSearchParams({ branchId, slug })
  const result = await request(`/public/scheduling-pages/by-slug?${query.toString()}`)
  return result ?? null
}

export async function getAvailabilitySlots(params) {
  const query = new URLSearchParams({
    serviceId: params.serviceId,
    startDate: params.startDate,
    endDate: params.endDate,
  })
  if (params.staffId) query.set('staffId', params.staffId)
  if (params.branchId) query.set('branchId', params.branchId)
  if (params.branchSlug) query.set('branchSlug', params.branchSlug)

  return request(`/public/availability-slots?${query.toString()}`)
}

export async function createPublicBooking(input) {
  return request('/public/booking', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function initializeBookingPayment(appointmentId, customerEmail) {
  return request('/public/booking/initialize-payment', {
    method: 'POST',
    body: JSON.stringify({ appointmentId, customerEmail }),
  })
}

export async function getPublicProducts(category) {
  const path = category ? `/public/products?category=${encodeURIComponent(category)}` : '/public/products'
  const result = await request(path)
  return Array.isArray(result) ? result : []
}

export async function checkout(input) {
  return request('/public/checkout', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function getPublicGiftCardOffers(branchId) {
  if (!branchId) return []
  const query = new URLSearchParams({ branchId })
  const result = await request(`/public/gift-cards/offers?${query.toString()}`)
  return Array.isArray(result) ? result : []
}

export async function purchaseGiftCard(input) {
  return request('/public/gift-cards/purchase', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function verifyPublicPayment(reference) {
  return request('/public/verify-payment', {
    method: 'POST',
    body: JSON.stringify({ reference }),
  })
}
