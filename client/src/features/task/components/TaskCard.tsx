import { CalendarDays, Mail } from "lucide-react"

import { Link } from "react-router-dom"

import type { Task } from "../task.schema"

interface Props {
  task: Task & {
    sharedBy?: string
    isOverdue?: boolean
  }
}

const statusStyles = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  DONE: "bg-emerald-100 text-emerald-700",
}

const priorityStyles = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-rose-100 text-rose-700",
}

export default function TaskCard({ task }: Props) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className={`group block rounded-3xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        task.isOverdue
          ? "border-red-200"
          : "border-slate-200 hover:border-violet-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <h3 className="truncate text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-violet-600">
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {task.category && (
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                {task.category}
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusStyles[task.status]
              }`}
            >
              {task.status.replace("_", " ")}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                priorityStyles[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        {task.isOverdue && (
          <span className="flex shrink-0 items-center gap-2 rounded-2xl border-slate-200 bg-red-100 px-3 py-2 text-xs font-medium text-red-700">
            OVERDUE
          </span>
        )}
        {task.dueDate && (
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
            <CalendarDays className="h-4 w-4" />

            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}

        {task.sharedBy && (
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
            <Mail className="h-4 w-4" />
            <p className="text-xs text-slate-400">Shared by {task.sharedBy}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
