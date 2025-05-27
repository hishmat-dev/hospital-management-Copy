export default function MedicalInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Allergies</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.allergies || "None reported"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Medications</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.medications || "None reported"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Medical History</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.medicalHistory || "No significant history"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.insurance || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
