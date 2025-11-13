import React, { useMemo } from "react";
import { useAppSelector } from "../hooks";

export default function Dashboard() {
  const courseTypes = useAppSelector((s) => s.courseTypes.length);
  const courses = useAppSelector((s) => s.courses.length);
  const offerings = useAppSelector((s) => s.offerings.length);
  const registrations = useAppSelector((s) => s.registrations.length);

  const stats = useMemo(
    () => [
      { label: "Course Types", value: courseTypes },
      { label: "Courses", value: courses },
      { label: "Offerings", value: offerings },
      { label: "Registrations", value: registrations },
    ],
    [courseTypes, courses, offerings, registrations]
  );

  return (
    <div className="dashboard-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="dashboard-card">
          <h3>{stat.label}</h3>
          <p className="value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
