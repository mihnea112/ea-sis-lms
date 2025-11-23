import React from "react";
import { Link } from "react-router-dom";

// Example mock data
const courses = [
  { id: "c1", title: "Design Thinking", progress: 70, grade: "7.8" },
  { id: "c2", title: "Entrepreneurship Basics", progress: 45, grade: "6.5" },
  { id: "c3", title: "Finance for Founders", progress: 90, grade: "8.9" },
];

const assignments = [
  {
    id: "a1",
    title: "Pitch Deck",
    dueDate: "2025-12-04",
    course: "Design Thinking",
  },
  {
    id: "a2",
    title: "Market Study",
    dueDate: "2025-12-12",
    course: "Entrepreneurship Basics",
  },
];

export default function StudentDashboardDetailed() {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start

  // Create week days with actual dates
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  // Example events
  const events = [
    {
      date: weekDays[1],
      time: "10:00",
      title: "Entrepreneurship Class",
      type: "class",
    },
    {
      date: weekDays[3],
      time: "14:00",
      title: "Design Thinking Workshop",
      type: "class",
    },
    {
      date: weekDays[5],
      time: "23:59",
      title: "Pitch Deck Due",
      type: "assignment",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <header className="w-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-semibold">Welcome back, Student</h1>
        <p className="text-indigo-200 mt-1">
          Here is your learning overview and schedule.
        </p>
      </header>

      {/* WEEKLY CALENDAR */}
      <section className="w-full bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">This Week</h2>
        <p className="text-slate-600 text-sm">
          Classes, sessions, and assignments for this week.
        </p>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center font-semibold text-slate-700 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Week cells */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, idx) => {
            const dayEvents = events.filter(
              (e) => e.date.toDateString() === day.toDateString()
            );

            return (
              <div
                key={idx}
                className="min-h-32 bg-slate-50 rounded-lg p-2 text-sm border"
              >
                <div className="text-xs text-slate-500 mb-1">
                  {day.getDate()}{" "}
                  {day.toLocaleString("default", { month: "short" })}
                </div>

                {dayEvents.map((ev, i) => (
                  <div
                    key={i}
                    className={`p-1 mb-1 rounded text-xs ${
                      ev.type === "class"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ev.time} — {ev.title}
                  </div>
                ))}

                {dayEvents.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No events</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING ASSIGNMENTS */}
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-3">Upcoming Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-lg">{a.title}</h3>
              <p className="text-sm text-slate-500">Course: {a.course}</p>
              <p className="text-sm text-slate-500 mt-1">Due: {a.dueDate}</p>
              <Link
                to={`/assignment/${a.id}`}
                className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
              >
                Open Assignment →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-3">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                {c.grade && (
                  <p className="mt-3 text-sm text-slate-600">
                    Current grade:{" "}
                    <span className="font-semibold">{c.grade}</span>
                  </p>
                )}
              </div>
              <Link
                to={`/course/${c.id}`}
                className="text-indigo-600 hover:underline text-sm font-medium"
              >
                Open Course →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FINANCIAL OVERVIEW */}
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-3">Financial Overview</h2>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-slate-600 text-sm">Outstanding Balance</p>
            <p className="text-2xl font-bold text-red-600">€2,500</p>
          </div>
          <Link
            to="/financials"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            View Financial Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
