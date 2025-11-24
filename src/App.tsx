import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import React from "react";

import StudentDashboard from "./pages/StudentDashboard";
import EducatorDashboard from "./pages/EducatorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GradebookPage from "./pages/GradebookPage";
import CoursePage from "./pages/CoursePage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col">
        <Navbar />
        <main className="w-full py-6">
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/educator" element={<EducatorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/gradebook" element={<GradebookPage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// ===============================
// Navbar Component
// ===============================
function Navbar() {
  const [open, setOpen] = React.useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-700 hover:bg-indigo-100"
    }`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold">EA SIS · LMS</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-2">
          <NavLink to="/student" className={linkClasses}>
            Student
          </NavLink>
          <NavLink to="/educator" className={linkClasses}>
            Educator
          </NavLink>
          <NavLink to="/admin" className={linkClasses}>
            Admin
          </NavLink>
          <NavLink to="/gradebook" className={linkClasses}>
            Gradebook
          </NavLink>
        </div>

        {/* Mobile Menu Button (force white background) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-white! shadow border border-slate-200"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-800!"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-800!"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-1 animate-fadeIn">
          <NavLink
            to="/student"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            Student
          </NavLink>
          <NavLink
            to="/educator"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            Educator
          </NavLink>
          <NavLink
            to="/admin"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            Admin
          </NavLink>
          <NavLink
            to="/gradebook"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            Gradebook
          </NavLink>
        </div>
      )}
    </nav>
  );
}
