import { ROUTES } from "@/shared/constants"
import { Link } from "react-router-dom"

export default function TaskManagementLanding() {
  const stats = [
    {
      title: "Tasks Completed",
      value: "18,240",
      growth: "+12.8%",
    },
    {
      title: "Active Projects",
      value: "124",
      growth: "+8.4%",
    },
    {
      title: "Team Productivity",
      value: "92%",
      growth: "+5.1%",
    },
    {
      title: "Pending Tasks",
      value: "248",
      growth: "-3.2%",
    },
  ]

  const tasks = [
    {
      title: "Dashboard UI Design",
      status: "In Progress",
      color: "bg-amber-400",
    },
    {
      title: "API Integration",
      status: "Completed",
      color: "bg-emerald-400",
    },
    {
      title: "Client Meeting",
      status: "Scheduled",
      color: "bg-blue-400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500 text-lg font-bold text-white">
              T
            </div>

            <div>
              <h1 className="text-lg font-semibold">TaskFlow</h1>
              <p className="text-xs text-gray-500">Smart Task Management</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <a href="#features" className="transition hover:text-black">
              Features
            </a>

            <a href="#dashboard" className="transition hover:text-black">
              Dashboard
            </a>

            <a href="#pricing" className="transition hover:text-black">
              Pricing
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.LOGIN}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </Link>

            <button
              className="
                rounded-xl bg-red-400 px-4 py-3 font-medium text-white
                transition-all duration-200
                hover:scale-[1.01] hover:bg-red-500
              "
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-24 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500">
            ✨ Modern Workspace Platform
          </div>

          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Manage projects
            <span className="block text-red-500">with clarity & speed</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Organize tasks, collaborate with teams, track productivity, and
            streamline workflows using a clean modern task management platform.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="
                rounded-xl bg-red-400 px-6 py-3 font-medium text-white
                transition-all duration-200
                hover:scale-[1.01] hover:bg-red-500
              "
            >
              Create Workspace
            </button>

            <Link
              to={ROUTES.LOGIN}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Open Login
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <span className="text-sm text-gray-500">Active Teams</span>
            </div>

            <div>
              <p className="text-3xl font-bold">1M+</p>
              <span className="text-sm text-gray-500">Tasks Managed</span>
            </div>

            <div>
              <p className="text-3xl font-bold">99.9%</p>
              <span className="text-sm text-gray-500">Uptime</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          id="dashboard"
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          {/* Top */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold">Team Dashboard</h3>

              <p className="text-sm text-gray-500">Productivity Overview</p>
            </div>

            <button
              className="
                rounded-xl bg-red-400 px-4 py-2 text-sm font-medium text-white
                transition-all duration-200
                hover:scale-[1.01] hover:bg-red-500
              "
            >
              + New Task
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-[#fafafa] p-5"
                >
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <div className="mt-3 flex items-end justify-between">
                    <h4 className="text-2xl font-bold">{item.value}</h4>

                    <span className="text-sm font-medium text-emerald-500">
                      {item.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasks */}
            <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Today's Tasks</h4>

                  <p className="text-sm text-gray-500">
                    Task progress & updates
                  </p>
                </div>

                <button className="text-sm font-medium text-red-500 hover:text-red-600">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${task.color}`} />

                      <div>
                        <p className="font-medium">{task.title}</p>

                        <p className="text-sm text-gray-500">{task.status}</p>
                      </div>
                    </div>

                    <button className="text-sm font-medium text-gray-500 transition hover:text-black">
                      Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Graph */}
            <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Weekly Productivity</h4>

                  <p className="text-sm text-gray-500">
                    Tasks completed this week
                  </p>
                </div>

                <span className="text-sm font-medium text-red-500">Live</span>
              </div>

              <div className="flex h-48 items-end gap-3">
                {[35, 55, 45, 80, 90, 110, 95].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className="rounded-t-xl bg-red-400"
                      style={{ height: `${h}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold tracking-widest text-red-500">
            FEATURES
          </p>

          <h3 className="mt-4 text-4xl font-bold">
            Everything your team needs
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Simplify project management and improve collaboration with modern
            tools built for productive teams.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Task Tracking",
              desc: "Track deadlines, priorities, and progress in real-time.",
            },
            {
              title: "Team Collaboration",
              desc: "Assign tasks and communicate efficiently with your team.",
            },
            {
              title: "Analytics & Reports",
              desc: "Measure productivity using clean visual dashboards.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 h-14 w-14 rounded-2xl bg-red-100" />

              <h4 className="text-xl font-semibold">{feature.title}</h4>

              <p className="mt-4 leading-relaxed text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[32px] bg-red-50 p-10 md:flex-row md:p-14">
          <div>
            <h3 className="text-4xl font-bold">Ready to boost productivity?</h3>

            <p className="mt-4 max-w-xl text-gray-600">
              Start managing tasks, teams, and workflows with a clean modern
              experience built for high-performing teams.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to={ROUTES.LOGIN}
              className="
                rounded-xl bg-red-400 px-6 py-3 font-medium text-white
                transition-all duration-200
                hover:scale-[1.01] hover:bg-red-500
              "
            >
              Go to Login
            </Link>

            <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
