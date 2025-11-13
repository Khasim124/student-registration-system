import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addOffering, updateOffering } from "./offeringsSlice";
import { startTransition } from "react";

interface ExistingOffering {
  id: string;
  courseId: string;
  courseTypeId: string;
}

export default function OfferingForm({
  existing,
  onDone,
}: {
  existing?: ExistingOffering;
  onDone?: () => void;
}) {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((s) => s.courses);
  const courseTypes = useAppSelector((s) => s.courseTypes);

  const [courseId, setCourseId] = useState("");
  const [courseTypeId, setCourseTypeId] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"add" | "update">("add");

  const selectRef = useRef<HTMLSelectElement>(null);

useEffect(() => {
  startTransition(() => {
    setCourseId(existing ? existing.courseId : "");
    setCourseTypeId(existing ? existing.courseTypeId : "");
    setError("");
  });

  selectRef.current?.focus();
}, [existing]);


  const validate = () => {
    if (!courseTypeId) return "Select course type";
    if (!courseId) return "Select course";
    return "";
  };

  const submit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    if (existing) {
      dispatch(updateOffering({ id: existing.id, courseId, courseTypeId }));
      setToastType("update");
      setToast("Offering updated successfully");
    } else {
      dispatch(addOffering(courseId, courseTypeId));
      setToastType("add");
      setToast("Offering added successfully");
    }

    onDone?.();
    setCourseId("");
    setCourseTypeId("");
    setError("");

    setTimeout(() => setToast(""), 1500);
    selectRef.current?.focus();
  };

  const cancelEdit = () => {
    setCourseId("");
    setCourseTypeId("");
    setError("");
    onDone?.();
    selectRef.current?.focus();
  };

  const keySubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
  };

  return (
    <>
      {toast && (
        <div
          className={toastType === "update" ? "toast success-toast" : "toast"}
        >
          {toast}
        </div>
      )}

      <div key={existing?.id ?? "new"} className="form">
        <select
          ref={selectRef}
          value={courseTypeId}
          onChange={(e) => {
            setCourseTypeId(e.target.value);
            setError(validate());
          }}
          onKeyDown={keySubmit}
          className={`dropdown ${error && !courseTypeId ? "input-error" : ""}`}
        >
          <option value="">Select course type</option>
          {courseTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            setError(validate());
          }}
          onKeyDown={keySubmit}
          className={`dropdown ${error && !courseId ? "input-error" : ""}`}
        >
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="primary" onClick={submit} disabled={!!validate()}>
          {existing ? "Update" : "Add"}
        </button>

        {existing && (
          <button className="secondary" onClick={cancelEdit}>
            Cancel
          </button>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}
