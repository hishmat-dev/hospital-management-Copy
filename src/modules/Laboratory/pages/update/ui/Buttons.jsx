const Buttons = ({ isUpdate, navigate }) => {
  return (
    <div className="flex justify-end space-x-4">
      <button type="submit" className="bg-primary-color text-white px-6 py-2 rounded-md">
        {isUpdate ? "Update Test" : "Submit Test"}
      </button>
      <button
        type="button"
        onClick={() => navigate("/laboratory/reports")}
        className="bg-red-600 text-white px-6 py-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  );
};

export default Buttons;