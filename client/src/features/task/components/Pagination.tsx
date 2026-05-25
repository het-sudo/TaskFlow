interface Props {
  page: number
  totalPages: number
  limit: number

  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export default function Pagination({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: Props) {
  if (totalPages <= 1) {
    return null
  }

  function generatePages() {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    pages.push(1)

    if (page > 3) {
      pages.push("...")
    }

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (page < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  return (
    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Rows</span>

        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500"
        >
          {[5, 10, 20, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
        >
          Prev
        </button>

        {generatePages().map((item, index) =>
          item === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-sm text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(Number(item))}
              className={`min-w-[36px] rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === item
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
