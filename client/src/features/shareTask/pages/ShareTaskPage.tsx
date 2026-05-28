import { useEffect } from "react"

import TaskList from "@/features/task/components/TaskList"

import { AppLoader } from "@/shared/AppLoader"

import { useShareTask } from "../useShare"

export default function SharedTasksPage() {
  const { tasks, isLoading, fetchSharedTasks } = useShareTask()

  useEffect(() => {
    fetchSharedTasks()
  }, [fetchSharedTasks])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shared With Me</h1>

        <p className="text-sm text-slate-600">Tasks shared by other users</p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border p-10 text-center">
          <AppLoader />
        </div>
      ) : (
        <>
          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  )
}
