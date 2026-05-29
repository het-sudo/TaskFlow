🚀 TaskFlow
 
🔥 A modern full-stack task management platform designed for efficient collaboration, task tracking, and productivity.
 
Built with modern web technologies using scalable architecture, authentication, protected routes, and clean backend practices.
 
---
 
# ✨ Features
 
## 🔐 Authentication & Authorization
 
 *🔑 JWT-based authentication*
 🛡️ Secure protected routes
 *👤 User session handling*
 🔒 Password hashing & validation
 
---
 
## 📋 Task Management
 
 *➕ Create tasks*
 ✏️ Update tasks
 *🗑️ Delete tasks*
 📌 Mark tasks as completed/incomplete
 *📂 Organize tasks efficiently*
 
---
 
## 👥 User Features
 
 👤 User-specific task management
 *📊 Personalized dashboard*
 🔍 Task filtering & searching
 *📅 Task tracking workflow*
 
---
 
# 🏗️ Backend Architecture
 
 🧩 Layered architecture
 *📋 Validation layer*
 ⚠️ Centralized error handling
 *📦 Reusable API response structure*
 🛢️ Database ORM integration
 *🧱 Modular route structure*
 
---
 
# 🎨 Frontend Architecture
 
 ⚛️ React + TypeScript
 *🎨 TailwindCSS*
 ♻️ Reusable components
 *🚧 Protected routes*
 🌐 API service layer
 *📱 Responsive UI*
 
---
 
# 🛠️ Tech Stack
 
## 💻 Frontend
 
 ⚛️ React
 *📘 TypeScript*
 🎨 TailwindCSS
 *🌍 React Router DOM*
 📡 Axios
 
---
 
## 🖥️ Backend
 
 *🟢 Node.js*
 🚂 Express.js
 *📘 TypeScript*
 🛢️ Database ORM
 *🔐 JWT Authentication*
 📋 Validation Middleware
 
---
 
# 📂 Project Structure
 
## 🎨 Frontend
 
```bash
src/
├── components/
├── pages/
├── routes/
├── services/
├── hooks/
├── utils/
├── types/
└── layouts/
```
 
---
 
## 🖥️ Backend
 
```bash
src/
├── config/
├── controllers/
├── middlewares/
├── modules/
├── routes/
├── services/
├── utils/
├── validations/
└── database/
```
 
---
 
# 🗄️ Database Schema
 

---

## 🔢 Enums

| Enum Name        | Values                  |
| ---------------- | ----------------------- |
| NotificationType | TASK_SHARED             |
| TaskStatus       | TODO, IN_PROGRESS, DONE |
| TaskPriority     | LOW, MEDIUM, HIGH       |

---

## 👤 User Model

| Field       | Type          | Description            |
| ----------- | ------------- | ---------------------- |
| id          | String (UUID) | Primary key            |
| name        | String        | User name              |
| email       | String        | Unique email           |
| password    | String        | Hashed password        |
| lastLoginAt | DateTime?     | Last login timestamp   |
| createdAt   | DateTime      | Account creation time  |
| updatedAt   | DateTime      | Auto-updated timestamp |

### Relations

* sessions → Session[]
* ownedTasks → Task[]
* sharedTasks → TaskShare[]
* createdTaskShares → TaskShare (TaskSharedBy relation)
* notifications → Notification[]

---

## 📌 Task Model

| Field       | Type          | Description               |
| ----------- | ------------- | ------------------------- |
| id          | String (UUID) | Primary key               |
| title       | String        | Task title                |
| description | String?       | Optional description      |
| category    | String        | Default: "general"        |
| priority    | TaskPriority  | LOW / MEDIUM / HIGH       |
| status      | TaskStatus    | TODO / IN_PROGRESS / DONE |
| dueDate     | DateTime?     | Optional deadline         |
| ownerId     | String        | Foreign key (User)        |
| createdAt   | DateTime      | Created timestamp         |
| updatedAt   | DateTime      | Auto-updated timestamp    |
| deletedAt   | DateTime?     | Soft delete support       |

### Indexes

* ownerId
* ownerId + status
* ownerId + priority
* ownerId + category
* deletedAt

---

## 🔗 TaskShare Model

| Field        | Type          | Description                |
| ------------ | ------------- | -------------------------- |
| id           | String (UUID) | Primary key                |
| taskId       | String        | Related task               |
| sharedWithId | String        | User receiving shared task |
| sharedById   | String        | User who shared            |
| createdAt    | DateTime      | Share timestamp            |

### Constraints

* UNIQUE(taskId, sharedWithId)

---

## 🔔 Notification Model

| Field     | Type             | Description          |
| --------- | ---------------- | -------------------- |
| id        | String (UUID)    | Primary key          |
| userId    | String           | Recipient user       |
| taskId    | String?          | Related task         |
| type      | NotificationType | Notification type    |
| message   | String           | Notification message |
| isRead    | Boolean          | Default: false       |
| createdAt | DateTime         | Timestamp            |

### Indexes

* userId + isRead
* createdAt

---

## 🔐 Session Model

| Field        | Type          | Description        |
| ------------ | ------------- | ------------------ |
| id           | String (UUID) | Primary key        |
| userId       | String        | Related user       |
| refreshToken | String        | Auth refresh token |
| expiresAt    | DateTime      | Expiry time        |
| revokedAt    | DateTime?     | Revoked timestamp  |
| createdAt    | DateTime      | Created timestamp  |

### Indexes

* userId
* expiresAt
* refreshToken

---
 
---
 
# 📋 Core Functionalities
 
| Feature                | Status |
| ---------------------- | ------ |
| 🔐 Authentication      | ✅      |
| 📋 Task CRUD           | ✅      |
| 👤 User Dashboard      | ✅      |
| 🚧 Protected Routes    | ✅      |
| 📱 Responsive UI       | ✅      |
| ⚠️ Error Handling      | ✅      |
| 📦 Reusable Components | ✅      |
 
---
 
# 🌐 API Routes
 
## 🔐 Auth Routes
 
```http
POST /auth/register
POST /auth/login
POST /auth/logout
```
 
---
 
## 📋 Task Routes
 
```http
GET    /tasks
GET    /tasks/:id
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```
 
---
 
# 🔑 Environment Variables
 
Create a `.env` file in backend root.
 
```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET_KEY=your_secret_key

CLIENT_URL=http://localhost:5173
```
 
---
 
# 🚀 Installation
 
## 📥 Clone Repository
 
```bash
git clone https://github.com/het-sudo/TaskFlow.git
```
 
---
 
## 🖥️ Backend Setup
 
```bash
cd backend

pnpm install

pnpm dev
```
 
---
 
## 🎨 Frontend Setup
 
```bash
cd frontend

pnpm install

pnpm dev
```
 
---
 
# 📜 Scripts
 
## 🖥️ Backend
 
```bash
pnpm dev
pnpm build
```
 
---
 
## 🎨 Frontend
 
```bash
pnpm dev
pnpm build
pnpm preview
```
 
---
 
# 🛡️ Security Features
 
 *🔒 Password hashing*
 🔑 JWT verification
 *🚧 Protected APIs*
 👮 Authorization middleware
 *📋 Request validation*
 ⚠️ Centralized error handling
 
---
 
# ⚠️ Error Handling
 
The application includes:
 
 *📌 Standardized API responses*
 ❌ Validation handling
 *⚠️ Centralized error middleware*
 ✅ Proper HTTP status codes
 
---
 
# 🚀 Future Improvements
 
 *📅 Due dates & reminders*
 👥 Team collaboration
 *📊 Analytics dashboard*
 🏷️ Task labels & priorities
 *🔔 Notifications*
 🌙 Dark mode support
 
---
 
# 🌿 Git Workflow
 
This project follows:
 
 *🌱 Feature branch workflow*
 ✍️ Meaningful commits
 *🔀 Pull request-based development*
 
---
 
# 📚 Learning Outcomes
 
This project helped practice:
 
 🏗️ Scalable architecture
 *🔐 Authentication systems*
 📋 CRUD operations
 *⚛️ React + TypeScript development*
 🛢️ Database integration
* 🛡️ Secure backend development
 
---
 
# 👨‍💻 Author
 
Developed by **Het** 🚀
 
---

