<<<<<<< HEAD
# ERP-FRONTEND
=======
# EduPulse ERP - Modern Student Management Dashboard

A modern, full-featured Student ERP Dashboard built with **React.js** and **Vite**. It features a design system, real-time statistics, multi-field filtering, search, CSV export, and full CRUD operations utilizing standard HTTP methods.

---

## Features & HTTP Methods

| Operation | HTTP Method | Endpoint | Description |
|---|---|---|---|
| **List Students** | `GET` | `/api/students` | Fetch all students with query params (`search`, `department`, `feeStatus`) |
| **Get Student Details** | `GET` | `/api/students/:id` | Fetch single student record with 360° academic profile |
| **Add Student** | `POST` | `/api/students` | Enroll and store a new student in the database |
| **Update Student** | `PUT` | `/api/students/:id` | Full update of existing student record |
| **Partial Update** | `PATCH` | `/api/students/:id` | Quick toggle of status, fees, or attendance |
| **Delete Student** | `DELETE` | `/api/students/:id` | Permanent removal of student record with confirmation |

---

## Project Structure

```
react/
├── index.html                  # Main HTML entry with Google fonts
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── src/
    ├── main.jsx                # React DOM root render
    ├── App.jsx                 # Core ERP state manager & HTTP orchestration
    ├── services/
    │   └── api.js              # HTTP client supporting GET, POST, PUT, PATCH, DELETE
    ├── components/
    │   ├── Sidebar.jsx         # Modern ERP navigation sidebar
    │   ├── Navbar.jsx          # Live search, dark/light theme, API mode switch
    │   ├── StatsCards.jsx      # Metrics (Total, Active, Avg Attendance, Fee Rates)
    │   ├── StudentTable.jsx    # Table with sorting, badge indicators, actions
    │   ├── StudentModal.jsx    # Form modal for Add (POST) & Edit (PUT)
    │   ├── StudentDetailModal.jsx # 360° Profile viewer modal (GET by ID)
    │   ├── DeleteConfirmModal.jsx # Safe confirmation dialog for DELETE
    │   ├── ApiSettingsModal.jsx   # Toggle between Mock Engine & Live Backend API
    │   └── Toast.jsx           # Real-time HTTP status feedback toasts
    └── styles/
        └── index.css           # Glassmorphism, animations, dark/light variables
```

---

## How to Run

1. **Install Dependencies** (Already configured):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Dual Mode: Mock REST & Live Backend API
- **Mock REST Mode (Default)**: Runs immediately in any browser with LocalStorage persistence and simulated network latency.
- **Live Backend API**: Click the **"Mock REST Engine"** pill in the top navbar to configure any custom REST backend (Node.js/Express, Python/Django/FastAPI, Java/Spring Boot) with baseURL.
>>>>>>> 352a213 (Initial commit: Prathyusha Engineering College Student ERP Frontend with full CRUD HTTP methods)
