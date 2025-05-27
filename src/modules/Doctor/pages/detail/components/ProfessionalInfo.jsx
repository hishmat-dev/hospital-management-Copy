export default function ProfessionalInfo({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.specialization || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.department || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">License Number</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.licenseNumber || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.experience || "N/A"} years</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
          <p className="mt-1 text-sm text-gray-900">${doctor?.consultationFee || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              doctor?.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {doctor?.status || "N/A"}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Qualifications</label>
        <p className="mt-1 text-sm text-gray-900">{doctor?.qualifications || "N/A"}</p>
      </div>
    </div>
  )
}
