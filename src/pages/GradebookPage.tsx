import { useState } from "react";
type StudentGrade = {
  id: string;
  name: string;
  grades: Record<string, number | null>; // assignmentId → grade
};

type Assignment = {
  id: string;
  title: string;
  maxPoints: number;
};

const mockAssignments: Assignment[] = [
  { id: "a1", title: "Pitch Deck", maxPoints: 100 },
  { id: "a2", title: "Market Study", maxPoints: 100 },
  { id: "a3", title: "Business Model Canvas", maxPoints: 50 },
];

const mockStudents: StudentGrade[] = [
  { id: "s1", name: "Ana Maria", grades: { a1: 78, a2: null, a3: 45 } },
  { id: "s2", name: "Bogdan", grades: { a1: 90, a2: 88, a3: 40 } },
  { id: "s3", name: "Cristi", grades: { a1: null, a2: null, a3: 50 } },
  { id: "s4", name: "Dana", grades: { a1: 55, a2: 70, a3: null } },
];

export default function GradebookPage() {
  const [students, setStudents] = useState<StudentGrade[]>(mockStudents);

  function updateGrade(studentId: string, assignmentId: string, value: string) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              grades: {
                ...s.grades,
                [assignmentId]: value === "" ? null : Number(value),
              },
            }
          : s
      )
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <header className="w-full  bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-semibold">Gradebook</h1>
        <p className="text-indigo-200 mt-1">
          Manage student assignment grades and performance.
        </p>
      </header>

      {/* GRADEBOOK TABLE */}
      <section className="w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Assignment Grades</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="px-4 py-2 text-left font-semibold">Student</th>
                {mockAssignments.map((a) => (
                  <th key={a.id} className="px-4 py-2 text-left font-semibold">
                    {a.title}{" "}
                    <span className="text-slate-500 text-xs">
                      (/{a.maxPoints})
                    </span>
                  </th>
                ))}
                <th className="px-4 py-2 text-left font-semibold">Average</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const total = mockAssignments.reduce((acc, a) => {
                  const g = student.grades[a.id];
                  return g ? acc + g : acc;
                }, 0);

                const possible = mockAssignments.reduce(
                  (acc, a) => acc + a.maxPoints,
                  0
                );
                const avg = ((total / possible) * 100).toFixed(1);

                return (
                  <tr key={student.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium">{student.name}</td>

                    {mockAssignments.map((a) => (
                      <td key={a.id} className="px-4 py-2">
                        <input
                          type="number"
                          min={0}
                          max={a.maxPoints}
                          value={student.grades[a.id] ?? ""}
                          onChange={(e) =>
                            updateGrade(student.id, a.id, e.target.value)
                          }
                          className="w-20 p-1 border rounded"
                        />
                      </td>
                    ))}

                    <td className="px-4 py-2 font-semibold">{avg}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
