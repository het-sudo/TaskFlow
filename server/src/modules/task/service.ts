import { Prisma, PrismaClient } from "@prisma/client"
import {
  CreateTaskInput,
  TaskFiltersInput,
  UpdateTaskInput,
  shareTaskInput,
} from "./validator.js"
import ApiError from "../../utils/apiError.js"
import { StatusCodes } from "http-status-codes"
import { emitNotification } from "../../socket/event.js"

const prisma = new PrismaClient()

export async function createTaskService(
  ownerId: string,
  data: CreateTaskInput
) {
  return prisma.task.create({
    data: {
      ...data,
      ownerId,
    },
  })
}

export async function getTasksService(
  ownerId: string,
  filters: TaskFiltersInput
) {
  const { status, priority, category, search, page, limit } = filters

  const where: Prisma.TaskWhereInput = {
    ownerId,
    deletedAt: null,
  }

  if (status) {
    where.status = status
  }
  if (priority) {
    where.priority = priority
  }

  if (category) {
    where.category = {
      equals: category,
      mode: "insensitive",
    }
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ]
  }

  const skip = (page - 1) * limit

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip,

      take: limit,
    }),

    prisma.task.count({
      where,
    }),
  ])
  const now = new Date()

  const tasksWithOverdue = tasks.map((task) => ({
    ...task,
    isOverdue:
      task.status !== "DONE" && !!task.dueDate && new Date(task.dueDate) < now,
  }))

  return {
    tasks: tasksWithOverdue,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export async function getTaskByIdService(ownerId: string, taskId: string) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
  })
}

export async function updateTaskService(
  ownerId: string,
  taskId: string,
  data: UpdateTaskInput
) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
      deletedAt: null,
    },
  })

  if (!task) {
    return null
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },

    data,
  })
}
export async function deleteTaskService(ownerId: string, taskId: string) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
      deletedAt: null,
    },
  })

  if (!task) {
    return null
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      deletedAt: new Date(),
    },
  })
}

export async function getCategories(ownerId: string) {
  const categories = await prisma.task.findMany({
    where: {
      ownerId,
      deletedAt: null,
    },
    select: {
      category: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  })
  return categories.map((item) => item.category)
}

export async function shareTaskService(
  ownerId: string,
  taskId: string,
  email: string
) {
  const result = await prisma.$transaction(async (tx) => {
    const task = await tx.task.findFirst({
      where: {
        id: taskId,
        ownerId,
        deletedAt: null,
      },
      include: {
        owner: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    if (!task) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Task not found")
    }

    const sharedWith = await tx.user.findUnique({
      where: { email },
    })

    if (!sharedWith) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    }

    if (sharedWith.id === ownerId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "You cannot share task with yourself"
      )
    }

    const existingShare = await tx.taskShare.findUnique({
      where: {
        taskId_sharedWithId: {
          taskId,
          sharedWithId: sharedWith.id,
        },
      },
    })

    if (existingShare) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Task already shared with this user"
      )
    }

    await tx.taskShare.create({
      data: {
        taskId,
        sharedWithId: sharedWith.id,
        sharedById: ownerId,
      },
    })

    const notification = await tx.notification.create({
      data: {
        userId: sharedWith.id,
        taskId,
        type: "TASK_SHARED",
        message: `Task "${task.title}" was shared with you by ${task.owner.email}`,
      },
    })

    return {
      sharedWithId: sharedWith.id,
      notification,
    }
  })

  emitNotification(result.sharedWithId, result.notification)

  return result
}

export async function getSharedTasksService(userId: string) {
  const sharedTasks = await prisma.taskShare.findMany({
    where: {
      sharedWithId: userId,
      task: {
        deletedAt: null,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      task: {
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  })

  return sharedTasks
}
