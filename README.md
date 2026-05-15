# TaskFlow

A full-stack task management application with task sharing and real-time notifications.

---

# Features

- User authentication with JWT
- Protected routes
- Create, update, delete tasks
- Task filtering by status, priority, and category
- Share tasks with other users
- Real-time notifications using Socket.io
- Notification unread count
- Responsive UI
- Modular and scalable architecture

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod

## Backend

- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Socket.io
- Zod Validation

---

# Project Structure

```txt
taskflow/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── routes/
│   │   ├── layouts/
│   │   ├── utils/
│   │   ├── types/
│   │   └── features/
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── modules/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── sockets/
│   │   ├── utils/
│   │   ├── lib/
│   │   └── types/
│   │
│   ├── package.json
│   └── .env
│
├── .github/
├── .vscode/
├── README.md
└── .gitignore
```

---

# Backend Architecture

Each module follows the same structure:

```txt
module/
├── routes
├── controller
├── service
├── validation
└── types
```

This keeps the codebase:

- modular
- maintainable
- reusable
- scalable

---

# Environment Variables

## Server `.env`

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/taskflow

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

---

## Client `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd taskflow
```

---

# Backend Setup

## 2. Navigate to Server

```bash
cd server
```

---

## 3. Install Dependencies

```bash
pnpm install
```

---

## 4. Setup Prisma

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

---

## 5. Start Backend Server

```bash
pnpm dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## 6. Navigate to Client

```bash
cd client
```

---

## 7. Install Dependencies

```bash
pnpm install
```

---

## 8. Start Frontend

```bash
pnpm dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |

---

## Tasks

| Method | Endpoint     | Description |
| ------ | ------------ | ----------- |
| GET    | `/tasks`     | Get tasks   |
| POST   | `/tasks`     | Create task |
| PUT    | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

---

## Task Sharing

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | `/tasks/:id/share` | Share task  |

---

## Notifications

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/notifications` | Get notifications |

---

# Database Schema Overview

## User

- id
- name
- email
- password

## Task

- id
- title
- description
- category
- priority
- status
- dueDate
- ownerId

## Notification

- id
- message
- isRead
- receiverId

---

# Security Practices

- JWT authentication
- Password hashing using bcrypt
- Request validation using Zod
- Protected routes
- Ownership checks before update/delete
- Environment variables for secrets
- Helmet security middleware
- Input sanitization

---

# GitHub Workflow

- Feature branch workflow
- No direct commits to main
- Meaningful commit messages
- Pull request before merge

Example branches:

```txt
feature/auth
feature/task-crud
feature/task-sharing
feature/socket-notifications
```

---

# Future Improvements

- Task comments
- File attachments
- Email notifications
- Role-based access control
- Pagination
- Search functionality
- Docker deployment
- Unit and integration testing

---

# Screenshots

Add screenshots here after UI completion.

Example:

```txt
assets/dashboard.png
assets/login.png
assets/notifications.png
```

---

# Author

Your Name

---

# License

MIT License
