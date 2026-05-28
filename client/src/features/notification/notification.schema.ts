export const NOTIFICATION_TYPES = ["TASK_SHARED"] as const

export type NotificationType = (typeof NOTIFICATION_TYPES)[number]

export interface NotificationSender {
  id: string
  name: string
  email: string
}

export interface NotificationTask {
  id: string
  title: string
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
  sender?: NotificationSender
  task?: NotificationTask
}
