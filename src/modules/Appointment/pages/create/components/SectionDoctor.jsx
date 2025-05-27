

export default function SectionDoctor({ formData, handleChange, errors, doctors = [] }) {
  const filteredDoctors = doctors.filter((doctor) => !formData.department || doctor.department === formData.department)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Doctor & Department</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
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
            <option value="Dermatology">Dermatology</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor *</label>
          <select
            name="doctorId"
            required
            value={formData.doctorId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.doctorId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
          {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type *</label>
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
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Emergency">Emergency</option>
            <option value="Routine Checkup">Routine Checkup</option>
            <option value="Surgery Consultation">Surgery Consultation</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
      </div>
    </div>
  )
}
