import { Bell } from "lucide-react"
import { useState } from "react"

import { useNotification } from "@/features/notification/useNotification"

export default function NotificationBell() {
  const { notifications, unreadCount, toggleRead } = useNotification()

  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:bg-slate-100"
      >
        <Bell className="h-5 w-5 text-slate-700" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="text-xs text-slate-500">{unreadCount} unread</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-sm text-slate-400 transition hover:text-slate-700"
            >
              Close
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                No notifications yet
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`space-y-3 p-4 transition ${
                      notification.isRead ? "bg-white" : "bg-blue-50/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p
                          className={`text-sm ${
                            notification.isRead
                              ? "text-slate-500"
                              : "font-medium text-slate-900"
                          }`}
                        >
                          {notification.message}
                        </p>

                        <p className="text-xs text-slate-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {!notification.isRead && (
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <button
                      onClick={() => toggleRead(notification.id)}
                      className="text-xs font-medium text-violet-600 transition hover:text-violet-700"
                    >
                      {notification.isRead ? "Mark unread" : "Mark read"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
