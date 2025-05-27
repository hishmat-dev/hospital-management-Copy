

export default function SectionProfessional({ formData, handleInputChange, errors }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
          <select
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.specialization ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Psychiatry">Psychiatry</option>
          </select>
          {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
          <select
            name="department"
            value={formData.department || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Emergency">Emergency</option>
            <option value="ICU">ICU</option>
            <option value="Surgery">Surgery</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.licenseNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter medical license number"
          />
          {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience || ""}
            onChange={handleInputChange}
            min="0"
            max="50"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Years of experience"
          />
          {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee *</label>
          <input
            type="number"
            name="consultationFee"
            value={formData.consultationFee || ""}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.consultationFee ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Consultation fee in USD"
          />
          {errors.consultationFee && <p className="text-red-500 text-xs mt-1">{errors.consultationFee}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications *</label>
          <textarea
            name="qualifications"
            value={formData.qualifications || ""}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.qualifications ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter medical qualifications and certifications"
          />
          {errors.qualifications && <p className="text-red-500 text-xs mt-1">{errors.qualifications}</p>}
        </div>
      </div>
    </div>
  )
}
