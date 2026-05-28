import { api } from "@/shared/axios"
import { request } from "@/shared/apiClient"
import type { SharedTask } from "./schema"

export async function shareTaskRequest(taskId: string, email: string) {
  return request(
    api.post(`/tasks/${taskId}/share`, {
      email,
    })
  )
}

export async function getSharedTasksRequest() {
  return request<SharedTask[]>(api.get("/tasks/shared-with-me"))
}
