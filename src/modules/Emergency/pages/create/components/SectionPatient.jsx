

export default function SectionPatient({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <h3 className=" font-semibold text-gray-900 border-b pb-2">Patient Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Patient Name *</label>
          <input
            type="text"
            name="patientName"
            required
            value={formData.patientName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.patientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter patient name"
          />
          {errors.patientName && <p className="text-red-500  mt-1">{errors.patientName}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Age *</label>
          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Age"
            min="0"
            max="150"
          />
          {errors.age && <p className="text-red-500  mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Gender *</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500  mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="+1-555-0123"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Emergency contact name"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="+1-555-0124"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Insurance Information</label>
          <input
            type="text"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Insurance provider and policy number"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Known Allergies</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Known allergies (comma separated)"
          />
        </div>
      </div>
    </div>
  )
}
