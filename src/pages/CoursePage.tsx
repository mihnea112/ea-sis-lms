import { Link } from "react-router-dom";

type Course = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  description: string;
  hours: number;
  progress: number;
};

type Session = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "workshop" | "presentation";
};

type Assignment = {
  id: string;
  title: string;
  due: string;
  maxPoints: number;
};

type Resource = {
  id: string;
  name: string;
  link: string;
};

// Mock data — replace with API later
const mockCourse: Course = {
  id: "c1",
  title: "Design Thinking",
  code: "DES200",
  instructor: "Dr. Popescu",
  description:
    "An applied course where students learn to solve problems using the design-thinking framework. Includes workshops and team projects.",
  hours: 42,
  progress: 75,
};

const mockSessions: Session[] = [
  {
    id: "s1",
    title: "Introduction to Design Thinking",
    date: "2025-12-02",
    time: "10:00",
    type: "class",
  },
  {
    id: "s2",
    title: "Empathy Workshop",
    date: "2025-12-04",
    time: "14:00",
    type: "workshop",
  },
  {
    id: "s3",
    title: "Team Presentations",
    date: "2025-12-11",
    time: "09:00",
    type: "presentation",
  },
];

const mockAssignments: Assignment[] = [
  { id: "a1", title: "Pitch Deck", due: "2025-12-04", maxPoints: 100 },
  {
    id: "a2",
    title: "User Interviews Report",
    due: "2025-12-08",
    maxPoints: 50,
  },
];

const mockResources: Resource[] = [
  { id: "r1", name: "Required Books", link: "#" },
  { id: "r2", name: "Module Description", link: "#" },
];

export default function CoursePage() {
  //   const { courseId } = useParams();

  // In a real system:
  // useEffect(() => fetch(`/api/courses/${courseId}`))

  const course = mockCourse;

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <header className="w-full bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-semibold">{course.title}</h1>
        <p className="text-indigo-200 mt-1">
          {course.code} · Instructor: {course.instructor}
        </p>
      </header>

      {/* OVERVIEW */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Course Overview</h2>
        <p className="text-slate-700">{course.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <div>
            <p className="text-sm text-slate-500">Course Hours</p>
            <p className="text-lg font-semibold">{course.hours}h</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Progress</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {course.progress}% completed
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Your Team</p>
            <Link
              to="/admin" // Could point to team page later
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              View Team →
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING SESSIONS */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Sessions</h2>

        <div className="space-y-3">
          {mockSessions.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-lg border flex justify-between items-center bg-slate-50 hover:bg-slate-100"
            >
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-slate-600">
                  {s.date} — {s.time}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  s.type === "class"
                    ? "bg-indigo-100 text-indigo-700"
                    : s.type === "workshop"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {s.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ASSIGNMENTS */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Assignments</h2>

        <div className="space-y-3">
          {mockAssignments.map((a) => (
            <div
              key={a.id}
              className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100"
            >
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-slate-600">Due: {a.due}</p>
              <p className="text-xs text-slate-500">
                Max points: {a.maxPoints}
              </p>

              <Link
                to={`/assignment/${a.id}`}
                className="text-indigo-600 text-sm font-medium hover:underline mt-2 inline-block"
              >
                Open →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Resources</h2>

        <ul className="space-y-2 text-sm">
          {mockResources.map((r) => (
            <li key={r.id}>
              <a
                href={r.link}
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
