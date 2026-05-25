import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  TASK_PRIORITY,
  TASK_STATUS,
  updateTaskSchema,
  type UpdateTaskInput,
} from "../task.schema"

import { Input } from "@/shared/resusable/Input"
import { Textarea } from "@/shared/resusable/Textarea"
import { Select } from "@/shared/resusable/Select"
import { Button } from "@/shared/resusable/Button"

import { FileText, Tag, Calendar, Trash2, Save } from "lucide-react"

import { useTasksModule } from "../useTask"

interface Props {
  taskId: string
  tasks: ReturnType<typeof useTasksModule>
}

export default function EditTaskForm({ taskId, tasks }: Props) {
  const { selectedTask, updateTask, deleteTask } = tasks

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
  })

  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title ?? "",
        description: selectedTask.description ?? "",
        category: selectedTask.category ?? "",
        priority: selectedTask.priority ?? "",
        status: selectedTask.status ?? "",
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.split("T")[0] : "",
      })
    }
  }, [selectedTask, reset])

  async function onSubmit(values: UpdateTaskInput) {
    await updateTask(taskId, {
      ...values,
      dueDate: values.dueDate
        ? new Date(values.dueDate).toISOString()
        : undefined,
    })

    window.history.back()
  }

  async function handleDelete() {
    const confirmed = window.confirm("Delete this task?")
    if (!confirmed) return

    await deleteTask(taskId)
    window.history.back()
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText className="h-4 w-4 text-slate-500" />
            Title
          </label>

          <Input
            type="text"
            error={errors.title?.message}
            {...register("title")}
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText className="h-4 w-4 text-slate-500" />
            Description
          </label>

          <Textarea
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Tag className="h-4 w-4 text-slate-500" />
              Category
            </label>

            <Input
              type="text"
              error={errors.category?.message}
              {...register("category")}
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="h-4 w-4 text-slate-500" />
              Due Date
            </label>

            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              error={errors.dueDate?.message}
              {...register("dueDate")}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Priority"
            options={TASK_PRIORITY.map((p) => ({
              label: p,
              value: p,
            }))}
            {...register("priority")}
          />

          <Select
            label="Status"
            options={TASK_STATUS.map((s) => ({
              label: s.replace("_", " "),
              value: s,
            }))}
            {...register("status")}
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="danger" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Task
          </Button>

          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            <Save className="mr-2 h-4 w-4" />
            {isDirty ? "Save Changes" : "No Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
