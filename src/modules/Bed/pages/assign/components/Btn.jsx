import React from "react";

export default function Btn({ onSave, onCancel, loading }) {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="border px-4 py-2 rounded-lg text-white bg-red-color"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSave}
        disabled={loading}
        className="bg-primary-color text-white px-6 py-2 rounded-lg disabled:opacity-60"
      >
        {loading ? "Assigning..." : "Assign Bed"}
      </button>
    </div>
  );
}