import React, { useState } from "react";
import { Link } from "react-router-dom";

// Academic Admin Dashboard
// - Program-wide Teams (teams exist across the program)
// - Both Auto-generate teams + Manual drag & drop editing
// - Course management + student roster
// - No calendar included (per request)

type Student = { id: string; name: string };
type Course = { id: string; code: string; title: string; instructor?: string };

defaultStudents();

export default function AdminDashboard() {
  // Mock data (replace with real API)
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "c1",
      code: "ENT101",
      title: "Entrepreneurship Basics",
      instructor: "Dr. Popescu",
    },
    {
      id: "c2",
      code: "DES200",
      title: "Design Thinking",
      instructor: "Dr. Ionescu",
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: "s1", name: "Ana Maria" },
    { id: "s2", name: "Bogdan" },
    { id: "s3", name: "Cristi" },
    { id: "s4", name: "Dana" },
    { id: "s5", name: "Elena" },
    { id: "s6", name: "Florin" },
    { id: "s7", name: "Gabriel" },
    { id: "s8", name: "Ioana" },
  ]);

  // Program-wide teams structure: { teamId: { name, members: [studentId] } }
  const [teams, setTeams] = useState<
    Record<string, { name: string; members: string[] }>
  >({
    TeamA: { name: "Team Alpha", members: ["s1", "s4"] },
    TeamB: { name: "Team Beta", members: ["s2", "s3"] },
  });

  // UI state
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    courses[0].id
  );
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [teamSizeInput, setTeamSizeInput] = useState<number>(3);

  // Drag/drop state
  const [draggingStudentId, setDraggingStudentId] = useState<string | null>(
    null
  );

  // Helper: auto-generate teams (round robin) given desired team size
  function autoGenerateTeams(desiredSize: number) {
    if (desiredSize <= 0) return;
    const shuffled = [...students];
    // simple shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newTeams: Record<string, { name: string; members: string[] }> = {};
    let teamIndex = 0;
    for (let i = 0; i < shuffled.length; i += desiredSize) {
      teamIndex += 1;
      const id = `T${teamIndex}`;
      newTeams[id] = {
        name: `Team ${teamIndex}`,
        members: shuffled.slice(i, i + desiredSize).map((s) => s.id),
      };
    }

    setTeams(newTeams);
  }

  // Manual operations: move student to team
  function moveStudentToTeam(studentId: string, targetTeamId: string) {
    const updated = { ...teams };
    // remove from any team first
    Object.keys(updated).forEach((tid) => {
      updated[tid].members = updated[tid].members.filter(
        (id) => id !== studentId
      );
    });
    // ensure target exists
    if (!updated[targetTeamId])
      updated[targetTeamId] = { name: targetTeamId, members: [] };
    updated[targetTeamId].members.push(studentId);
    setTeams(updated);
  }

  // Drag handlers
  function onDragStart(e: React.DragEvent, studentId: string) {
    setDraggingStudentId(studentId);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDropToTeam(e: React.DragEvent, teamId: string) {
    e.preventDefault();
    if (draggingStudentId) moveStudentToTeam(draggingStudentId, teamId);
    setDraggingStudentId(null);
  }

  function onAllowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  // Create course
  function handleCreateCourse() {
    if (!newCourseTitle || !newCourseCode) return;
    const id = `c${Date.now()}`;
    setCourses((prev) => [
      ...prev,
      { id, code: newCourseCode, title: newCourseTitle },
    ]);
    setNewCourseTitle("");
    setNewCourseCode("");
    setShowCreateCourse(false);
  }

  // Remove empty teams helper
  function removeTeam(teamId: string) {
    const copy = { ...teams };
    delete copy[teamId];
    setTeams(copy);
  }

  return (
    <div className="w-full space-y-8">
      <header className="w-full bg-gray-800 text-white rounded-xl p-6 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Academic Administration</h1>
          <p className="text-sm text-gray-200 mt-1">
            Manage courses, students and program-wide teams.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/courses"
            className="bg-white text-gray-800 px-3 py-1 rounded"
          >
            Courses
          </Link>
          <button
            onClick={() => setShowCreateCourse(true)}
            className="bg-indigo-600 px-3 py-1 rounded text-white"
          >
            Create course
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Courses + Roster */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Courses</h2>
            <div className="mt-3 space-y-2 text-sm">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className={`p-3 rounded border flex items-center justify-between ${
                    selectedCourseId === c.id ? "ring-2 ring-indigo-100" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium">
                      {c.code} — {c.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      Instructor: {c.instructor || "—"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-indigo-600 text-sm">Edit</button>
                    <button className="text-indigo-600 text-sm">Open</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Student Roster</h2>
            <p className="text-sm text-slate-500 mt-1">
              Program-wide student list. Drag students into teams on the right
              to assign.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {students.map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, s.id)}
                  className="p-2 rounded border bg-slate-50 cursor-grab"
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Teams panel */}
        <aside className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Program Teams</h2>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={teamSizeInput}
                onChange={(e) => setTeamSizeInput(Number(e.target.value))}
                className="w-16 p-1 border rounded text-sm"
              />
              <button
                onClick={() => autoGenerateTeams(teamSizeInput)}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              >
                Auto-generate
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(teams).map(([teamId, team]) => (
              <div key={teamId} className="p-3 rounded border bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{team.name}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeTeam(teamId)}
                      className="text-xs text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-2 space-y-2">
                  <div
                    onDrop={(e) => onDropToTeam(e, teamId)}
                    onDragOver={onAllowDrop}
                    className="min-h-12 p-1 rounded bg-white border"
                  >
                    {team.members.length === 0 && (
                      <div className="text-xs text-slate-400 italic">
                        Drag students here
                      </div>
                    )}
                    {team.members.map((sid) => {
                      const st = students.find((s) => s.id === sid);
                      return (
                        <div
                          key={sid}
                          className="p-1 mt-1 bg-indigo-50 text-indigo-700 rounded text-sm flex items-center justify-between"
                        >
                          <div>{st?.name}</div>
                          <div className="text-xs text-slate-500">
                            ID: {sid}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* CREATE COURSE MODAL */}
      {showCreateCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Create Course</h2>

            <div className="grid grid-cols-2 gap-2">
              <input
                value={newCourseCode}
                onChange={(e) => setNewCourseCode(e.target.value)}
                placeholder="Code (ENT101)"
                className="p-2 border rounded"
              />
              <input
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="Course title"
                className="p-2 border rounded col-span-1"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCreateCourse(false)}
                className="px-4 py-2 text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCourse}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTES / HELP */}
      <section className="bg-white p-4 rounded-xl shadow text-sm">
        <h3 className="font-semibold">Notes</h3>
        <ul className="list-disc pl-5 mt-2 text-slate-700">
          <li>
            Teams are <strong>program-wide</strong> and can be auto-generated or
            edited manually by dragging students into teams.
          </li>
          <li>
            Auto-generation uses a simple shuffle + chunking algorithm — you can
            refine it to respect cohorts, skills, or exclusions.
          </li>
        </ul>
      </section>
    </div>
  );
}

// Small helper to avoid linter warning about defaultStudents(); above
function defaultStudents() {
  return;
}
