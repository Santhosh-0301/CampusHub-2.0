# CampusHub — Student Academic Dashboard

A ReactJS-based student academic dashboard that allows students to manage their courses, attendance, assignments, and profile in one place.

> **Academic Project** — Full Stack Web Development Mini Project  
> Demonstrates core React concepts including components, hooks, routing, CRUD, and local storage persistence.

---

## 🎓 About

CampusHub is a front-end student dashboard application built with ReactJS and Vite. Students log in with their name and register number, and are presented with a clean, responsive dashboard showing:

- Academic statistics (attendance, courses, pending/completed assignments)
- Subject-wise attendance with animated progress bars
- Full CRUD for assignments (add, edit, delete, search, filter)
- Enrolled courses with search functionality
- Editable student profile

All data is persisted in the browser's **Local Storage** — no backend or database required.

---

## ✅ Features

| Feature | Details |
|---|---|
| **Login** | Name + Register Number with client-side validation |
| **Protected Routes** | Unauthenticated users are redirected to `/login` |
| **Dashboard** | 4 stat cards, recent assignments, activity feed, courses & attendance preview |
| **Courses** | Card grid with search (by name, faculty, code) |
| **Attendance** | Subject-wise progress bars with conducted/attended counts and % calculation |
| **Assignments** | Full CRUD: Add / Edit / Delete / Search / Filter (All / Pending / Completed) |
| **Profile** | View and edit name, email, department, and section |
| **Theme Toggle** | Light / Dark mode with persistence in localStorage |
| **Responsive** | Works on desktop (1920px → 1024px), tablet (900px), and mobile (640px → 375px) |
| **Local Storage** | Login state, assignments, profile, and theme preference all persisted |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **ReactJS 19** | UI library |
| **Vite 6** | Build tool and dev server |
| **JSX** | Template syntax for React components |
| **JavaScript ES6+** | Arrow functions, destructuring, spread, template literals, modules |
| **React Router DOM 7** | Client-side routing with HashRouter |
| **CSS3** | Global stylesheet with CSS variables (no framework) |
| **HTML5** | Semantic structure |
| **Local Storage** | Browser-side data persistence |

---

## 📁 Project Structure

```
CampusHub/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AssignmentCard.jsx   # Individual assignment card with Edit/Delete
│   │   ├── AssignmentForm.jsx   # Controlled form for Add/Edit assignment
│   │   ├── CourseCard.jsx       # Individual course card
│   │   ├── Header.jsx           # Top bar with welcome message and user badge
│   │   ├── ProtectedRoute.jsx   # Route guard (redirects to /login if not authenticated)
│   │   ├── Sidebar.jsx          # Fixed left navigation with NavLink routing
│   │   ├── StatCard.jsx         # Reusable summary stat card
│   │   └── ThemeToggle.jsx      # Light/dark theme toggle button
│   │
│   ├── pages/
│   │   ├── Assignments.jsx      # CRUD page: Add/Edit/Delete/Search/Filter assignments
│   │   ├── Attendance.jsx       # Subject-wise attendance with animated progress bars
│   │   ├── Courses.jsx          # Enrolled courses with search
│   │   ├── Dashboard.jsx        # Main landing page with stats and previews
│   │   ├── Login.jsx            # Login form with validation
│   │   ├── NotFound.jsx         # 404 page
│   │   └── Profile.jsx          # Student profile view and edit
│   │
│   ├── data/
│   │   └── mockData.js          # Centralized academic mock data
│   │
│   ├── App.jsx                  # Root component with routing
│   ├── main.jsx                 # React entry point (HashRouter)
│   └── index.css                # Global CSS with variables, theme, and all styles
│
├── index.html                   # HTML template with Inter font
├── package.json
├── vite.config.js               # Vite config with base: '/CampusHub/' for GitHub Pages
└── README.md
```

---

## ⚛️ React Concepts Demonstrated

| Concept | Where Used |
|---|---|
| **Functional Components** | All 8 components and 6 pages |
| **JSX** | All component render returns |
| **useState** | Login fields, assignment CRUD, search/filter, edit mode, profile form, theme, sidebar |
| **useEffect** | Load from localStorage, save assignments, animate progress bars, refresh header name |
| **useRef** | Attendance progress bar animation |
| **React Router (Routes/Route)** | App.jsx routing structure |
| **NavLink** | Sidebar active link highlighting |
| **useNavigate** | Dashboard "View all" links, logout redirect, login redirect |
| **useLocation** | Header page title, sidebar close on navigation, App route check |
| **ProtectedRoute** | Wraps all authenticated pages |
| **Props** | StatCard, CourseCard, AssignmentCard, AssignmentForm, Sidebar, Header |
| **Controlled Inputs** | Login, AssignmentForm, Profile edit form |
| **Client-side Validation** | Login, AssignmentForm, Profile |
| **CRUD** | Assignments: add, read, update, delete |
| **Search** | Courses (by name/faculty/code), Assignments (by title/subject) |
| **Filter** | Assignments: All / Pending / Completed |
| **Search + Filter together** | Assignments page — both apply simultaneously |
| **Local Storage** | Theme, login session, assignments, profile |
| **Immutable state updates** | `[...prev, new]`, `prev.map(...)`, `prev.filter(...)` |
| **ES6+ Features** | Arrow functions, destructuring, spread, template literals, `filter()`, `map()`, `find()`, `reduce()` |

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/santhosh-0301/CampusHub.git
cd CampusHub

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at: **http://localhost:5173/**

---

## 🏗 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 GitHub Pages Deployment

This project is deployed at:  
**https://santhosh-0301.github.io/CampusHub/**

### Deployment Setup

**1. `vite.config.js`** — Set `base` to the repository name:
```js
export default defineConfig({
  plugins: [react()],
  base: '/CampusHub/',
});
```

**2. `main.jsx`** — Use `HashRouter` instead of `BrowserRouter` so page refreshes work on GitHub Pages (which cannot serve HTML5 history-based routes):
```jsx
import { HashRouter } from 'react-router-dom';
// ...
<HashRouter>
  <App />
</HashRouter>
```

With HashRouter, URLs use `#`:
- `https://santhosh-0301.github.io/CampusHub/#/dashboard`
- `https://santhosh-0301.github.io/CampusHub/#/assignments`

**3. Deploy:**
```bash
npm run build
# Copy dist/ contents to the gh-pages branch or use a deploy action
```

Or use the `gh-pages` npm package:
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
#   "deploy": "gh-pages -d dist"
npm run deploy
```

---

## 🗝 Local Storage Keys

| Key | Content |
|---|---|
| `campushub-name` | Logged-in student name |
| `campushub-reg` | Logged-in register number |
| `campushub-assignments` | JSON array of assignment objects |
| `campushub-profile` | JSON object with department, year, section, email |
| `campushub-theme` | `'light'` or `'dark'` |

---

## 📊 Mock Data

All academic data is centralized in `src/data/mockData.js`:

- **6 Courses** — CS6001 to CS6006 with faculty and credits
- **6 Attendance Records** — with conducted/attended counts and calculated percentages
- **15 Assignments** — 3 pending, 12 completed
- **5 Recent Activities** — dashboard activity feed

---

## 🔮 Future Enhancements

The following features are planned for future versions:

1. **Backend Integration** — Node.js + Express REST API
2. **Database** — MongoDB or MySQL for persistent data storage
3. **Authentication** — JWT-based secure login
4. **Timetable Page** — Weekly class schedule view
5. **Notifications** — Due date reminders and alerts
6. **Grade Tracker** — GPA/CGPA calculation
7. **File Upload** — Assignment submission with file attachments
8. **Admin Panel** — Faculty can post assignments and update attendance
9. **PWA** — Progressive Web App for offline support
10. **Export** — Download attendance/assignment reports as PDF

---

## 📝 Academic Information

| Field | Value |
|---|---|
| **Student** | Santhosh |
| **Course** | Full Stack Web Development |
| **Project Type** | Mini Project |
| **Front-end** | ReactJS + Vite |
| **Styling** | Vanilla CSS3 with CSS Variables |
| **Routing** | React Router DOM (HashRouter) |
| **Persistence** | Browser Local Storage |
| **Backend** | None (front-end only project) |

---

## 📄 License

This project is created for academic purposes.
