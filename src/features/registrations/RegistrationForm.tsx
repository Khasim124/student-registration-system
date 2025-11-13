import React, { useState, useRef, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addRegistration } from "./registrationsSlice";

export default function RegistrationForm({ onDone }: { onDone?: () => void }) {
  const dispatch = useAppDispatch();
  const offerings = useAppSelector((s) => s.offerings);
  const courses = useAppSelector((s) => s.courses);
  const courseTypes = useAppSelector((s) => s.courseTypes);

  const [offeringId, setOfferingId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const labelMap = useMemo(() => {
    const map: Record<string, string> = {};
    offerings.forEach((o) => {
      const c = courses.find((x) => x.id === o.courseId);
      const t = courseTypes.find((x) => x.id === o.courseTypeId);
      map[o.id] = `${t?.name ?? ""} - ${c?.name ?? ""}`;
    });
    return map;
  }, [offerings, courses, courseTypes]);

  const validate = () => {
    if (!offeringId) return "Select offering";
    const trimmed = studentName.trim();
    if (!trimmed) return "Student name required";
    if (studentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail))
      return "Invalid email";
    return "";
  };

  const submit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    dispatch(addRegistration(offeringId, studentName, studentEmail));
    setToast("Student registered successfully");
    setTimeout(() => setToast(""), 1500);

    onDone?.();
    setOfferingId("");
    setStudentName("");
    setStudentEmail("");
    setError("");

    inputRef.current?.focus();
  };

  const keySubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
  };

  const isDisabled = !!validate();

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <div className="form">
        <select
          value={offeringId}
          onChange={(e) => {
            setOfferingId(e.target.value);
            setError(validate());
          }}
          className={`dropdown ${error && !offeringId ? "input-error" : ""}`}
        >
          <option value="">Select offering</option>
          {offerings.map((o) => (
            <option key={o.id} value={o.id}>
              {labelMap[o.id]}
            </option>
          ))}
        </select>

        <input
          ref={inputRef}
          placeholder="Student name"
          value={studentName}
          onChange={(e) => {
            setStudentName(e.target.value);
            setError(validate());
          }}
          onKeyDown={keySubmit}
          className={error && !studentName.trim() ? "input-error" : ""}
        />

        <input
          placeholder="Student email (optional)"
          value={studentEmail}
          onChange={(e) => {
            setStudentEmail(e.target.value);
            setError(validate());
          }}
          onKeyDown={keySubmit}
          className={
            error &&
            studentEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)
              ? "input-error"
              : ""
          }
        />

        <button className="primary" onClick={submit} disabled={isDisabled}>
          Register
        </button>

        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}
