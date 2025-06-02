import React from "react";

export default function SectionBedInfo({ formData, handleChange, errors, roomOptions }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700">Room Number *</label>
          <select
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Room Number</option>
            {roomOptions
              .filter((bed) => bed.status === "Available")
              .map((bed) => (
                <option key={bed.id} value={bed.roomNumber}>
                  {bed.roomNumber}
                </option>
              ))}
          </select>
          {errors.roomNumber && <p className="text-red-500 ">{errors.roomNumber}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Bed Number *</label>
          <select
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Bed Number</option>
            {roomOptions
              .filter((bed) => bed.roomNumber === formData.roomNumber && bed.status === "Available")
              .map((bed) => (
                <option key={bed.id} value={bed.bedNumber}>
                  {bed.bedNumber}
                </option>
              ))}
          </select>
          {errors.bedNumber && <p className="text-red-500 ">{errors.bedNumber}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Admission Date *</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            min="2025-06-02" // Current date based on system info (05:35 PM PKT, June 02, 2025)
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.admissionDate && <p className="text-red-500 ">{errors.admissionDate}</p>}
        </div>
      </div>
    </div>
  );
}