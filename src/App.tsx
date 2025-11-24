import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

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
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-700 hover:bg-indigo-100"
    }`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">EA SIS · LMS</div>
        <div className="flex gap-2">
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
      </div>
    </nav>
  );
}
