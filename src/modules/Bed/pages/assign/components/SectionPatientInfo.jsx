import React from "react";

export default function SectionPatientInfo({ formData, handleChange, errors }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700">Patient Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.name && <p className="text-red-500 ">{errors.name}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Patient Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Patient phone number"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
          />
          {errors.phone && <p className="text-red-500 ">{errors.phone}</p>}
        </div>

        <div className="col-span-2">
          <label className="block  font-medium text-gray-700">Chief Complaint</label>
          <input
            type="text"
            name="chiefComplaint"
            placeholder="Brief description of patient's main concern"
            value={formData.chiefComplaint}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.chiefComplaint && (
            <p className="text-red-500 ">{errors.chiefComplaint}</p>
          )}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 ">{errors.gender}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.age && <p className="text-red-500 ">{errors.age}</p>}
        </div>
      </div>
    </div>
  );
}