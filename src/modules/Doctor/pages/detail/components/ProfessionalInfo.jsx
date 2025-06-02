export default function ProfessionalInfo({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-3 md:p-4 font-montserrat text-[10px] sm:text-xs">
      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Professional Information</h3>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Specialization</label>
          <p className="mt-0.5 text-gray-900">{doctor?.specialization || "N/A"}</p>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Department</label>
          <p className="mt-0.5 text-gray-900">{doctor?.department || "N/A"}</p>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">License Number</label>
          <p className="mt-0.5 text-gray-900">{doctor?.licenseNumber || "N/A"}</p>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Years of Experience</label>
          <p className="mt-0.5 text-gray-900">{doctor?.experience || "N/A"} years</p>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Consultation Fee</label>
          <p className="mt-0.5 text-gray-900">${doctor?.consultationFee || "N/A"}</p>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Status</label>
          <span
            className={`inline-flex px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold rounded-full ${
              doctor?.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {doctor?.status || "N/A"}
          </span>
        </div>
        <div className="mb-3 sm:mb-0 sm:min-w-[100px]">
          <label className="block font-medium text-gray-700">Qualifications</label>
          <p className="mt-0.5 text-gray-900">{doctor?.qualifications || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}