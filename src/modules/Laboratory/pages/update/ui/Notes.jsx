const Notes = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">Notes</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Notes;