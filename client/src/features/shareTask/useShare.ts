import { useCallback, useState } from "react"

import type { AxiosError } from "axios"

import { toast } from "sonner"

import type { ApiErrorResponse } from "@/shared/types"

import type { Task } from "../task/task.schema"
import { getSharedTasksRequest, shareTaskRequest } from "./api"

export function useShareTask() {
  const [tasks, setTasks] = useState<
    (Task & {
      sharedBy?: string
    })[]
  >([])

  const [isLoading, setIsLoading] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchSharedTasks = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await getSharedTasksRequest()

      const normalized = response.map((item) => ({
        ...item.task,
        sharedBy: item.task.owner.email,
      }))

      setTasks(normalized)
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(
        axiosError.response?.data?.message || "Failed to fetch shared tasks"
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const shareTask = useCallback(async (taskId: string, email: string) => {
    setIsSubmitting(true)

    try {
      await shareTaskRequest(taskId, email)

      toast.success("Task shared successfully")
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(axiosError.response?.data?.message || "Failed to share task")
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
    tasks,
    isLoading,
    isSubmitting,
    fetchSharedTasks,
    shareTask,
  }
}
