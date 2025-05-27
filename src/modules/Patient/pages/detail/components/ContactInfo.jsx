export default function ContactInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.phone || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.email || "N/A"}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.address || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.emergencyContact || "N/A"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Phone</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.emergencyPhone || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
