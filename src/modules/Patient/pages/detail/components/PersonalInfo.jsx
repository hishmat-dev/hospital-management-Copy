export default function PersonalInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-primary-color mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-600">Full Name</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.name || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Patient ID</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.id || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Date of Birth</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.dateOfBirth || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Age</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.age || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Gender</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.gender || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Blood Type</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.bloodType || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
