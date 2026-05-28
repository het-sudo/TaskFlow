import { useEffect } from "react"
import { AppRouter } from "@/routes/AppRouter"
import { useAuth } from "@/features/auth/useAuth"
import { getAccessToken } from "@/shared/token"
import { connectSocket } from "@/libs/socket"

function App() {
  const { initializeAuth } = useAuth()

  useEffect(() => {
    const init = async () => {
      await initializeAuth()

      const token = getAccessToken()

      if (token) {
        connectSocket(token)
      }
    }

    init()
  }, [initializeAuth])

  return <AppRouter />
}

export default App
