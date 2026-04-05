import { apiConfig, apiEndpoints } from '../config/apiConfig'
import { pageContent } from '../data/site/pageContent'

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Content request failed with status ${response.status}.`)
  }

  return response.json()
}

export async function getPageContent(pageKey) {
  if (apiConfig.useMockContent) {
    return pageContent[pageKey] ?? null
  }

  const endpoint = apiEndpoints[pageKey]

  if (!endpoint) {
    return null
  }

  return fetchJson(endpoint)
}
