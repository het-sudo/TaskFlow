# 🚀 TaskFlow

A full-stack task management system with real-time collaboration, task sharing, and live notifications powered by Socket.io.

TaskFlow is designed as a **scalable, modular, production-ready system** with offline-safe notifications, real-time updates, and a clean feature-based architecture.

---

# ✨ Features

- Secure JWT authentication with refresh token sessions
- Protected routes with ownership validation
- Full CRUD for tasks
- Advanced filtering (status, priority, category)
- Task sharing between users (many-to-many system)
- Real-time notifications using Socket.io
- Offline-safe notification persistence (DB-backed)
- Unread notification tracking system
- Mark notifications as read
- Dashboard analytics API
- Soft delete support (safe data recovery)
- Modular feature-based backend architecture
- Strong request validation using Zod

---

# 🧠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod
- Socket.io Client

## Backend

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Socket.io
- Zod Validation
- Helmet Security Middleware

---

# 📁 Project Structure

taskflow/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── routes/
│ │ ├── shared/
│ │ ├── libs/
│ │ ├── styles/
│ │ └── features/
│ ├── public/
│ ├── package.json
│ └── .env
│
├── server/
│ ├── prisma/
│ ├── src/
│ │ ├── modules/
│ │ ├── middleware/
│ │ ├── config/
│ │ ├── sockets/
│ │ ├── utils/
│ │ ├── routes/
│ │ └── types/
│ ├── package.json
│ └── .env
│
└── README.md

---

# 🧩 Backend Architecture Pattern

Each feature module follows:

module/
├── routes
├── controller
├── service
├── validation
└── types

### Why this architecture?

- Feature isolation
- Easy scaling
- Independent debugging
- Clean separation of business logic

---

# 🗄️ Database Schema Overview (Prisma)

## 👤 User

- Authentication entity
- Owns tasks
- Receives notifications
- Maintains sessions

## 📌 Task

- Core business entity
- Status, priority, category support
- Belongs to a user
- Can be shared

## 🤝 TaskShare

- Many-to-many relation (users ↔ tasks)
- Tracks sharedBy + sharedWith
- Prevents duplicate sharing

## 🔔 Notification

- Persistent event storage
- Supports read/unread state

## 🔐 Session

- Refresh token system
- Secure session control

---

# ⚡ API OVERVIEW

## Auth

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- POST `/auth/refresh-token`
- GET `/auth/me`

## Tasks

- GET `/tasks`
- POST `/tasks`
- GET `/tasks/:id`
- PUT `/tasks/:id`
- DELETE `/tasks/:id`
- POST `/tasks/:id/share`
- GET `/tasks/categories`
- GET `/tasks/shared-with-me`
- GET `/tasks/shared-with-me/categories`

## Notifications

- GET `/notifications`
- PATCH `/notifications/:id/read`

## Dashboard

- GET `/dashboard/stats`

---

# 🔌 REAL-TIME SYSTEM (Socket.io)

## Events

- notification:new
- notification:read
- task:shared

---

# 🔔 Notification Flow (IMPORTANT)

- Online user → receives toast instantly
- Offline user → stored in DB only
- On login → fetch DB notifications, update badge only (NO toasts replay)
- After login → only new events trigger toasts

---

# 🧠 NOTABLE DESIGN DECISIONS

## Prisma ORM

- Type-safe DB access
- Strong migrations
- Reduces runtime SQL errors

## PostgreSQL

- Reliable relational database
- Great for task + sharing relationships

## TaskShare Table

- Handles many-to-many relations
- Stores metadata (sharedBy, timestamps)

## Notification in DB

- Enables offline support
- Multi-device sync
- Persistent history

## No toast replay on login

- Prevents spam UX
- Separates history vs live events

## Modular backend

- Feature isolation
- Easy scaling

## Session table

- Refresh token rotation

## Zod validation

- Strong input validation
- Cleaner controllers

---

# 🚀 UNIQUE SYSTEM HIGHLIGHTS

- Hybrid real-time + offline notification system
- Event-driven Socket architecture
- Scalable modular backend design
- Indexed PostgreSQL schema
- Clean separation of business logic

---

# 🔮 FUTURE ENHANCEMENTS

## Real-time

- Redis Socket scaling
- Room-based collaboration
- Live presence indicators

## Product

- Task comments (threaded)
- File uploads (S3 / Cloudinary)
- Drag & drop Kanban
- Recurring tasks

## Notifications

- Email + push notifications
- Smart grouping
- Priority-based alerts

## AI

- Smart task prioritization
- Auto categorization
- Task summarizer

## Security

- Role-based access control
- Audit logs
- Device management

## DevOps

- Docker setup
- CI/CD pipeline
- Production scaling

---

# 🛡️ SECURITY PRACTICES

- JWT authentication
- Password hashing (bcrypt)
- Zod validation
- Environment variables protection

---

# ⚙️ SETUP INSTRUCTIONS

## Clone

```bash
git clone <repo-url>
cd taskflow
```

Backend
cd server
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev

Backend runs at:
http://localhost:9000

Frontend
cd client
pnpm install
pnpm dev

Frontend runs at:
http://localhost:5173

👨‍💻 AUTHOR

HET PATEL
