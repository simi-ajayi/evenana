const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://api.evenana.local'
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
