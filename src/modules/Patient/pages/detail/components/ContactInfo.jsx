export default function ContactInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-3">
      <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
      
      <div className="flex flex-col lg:flex-row   gap-6 text-[12px]">
        {/* Phone Number */}
        <div className="flex-1 min-w-[200px]">
          <label className="block  font-bold text-gray-600">Phone Number</label>
          <p className="mt-1  text-gray-900">{patient?.phone || "N/A"}</p>
        </div>

        {/* Email and Address */}
        <div className="flex-1 min-w-[200px]">
          <label className="block  font-bold text-gray-600">Email</label>
          <p className="mt-1  text-gray-900">{patient?.email || "N/A"}</p>
        </div>

        {/* Emergency Contact */}
        <div className="flex-1 min-w-[200px]">
          <label className="block  font-bold text-gray-600">Address</label>
          <p className="mt-1  text-gray-900">{patient?.address || "N/A"}</p>
        
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block  font-bold text-gray-600">Emergency Contact</label>
          <p className="mt-1  text-gray-900">{patient?.emergencyContactName || "N/A"}</p>
        </div>

        {/* Emergency Phone */}
        <div className="flex-1 min-w-[200px]">
          <label className="block  font-bold text-gray-600">Emergency Phone</label>
          <p className="mt-1  text-gray-900">{patient?.emergencyContactPhone || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
