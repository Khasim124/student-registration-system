import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import RegistrationForm from "../features/registrations/RegistrationForm";
import EntitiesList from "../components/EntitiesList";
import { deleteRegistration } from "../features/registrations/registrationsSlice";

export default function RegistrationsPage() {
  const registrations = useAppSelector((s) => s.registrations);
  const offerings = useAppSelector((s) => s.offerings);
  const courses = useAppSelector((s) => s.courses);
  const courseTypes = useAppSelector((s) => s.courseTypes);
  const dispatch = useAppDispatch();

  const [filterOffering, setFilterOffering] = useState("");

  const labelMap = useMemo(() => {
    const map: Record<string, string> = {};
    offerings.forEach((o) => {
      const c = courses.find((x) => x.id === o.courseId);
      const t = courseTypes.find((x) => x.id === o.courseTypeId);
      map[o.id] = `${t?.name ?? ""} - ${c?.name ?? ""}`;
    });
    return map;
  }, [offerings, courses, courseTypes]);

  const filtered = useMemo(
    () =>
      filterOffering
        ? registrations.filter((r) => r.offeringId === filterOffering)
        : registrations,
    [filterOffering, registrations]
  );

  return (
    <div className="page-section">
      <h2 className="page-title">Registrations ({filtered.length})</h2>

      <div className="filter-bar">
        <select
          className="dropdown"
          value={filterOffering}
          onChange={(e) => setFilterOffering(e.target.value)}
        >
          <option value="">All offerings</option>
          {offerings.map((o) => (
            <option key={o.id} value={o.id}>
              {labelMap[o.id]}
            </option>
          ))}
        </select>

        {filterOffering && (
          <button className="secondary" onClick={() => setFilterOffering("")}>
            Reset
          </button>
        )}
      </div>

      <RegistrationForm />

      <EntitiesList
        items={filtered}
        renderItem={(it) => (
          <div>
            <div>
              <strong>{it.studentName}</strong>
              {it.studentEmail && <span> — {it.studentEmail}</span>}
            </div>
            <div className="muted">{labelMap[it.offeringId]}</div>
          </div>
        )}
        onDelete={(id) => dispatch(deleteRegistration(id))}
        empty={<span>No registrations yet.</span>}
      />
    </div>
  );
}
