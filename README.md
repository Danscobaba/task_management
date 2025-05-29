# 📝 Task Management Application

This is a **full-stack task management application** built using **NestJS** for the backend and **Angular** for the frontend. The backend provides a RESTful API for managing tasks, while the frontend offers a responsive UI for interacting with those tasks.

---

## 📌 Features

### 🛠️ Backend (NestJS API)

- ✅ Task entity with fields: `id`, `title`, `description`, `status`, `createdAt`, `updatedAt`
- ✅ RESTful API with CRUD operations
- ✅ In-memory array
- ✅ Data validation using `ValidationPipe`
- ✅ Global error handling with exceptions
- ✅ CORS support for frontend integration

### 🎨 Frontend (Angular)

- ✅ Task list display with status filter (`OPEN`, `IN_PROGRESS`, `DONE`)
- ✅ Task creation using reactive forms
- ✅ Task status update via dropdown/buttons
- ✅ Task deletion with confirmation prompt
- ✅ User-friendly error messages
- ✅ Clean styling using Tailwind CSS, Bootstrap, or Angular Material

---

## 🧱 Backend (NestJS)

### 📁 Project Structure

server/
├── src/
│ ├── tasks/
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── tasks.controller.ts
│ │ ├── tasks.service.ts
│ ├── app.module.ts
│ └── main.ts

### 🧪 Task Entity

```ts
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/tasks`            | Retrieve all tasks    |
| GET    | `/tasks/:id`        | Retrieve a task by ID |
| POST   | `/tasks`            | Create a new task     |
| PATCH  | `/tasks/:id/status` | Update task status    |
| DELETE | `/tasks/:id`        | Delete a task         |
```

status defaults to OPEN

createdAt is auto-generated

Validation ensures title is required and status is valid

# Clone the repository and navigate to backend

git clone https://github.com/Danscobaba/task_management.git
cd server

# Install dependencies

npm install

# Start the server

npm run start:dev

## 🧱 FRONTEND (Angular)

### 📁 Project Structure

frontend/
├── src/
│ ├── app/
│ │ ├── components/
│ │ ├── interfaces/
│ │ ├── pages/
│ │ │ │ ├── tasks/
│ │ ├── services/
│ │ ├── app.component.html/
│ │ ├── app.component.ts
│ │ ├── app.module.ts
│ └── index.html

Features
Task List View

Displays title, status, and creation date

Filter by status (All, Open, In Progress, Done)

Create Task Form

Inputs for title (required) and optional description

Uses Reactive Forms with validation

Update Task Status

Dropdown/buttons to change task status

Updates task via API call

Delete Task

Button to delete task with confirmation prompt

API Service

Angular service handles all backend API interactions

Error Handling

Friendly error messages on failed API calls

Styling

Uses Tailwind CSS

🔧 Setup Instructions

# Navigate to frontend

cd ./frontend

# Install dependencies

npm install

# Start the Angular dev server

ng serve
Frontend available at: http://localhost:4200

🔁 Communication
Backend and frontend communicate via HTTP requests

Ensure CORS is enabled in NestJS (main.ts) for frontend access
