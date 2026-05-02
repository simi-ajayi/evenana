const fallbackApiBaseUrl = 'http://62.169.22.53:4000/api/v1/'
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? fallbackApiBaseUrl
const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '')
const useMockContent = import.meta.env.VITE_USE_MOCK_CONTENT !== 'false'

export const apiConfig = {
  apiBaseUrl,
  useMockContent,
}

export const apiEndpoints = {
  home: `${apiBaseUrl}/content/home`,
  treatments: `${apiBaseUrl}/content/treatments`,
  daySpa: `${apiBaseUrl}/content/day-spa`,
  wellbeingSpaces: `${apiBaseUrl}/content/wellbeing-spaces`,
  membership: `${apiBaseUrl}/content/membership`,
  gifting: `${apiBaseUrl}/content/gifting`,
}
