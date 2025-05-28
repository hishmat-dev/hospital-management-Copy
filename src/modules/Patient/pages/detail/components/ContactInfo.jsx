export default function ContactInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-primary-color mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-bold text-gray-600">Phone Number</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.phone || "N/A"}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-600">Email</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.email || "N/A"}</p>
          <label className="block text-sm font-bold text-gray-600">Address</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.address || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Emergency Contact</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.emergencyContactName || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600">Emergency Phone</label>
          <p className="mt-1 text-xl text-gray-900">{patient?.emergencyContactPhone || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
