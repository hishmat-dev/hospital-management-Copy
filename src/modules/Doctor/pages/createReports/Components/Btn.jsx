import React from "react";

const Btn = ({ onSave, onCancel, loading, disabled }) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-red-color text-white rounded transition"
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSave}
        className="px-4 py-2 bg-primary-color text-white rounded transition"
        disabled={loading || disabled}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default Btn;