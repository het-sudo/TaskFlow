import { useEffect, useState } from "react"
import { getDashboardRequest } from "./api"
import type { DashboardResponse } from "./schema"

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchDashboard = async () => {
      try {
        setLoading(true)

        const res = await getDashboardRequest()

        if (isMounted) {
          setData(res)
        }
      } catch (err) {
        console.error("Dashboard error:", err)

        if (isMounted) {
          setData(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading }
}
