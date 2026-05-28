import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import {
  getNotificationsRequest,
  toggleNotificationRequest,
} from "./notification.api"

import type { Notification } from "./notification.schema"
import { getSocket } from "@/libs/socket"

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getNotificationsRequest()

      setNotifications(res.notifications)
      setUnreadCount(res.unreadCount)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const toggleRead = useCallback(async (notificationId: string) => {
    const updated = await toggleNotificationRequest(notificationId)

    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? updated : n))
    )

    setUnreadCount((prev) =>
      updated.isRead ? Math.max(prev - 1, 0) : prev + 1
    )
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    const socket = getSocket()
    console.log(" SOCKET INSTANCE:", socket)
    console.log("SOCKET CONNECTED:", socket?.connected)
    console.log(" SOCKET ID:", socket?.id)
    if (!socket) return

    console.log("SOCKET STATUS:", socket.connected)

    const handleNew = (notification: Notification) => {
      console.log("NOTIFICATION RECEIVED:", notification)

      setNotifications((prev) => [notification, ...prev])
      setUnreadCount((prev) => prev + 1)

      toast.success(notification.message)
    }

    socket.on("notification:new", handleNew)

    return () => {
      socket.off("notification:new", handleNew)
    }
  }, [])

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    toggleRead,
  }
}
