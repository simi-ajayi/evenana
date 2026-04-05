import { useEffect, useState } from 'react'
import { getPageContent } from '../services/pageContentService'

export function usePageContent(pageKey) {
  const [state, setState] = useState({
    content: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let ignore = false

    async function loadContent() {
      setState({
        content: null,
        isLoading: true,
        error: null,
      })

      try {
        const content = await getPageContent(pageKey)

        if (!ignore) {
          setState({
            content,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        if (!ignore) {
          setState({
            content: null,
            isLoading: false,
            error,
          })
        }
      }
    }

    loadContent()

    return () => {
      ignore = true
    }
  }, [pageKey])

  return state
}
