# Job Scheduler & Automation System

A full-stack Job Scheduling application that allows users to create, manage, and execute background tasks. This system simulates a real-world job queue where tasks move from **Pending** → **Running** → **Completed** and triggers a webhook notification upon completion.

## 🚀 Features

* **Create Jobs**: Submit tasks with custom JSON payloads and priority levels.
* **Job Dashboard**: View all jobs in a sortable table with status badges.
* **Filtering**: Filter jobs by **Status** (Pending, Running, Completed) or **Priority** (Low, Medium, High).
* **Job Execution Simulation**: "Run" a job to simulate a 3-second background process.
* **Webhook Integration**: Automatically triggers an external webhook (e.g., Webhook.site) when a job completes.
* **Persistent Storage**: All jobs are saved in a SQLite database.

---

## 🛠️ Tech Stack

### **Frontend**
* **React** (Vite) - Component-based UI.
* **Tailwind CSS** - Modern styling and responsiveness.
* **Lucide React** - Beautiful, lightweight icons.

### **Backend**
* **Node.js & Express** - REST API server.
* **SQLite** - Lightweight, serverless relational database.
* **Axios** - For sending webhook requests.

---

## Deployed Link:- https://stunning-cascaron-678ac5.netlify.app/

## ScreenShots
<img width="1912" height="958" alt="Screenshot 2026-01-08 144548" src="https://github.com/user-attachments/assets/cd39ee8a-17cb-4ed3-8599-e425e94c522f" />

## Github Link Backend:- https://github.com/farazsfa007/Dotix-task-nxtwave-backend

## 📂 Project Structure

```text
job-scheduler/
├── backend/
│   ├── server.js         # API Entry point & Logic
│   ├── db.js             # SQLite Connection & Schema
│   ├── jobs.db           # Database file (auto-created)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CreateJobForm.jsx
    │   │   ├── JobTable.jsx
    │   │   └── JobDetailModal.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json


