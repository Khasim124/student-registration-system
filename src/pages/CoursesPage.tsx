import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import CourseForm from "../features/courses/CourseForm";
import EntitiesList from "../components/EntitiesList";
import { deleteCourse } from "../features/courses/coursesSlice";

export default function CoursesPage() {
  const items = useAppSelector((s) => s.courses);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(
    null
  );
  const formRef = useRef<HTMLDivElement>(null);

  const onEdit = (item: { id: string; name: string }) => {
    setEditing(item);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  };

  return (
    <div className="page-section">
      <h2 className="page-title">Courses ({items.length})</h2>

      <div ref={formRef}>
        <CourseForm
          existing={editing ?? undefined}
          onDone={() => setEditing(null)}
        />
      </div>

      <EntitiesList
        items={items}
        renderItem={(it) => <span>{it.name}</span>}
        onEdit={onEdit}
        onDelete={(id) => dispatch(deleteCourse(id))}
        empty={<span>No courses. Add one above.</span>}
      />
    </div>
  );
}
