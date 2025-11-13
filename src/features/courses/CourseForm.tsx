import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { addCourse, updateCourse } from "./coursesSlice";
import { startTransition } from "react";


interface ExistingCourse {
  id: string;
  name: string;
}

export default function CourseForm({
  existing,
  onDone,
}: {
  existing?: ExistingCourse;
  onDone?: () => void;
}) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"add" | "update">("add");

useEffect(() => {
  startTransition(() => {
    setName(existing ? existing.name : "");
    setError("");
  });
  inputRef.current?.focus();
}, [existing]);

  const validate = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Name is required";
    if (trimmed.length < 2) return "Minimum 2 characters required";
    if (trimmed.length > 40) return "Maximum 40 characters allowed";
    return "";
  };

  const submit = () => {
    const err = validate(name);
    if (err) {
      setError(err);
      return;
    }

    if (existing) {
      dispatch(updateCourse({ id: existing.id, name }));
      setToastType("update");
      setToast("Course updated successfully");
    } else {
      dispatch(addCourse(name));
      setToastType("add");
      setToast("Course added successfully");
    }

    onDone?.();
    setName("");
    setError("");

    setTimeout(() => setToast(""), 1500);
    inputRef.current?.focus();
  };

  const cancelEdit = () => {
    setName("");
    setError("");
    onDone?.();
    inputRef.current?.focus();
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
        <input
          ref={inputRef}
          placeholder="Course name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
            setError(validate(value));
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className={error ? "input-error" : ""}
        />

        <button
          className="primary"
          onClick={submit}
          disabled={!!validate(name)}
        >
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
