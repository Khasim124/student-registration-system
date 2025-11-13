import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function EntitiesList<T extends { id: string }>({
  items,
  renderItem,
  onEdit,
  onDelete,
  empty,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  empty?: React.ReactNode;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const askDelete = (id: string) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    if (confirmId && onDelete) onDelete(confirmId);
    setConfirmId(null);
    setToast("Deleted successfully");
    setTimeout(() => setToast(""), 1200);
  };

  if (!items.length) return <div className="empty">{empty ?? "No items"}</div>;

  return (
    <>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <div className="item-content">{renderItem(item)}</div>

            <div className="item-actions">
              {onEdit && (
                <button
                  className="secondary small"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  className="danger small"
                  onClick={() => askDelete(item.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this?"
      />

      {toast && <div className="toast toast-danger">{toast}</div>}
    </>
  );
}
