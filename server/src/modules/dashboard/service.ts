import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function getDashboardStatsService(userId: string) {
  const [
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    sharedWithMe,
    sharedByMe,
    recentTasks,
    recentSharedTasks,
  ] = await Promise.all([
    prisma.task.count({ where: { ownerId: userId, deletedAt: null } }),

    prisma.task.count({
      where: { ownerId: userId, status: "DONE", deletedAt: null },
    }),

    prisma.task.count({
      where: { ownerId: userId, status: "TODO", deletedAt: null },
    }),

    prisma.task.count({
      where: {
        ownerId: userId,
        dueDate: { lt: new Date() },
        status: { not: "DONE" },
        deletedAt: null,
      },
    }),

    prisma.taskShare.count({
      where: { sharedWithId: userId },
    }),

    prisma.taskShare.count({
      where: { sharedById: userId },
    }),

    prisma.task.findMany({
      where: { ownerId: userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.taskShare.findMany({
      where: { sharedWithId: userId },
      include: { task: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  return {
    stats: {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      sharedWithMe,
      sharedByMe,
    },
    recentTasks,
    recentSharedTasks: recentSharedTasks.map((s) => s.task),
  }
}
