import type { Task } from "../task/task.schema"

export interface DashboardResponse {
  stats: {
    totalTasks: number
    completedTasks: number
    pendingTasks: number
    overdueTasks: number
    sharedWithMe: number
    sharedByMe: number
  }

  recentTasks: Task[]
  recentSharedTasks: Task[]
}
