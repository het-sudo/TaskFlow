import { useEffect, useState } from "react"

import TaskFilters from "../components/TaskFilters"
import TaskList from "../components/TaskList"
import CreateTaskModal from "./CreateTaskModal"
import Pagination from "../components/Pagination"

import { useTasksModule } from "../useTask"

import { Button } from "@/shared/resusable/Button"
import { AppLoader } from "@/shared/AppLoader"

export default function DashboardPage() {
  const tasksModule = useTasksModule()

  const {
    tasks,
    isLoading,
    fetchTasks,
    fetchCategories,
    pagination,
    filters,
    setFilters,
  } = tasksModule

  const [openCreateModal, setOpenCreateModal] = useState(false)

  useEffect(() => {
    fetchTasks(filters)
    fetchCategories()
  }, [])

  function handlePageChange(page: number) {
    const updated = { ...filters, page }
    setFilters({ page })
    fetchTasks(updated)
  }

  function handleLimitChange(limit: number) {
    const updated = { ...filters, limit, page: 1 }
    setFilters(updated)
    fetchTasks(updated)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-sm text-slate-600">Organize and manage work</p>
          </div>

          <Button onClick={() => setOpenCreateModal(true)}>Create Task</Button>
        </div>
        <div
          className="
    sticky top-[72px] z-30
    bg-slate-50/95 py-4 backdrop-blur
   
  "
        >
          <TaskFilters {...tasksModule} />
        </div>
        {isLoading ? (
          <div className="rounded-3xl border p-10 text-center">
            <AppLoader />
          </div>
        ) : (
          <>
            <TaskList tasks={tasks} />

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              limit={pagination.limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </>
        )}
      </div>

      <CreateTaskModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        tasks={tasksModule}
      />
    </>
  )
}
