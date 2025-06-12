
const SectionPatient = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-4 text-[12px] ">
      <h2 className=" font-semibold text-gray-700">Patient Information</h2>
      <div>
        <label className="block  font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName || ""}
          onChange={handleChange}
          className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter patient name"
        />
        {errors.patientName && <p className="text-red-500 ">{errors.patientName}</p>}
      </div>
      <div>
        <label className="block  font-medium text-gray-700">Patient ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId || ""}
          onChange={handleChange}
          className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter patient ID"
        />
        {errors.patientId && <p className="text-red-500 ">{errors.patientId}</p>}
      </div>
    </div>
  );
};

export default SectionPatient;