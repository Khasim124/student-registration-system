import React, { useRef, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import OfferingForm from "../features/offerings/OfferingForm";
import EntitiesList from "../components/EntitiesList";
import { deleteOffering } from "../features/offerings/offeringsSlice";
import { Offering } from "../types";

export default function OfferingsPage() {
  const offerings = useAppSelector((s) => s.offerings);
  const courses = useAppSelector((s) => s.courses);
  const courseTypes = useAppSelector((s) => s.courseTypes);
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState<Offering | null>(null);
  const [filterType, setFilterType] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const filteredOfferings = useMemo(
    () =>
      filterType
        ? offerings.filter((o) => o.courseTypeId === filterType)
        : offerings,
    [filterType, offerings]
  );

  const label = useMemo(() => {
    const map: Record<string, string> = {};
    offerings.forEach((o) => {
      const course = courses.find((c) => c.id === o.courseId);
      const type = courseTypes.find((t) => t.id === o.courseTypeId);
      map[o.id] = `${type?.name ?? ""} - ${course?.name ?? ""}`;
    });
    return map;
  }, [offerings, courses, courseTypes]);

  const onEdit = (o: Offering) => {
    setEditing(o);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  };

  return (
    <div className="page-section">
      <h2 className="page-title">Offerings ({filteredOfferings.length})</h2>

      <div className="filter-bar">
        <select
          className="dropdown"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by course type</option>
          {courseTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {filterType && (
          <button className="secondary" onClick={() => setFilterType("")}>
            Reset
          </button>
        )}
      </div>

      <div ref={formRef}>
        <OfferingForm
          existing={editing ?? undefined}
          onDone={() => setEditing(null)}
        />
      </div>

      <EntitiesList
        items={filteredOfferings}
        renderItem={(it) => <span>{label[it.id]}</span>}
        onEdit={onEdit}
        onDelete={(id) => dispatch(deleteOffering(id))}
        empty={<span>No offerings. Add one above.</span>}
      />
    </div>
  );
}
