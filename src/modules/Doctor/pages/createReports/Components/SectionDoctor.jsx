import React from "react";

const SectionDoctor = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-4 text-[12px] ">
      <h2 className=" font-semibold text-gray-700">Doctor Information</h2>
      <div>
        <label className="block  font-medium text-gray-700">Doctor Name</label>
        <input
          type="text"
          name="doctorName"
          value={formData.doctorName || ""}
          onChange={handleChange}
          className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter doctor name"
        />
        {errors.doctorName && <p className="text-red-500 ">{errors.doctorName}</p>}
      </div>
      <div>
        <label className="block  font-medium text-gray-700">Doctor ID</label>
        <input
          type="text"
          name="doctorId"
          value={formData.doctorId || ""}
          onChange={handleChange}
          className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter doctor ID"
        />
        {errors.doctorId && <p className="text-red-500 ">{errors.doctorId}</p>}
      </div>
    </div>
  );
};

export default SectionDoctor;