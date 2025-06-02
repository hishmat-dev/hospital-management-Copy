export default function MedicalInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 text-[12px]">
      <h3 className="font-semibold text-gray-800 mb-4">Medical Information</h3>
      
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 text-[12px]">
        {/* Allergies */}
        <div className="flex-1 min-w-[250px]">
          <label className="block  font-bold text-gray-600">Allergies</label>
          <p className="mt-1  text-gray-900">{patient?.allergies || "None reported"}</p>
        </div>

        {/* Current Medications */}
        <div className="flex-1 min-w-[250px]">
          <label className="block  font-bold text-gray-600">Current Medications</label>
          <p className="mt-1  text-gray-900">{patient?.medications || "None reported"}</p>
        </div>

        

        {/* Insurance Provider */}
        <div className="flex-1 min-w-[250px]">
          <label className="block  font-bold text-gray-600">Insurance Provider</label>
          <p className="mt-1  text-gray-900">{patient?.insurance || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
