import { useCallback, useState } from 'react'
import { AppRouter } from './AppRouter'
import { FirstLoadScreen } from './components/site/FirstLoadScreen'

function App() {
  const [showLoader, setShowLoader] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
  }, [])

  return (
    <>
      <AppRouter />
      {showLoader ? <FirstLoadScreen onComplete={handleLoaderComplete} /> : null}
    </>
  )
}

export default App
