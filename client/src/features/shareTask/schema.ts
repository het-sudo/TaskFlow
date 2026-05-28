import type { Task } from "../task/task.schema"

export interface SharedTask {
  id: string
  createdAt: string

  task: Task & {
    owner: {
      id: string
      name: string
      email: string
    }
  }
}
