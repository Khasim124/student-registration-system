import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import CourseTypeForm from "../features/courseTypes/CourseTypeForm";
import EntitiesList from "../components/EntitiesList";
import { deleteCourseType } from "../features/courseTypes/courseTypesSlice";
import { CourseType } from "../types";

export default function CourseTypesPage() {
  const items = useAppSelector((s) => s.courseTypes);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<CourseType | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const onEdit = (item: CourseType) => {
    setEditing(item);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  };

  return (
    <div className="page-section">
      <h2 className="page-title">Course Types ({items.length})</h2>

      <div ref={formRef}>
        <CourseTypeForm
          existing={editing ?? undefined}
          onDone={() => setEditing(null)}
        />
      </div>

      <EntitiesList
        items={items}
        renderItem={(it) => <span>{it.name}</span>}
        onEdit={onEdit}
        onDelete={(id) => dispatch(deleteCourseType(id))}
        empty={<span>No course types. Add one above.</span>}
      />
    </div>
  );
}
