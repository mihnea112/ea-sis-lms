import { useState } from "react";
import { Link } from "react-router-dom";

export default function EducatorDashboard() {
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const events = [
    {
      date: weekDays[1],
      time: "09:00",
      title: "Teach: Entrepreneurship",
      type: "class",
    },
    {
      date: weekDays[2],
      time: "13:00",
      title: "Workshop: Innovation",
      type: "class",
    },
    {
      date: weekDays[4],
      time: "23:59",
      title: "Grade Assignment Batch",
      type: "task",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <header className="w-full bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-semibold">Welcome, Educator</h1>
        <p className="text-indigo-200 mt-1">
          Here is your teaching schedule and tasks.
        </p>
      </header>

      {/* WEEKLY CALENDAR */}
      <section className="w-full bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">This Week</h2>
        <p className="text-slate-600 text-sm">
          Your classes, sessions, and educator tasks for this week.
        </p>

        <div className="grid grid-cols-7 text-center font-semibold text-slate-700 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

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
                        : "bg-amber-100 text-amber-700"
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

      {/* TWO COLUMN AREA: COURSE MGMT + ASSIGNMENT REVIEW */}
      <section className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* COURSE MANAGEMENT */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Management</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
            >
              + Add Event
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border hover:bg-slate-50">
              <h3 className="font-semibold">Entrepreneurship Basics</h3>
              <p className="text-slate-500">30 Students</p>
              <div className="mt-2 flex gap-3 text-indigo-600 text-xs font-medium">
                <Link to="/course/c1">Open Course →</Link>
                <Link to="/gradebook">Manage Students →</Link>
              </div>
            </div>

            <div className="p-3 rounded-lg border hover:bg-slate-50">
              <h3 className="font-semibold">Design Thinking</h3>
              <p className="text-slate-500">25 Students</p>
              <div className="mt-2 flex gap-3 text-indigo-600 text-xs font-medium">
                <Link to="/course/c2">Open Course →</Link>
                <Link to="/gradebook">Manage Students →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ASSIGNMENT REVIEW */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Assignments to Review</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border hover:bg-slate-50">
              <h3 className="font-semibold">Pitch Deck Submissions</h3>
              <p className="text-slate-500">12 submissions awaiting review</p>
              <Link
                to="/gradebook"
                className="text-indigo-600 text-xs font-medium mt-2 inline-block"
              >
                Review Now →
              </Link>
            </div>

            <div className="p-3 rounded-lg border hover:bg-slate-50">
              <h3 className="font-semibold">Market Study Reports</h3>
              <p className="text-slate-500">8 submissions awaiting review</p>
              <Link
                to="/gradebook"
                className="text-indigo-600 text-xs font-medium mt-2 inline-block"
              >
                Review Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ADD EVENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Add New Event</h2>

            <div className="space-y-2 text-sm">
              <label className="block">Title</label>
              <input
                className="w-full border rounded p-2"
                placeholder="Event title"
              />

              <label className="block">Date</label>
              <input type="date" className="w-full border rounded p-2" />

              <label className="block">Time</label>
              <input type="time" className="w-full border rounded p-2" />

              <label className="block">Type</label>
              <select className="w-full border rounded p-2">
                <option>Class Session</option>
                <option>Assignment Due</option>
                <option>Workshop</option>
                <option>Office Hours</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* END EDUCATOR DASHBOARD */}
    </div>
  );
}
