import prisma from "../../lib/prisma.js"

export async function getNotificationsService(userId: string) {
  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        task: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    }),

    prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    }),
  ])

  return {
    notifications,
    unreadCount,
  }
}

export async function markNotificationReadService(
  userId: string,
  notificationId: string
) {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId,
    },
  })

  if (!notification) {
    return null
  }

  return prisma.notification.update({
    where: {
      id: notificationId,
    },

    data: {
      isRead: !notification.isRead,
    },
  })
}
