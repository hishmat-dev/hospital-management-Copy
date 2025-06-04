

export default function SectionBasic({ formData, handleChange, errors }) {
  return (
    <div className="space-y-2 text-[12px]">
      <h3 className=" font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Room Number *</label>
          <input
            type="text"
            name="roomNumber"
            required
            value={formData.roomNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.roomNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="101"
          />
          {errors.roomNumber && <p className="text-red-500  mt-1">{errors.roomNumber}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Bed Number *</label>
          <input
            type="text"
            name="bedNumber"
            required
            value={formData.bedNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.bedNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="A"
          />
          {errors.bedNumber && <p className="text-red-500  mt-1">{errors.bedNumber}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Floor *</label>
          <select
            name="floor"
            required
            value={formData.floor}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.floor ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Floor</option>
            <option value="Ground Floor">Ground Floor</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
          </select>
          {errors.floor && <p className="text-red-500  mt-1">{errors.floor}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Department *</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
            <option value="Surgery">Surgery</option>
          </select>
          {errors.department && <p className="text-red-500  mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Bed Type *</label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Type</option>
            <option value="General">General</option>
            <option value="Private">Private</option>
            <option value="ICU">ICU</option>
            <option value="NICU">NICU</option>
            <option value="CCU">CCU</option>
            <option value="Isolation">Isolation</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.type && <p className="text-red-500  mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Available">Available</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
      </div>
    </div>
  )
}
