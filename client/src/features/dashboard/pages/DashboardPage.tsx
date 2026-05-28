import { useDashboard } from "../useDashboard"
import TaskCard from "@/features/task/components/TaskCard"
import { AppLoader } from "@/shared/AppLoader"
import type { Task } from "@/features/task/task.schema"

export default function DashboardPage() {
  const { data, loading } = useDashboard()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <AppLoader />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-2xl border p-10 text-center text-slate-500">
        Failed to load dashboard
      </div>
    )
  }

  const { stats, recentTasks, recentSharedTasks } = data

  const statsItems: { label: string; value: number }[] = [
    { label: "Total Tasks", value: stats.totalTasks },
    { label: "Completed", value: stats.completedTasks },
    { label: "Pending", value: stats.pendingTasks },
    { label: "Overdue", value: stats.overdueTasks },
    { label: "Shared", value: stats.sharedWithMe },
  ]

  type SharedTask = Task & {
    sharedBy?: string
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of your tasks and activity
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statsItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>

        {recentTasks.length === 0 ? (
          <div className="rounded-2xl border p-6 text-center text-slate-500">
            No recent tasks
          </div>
        ) : (
          <div className="grid gap-4">
            {recentTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Shared With Me</h2>

        {recentSharedTasks.length === 0 ? (
          <div className="rounded-2xl border p-6 text-center text-slate-500">
            No shared tasks
          </div>
        ) : (
          <div className="grid gap-4">
            {(recentSharedTasks as SharedTask[]).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
