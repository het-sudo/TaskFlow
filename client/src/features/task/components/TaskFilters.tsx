import { useEffect, useState } from "react"

import {
  TASK_PRIORITY,
  TASK_STATUS,
  type TaskFiltersInput,
  type TaskPriority,
  type TaskStatus,
} from "../task.schema"

import { useDebounce } from "@/shared/hooks/useDebounce"
import { Input } from "@/shared/resusable/Input"
import { Select } from "@/shared/resusable/Select"
import { Search } from "lucide-react"

interface Props {
  filters: TaskFiltersInput
  setFilters: (patch: Partial<TaskFiltersInput>) => void
  categories: string[]
  fetchTasks: (filters?: Partial<TaskFiltersInput>) => Promise<void>
}

const statusSet = new Set<TaskStatus>(TASK_STATUS)
const prioritySet = new Set<TaskPriority>(TASK_PRIORITY)

function isStatus(value: string): value is TaskStatus {
  return statusSet.has(value as TaskStatus)
}

function isPriority(value: string): value is TaskPriority {
  return prioritySet.has(value as TaskPriority)
}

export default function TaskFilters({
  filters,
  setFilters,
  categories,
  fetchTasks,
}: Props) {
  const [search, setSearch] = useState<string>(filters.search || "")

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    const updated: TaskFiltersInput = {
      ...filters,
      search: debouncedSearch || undefined,
      page: 1,
    }

    setFilters({
      search: debouncedSearch || undefined,
      page: 1,
    })

    fetchTasks(updated)
  }, [debouncedSearch])

  function handleFilterChange(key: keyof TaskFiltersInput, value: string) {
    let normalized: TaskFiltersInput[typeof key] | undefined

    if (key === "status") {
      normalized = isStatus(value) ? value : undefined
    } else if (key === "priority") {
      normalized = isPriority(value) ? value : undefined
    } else {
      normalized = value.trim() ? value : undefined
    }

    const updated: TaskFiltersInput = {
      ...filters,
      [key]: normalized,
      page: 1,
    }

    setFilters({
      [key]: normalized,
      page: 1,
    })

    fetchTasks(updated)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border-0 bg-white p-4">
      <div className="min-w-[220px] flex-1">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          leftIcon={<Search />}
        />
      </div>

      <Select
        value={filters.status ?? ""}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        options={[
          { label: "All Status", value: "" },
          ...TASK_STATUS.map((s) => ({
            label: s.replace("_", " "),
            value: s,
          })),
        ]}
      />

      <Select
        value={filters.priority ?? ""}
        onChange={(e) => handleFilterChange("priority", e.target.value)}
        options={[
          { label: "All Priority", value: "" },
          ...TASK_PRIORITY.map((p) => ({
            label: p,
            value: p,
          })),
        ]}
      />

      <Select
        value={filters.category || ""}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        options={[
          { label: "All Categories", value: "" },
          ...categories.map((c) => ({
            label: c,
            value: c,
          })),
        ]}
      />
    </div>
  )
}
