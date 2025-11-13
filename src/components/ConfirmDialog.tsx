import React, { useEffect, useRef } from "react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && document.activeElement !== cancelRef.current)
        onConfirm();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, onConfirm]);

  if (!open) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-body"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{message ?? "Are you sure?"}</p>

        <div className="modal-actions">
          <button ref={cancelRef} className="secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
