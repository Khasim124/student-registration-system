import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { addCourseType, updateCourseType } from "./courseTypesSlice";
import { startTransition } from "react";

interface ExistingCourseType {
  id: string;
  name: string;
}

export default function CourseTypeForm({
  existing,
  onDone,
}: {
  existing?: ExistingCourseType;
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
      dispatch(updateCourseType({ id: existing.id, name }));
      setToastType("update");
      setToast("Course type updated successfully");
    } else {
      dispatch(addCourseType(name));
      setToastType("add");
      setToast("Course type added successfully");
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
          value={name}
          placeholder="Course type name"
          onChange={(e) => {
            const v = e.target.value;
            setName(v);
            setError(validate(v));
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
