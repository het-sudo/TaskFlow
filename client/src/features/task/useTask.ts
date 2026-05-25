import { useCallback, useState } from "react"
import { toast } from "sonner"

import type {
  Task,
  TaskFiltersInput,
  CreateTaskInput,
  UpdateTaskInput,
  TasksResponse,
} from "./task.schema"

import {
  getTasksRequest,
  getTaskByIdRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  getCategoriesRequest,
} from "./task.api"
import type { AxiosError } from "axios"
import type { ApiErrorResponse } from "@/shared/types"

export function useTasksModule() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  const [filters, setFiltersState] = useState<TaskFiltersInput>({
    page: 1,
    limit: 10,
  })

  const [pagination, setPagination] = useState<TasksResponse["pagination"]>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategoriesRequest()
      setCategories(res)
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(
        axiosError.response?.data?.message || "failed to fetch categories"
      )
    }
  }, [])

  const fetchTasks = useCallback(
    async (next?: Partial<TaskFiltersInput>) => {
      setIsLoading(true)

      try {
        const merged = { ...filters, ...next }

        const res: TasksResponse = await getTasksRequest(merged)

        setTasks(res.tasks)
        setPagination(res.pagination)
        setFiltersState(merged)
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>

        toast.error(
          axiosError.response?.data?.message || "failed to fetch task"
        )
      } finally {
        setIsLoading(false)
      }
    },
    [filters]
  )

  const getTaskById = useCallback(async (id: string) => {
    setIsLoading(true)

    try {
      const task = await getTaskByIdRequest(id)
      setSelectedTask(task)
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(axiosError.response?.data?.message || " failed to get task")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ---------------- CREATE ----------------
  const createTask = useCallback(
    async (payload: CreateTaskInput) => {
      setIsSubmitting(true)

      try {
        await createTaskRequest(payload)
        toast.success("Task Created Successfully")
        await Promise.all([fetchTasks(), fetchCategories()])
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>

        toast.error(
          axiosError.response?.data?.message || "failed to create task"
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [fetchTasks]
  )

  const updateTask = useCallback(
    async (id: string, payload: UpdateTaskInput) => {
      setIsSubmitting(true)

      try {
        const updated = await updateTaskRequest(id, payload)

        setSelectedTask(updated)

        toast.success("Task Updated Successfully")

        await fetchTasks()
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>

        toast.error(axiosError.response?.data?.message || "failed to update")
      } finally {
        setIsSubmitting(false)
      }
    },
    [fetchTasks]
  )

  const deleteTask = useCallback(
    async (id: string) => {
      setIsSubmitting(true)

      try {
        await deleteTaskRequest(id)

        toast.success("Task Deleted Successfully")

        await Promise.all([fetchTasks(), fetchCategories()])
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>

        toast.error(axiosError.response?.data?.message || "failed to delete")
      } finally {
        setIsSubmitting(false)
      }
    },
    [fetchTasks]
  )

  const setFilters = useCallback((patch: Partial<TaskFiltersInput>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...patch,
    }))
  }, [])

  return {
    tasks,
    selectedTask,
    categories,
    filters,
    pagination,
    isLoading,
    isSubmitting,
    fetchTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    fetchCategories,
    setFilters,
  }
}
