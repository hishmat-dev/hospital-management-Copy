export default function SectionRoomInfo({
  formData,
  handleChange,
  errors,
  roomOptions,
  roomTypeOptions,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700">Room Type *</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Room Type</option>
            {roomTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.roomType && <p className="text-red-500 ">{errors.roomType}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Room No *</label>
          <select
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Room No</option>
            {roomOptions.map((room) => (
              <option key={room.id} value={room.number}>
                {room.number}
              </option>
            ))}
          </select>
          {errors.roomNo && <p className="text-red-500 ">{errors.roomNo}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Admission Date *</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            min="2025-06-02" // Current date based on system info
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.admissionDate && (
            <p className="text-red-500 ">{errors.admissionDate}</p>
          )}
        </div>
      </div>
    </div>
  );
}