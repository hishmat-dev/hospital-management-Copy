export default function PersonalInfo({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.name || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.id || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.dateOfBirth || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.gender || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.phone || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">{doctor?.email || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
