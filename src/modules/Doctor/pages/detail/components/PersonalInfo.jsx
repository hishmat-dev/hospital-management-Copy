export default function PersonalInfo({ doctor, profile, navigate }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 font-montserrat text-[12px]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        {/* Doctor Info Group */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <img
              src={doctor?.profilePicture || profile}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-bold font-montserrat text-primary-color">
                {doctor?.name || "N/A"}
              </h1>
              <p className="text-gray-500">
                <span className="font-semibold">Doctor ID:</span> {doctor?.id || "N/A"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-500">
              <span className="font-semibold">Date of Birth:</span> {doctor?.dateOfBirth || "N/A"}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Age:</span> {doctor?.age || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">
              <span className="font-semibold">Gender:</span> {doctor?.gender || "N/A"}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Phone:</span> {doctor?.phone || "N/A"}
            </p>

          </div>
        </div>

        <div className="lg:ml-auto">
          <button
            onClick={() => navigate("/doctors/list")}
            className="bg-primary-color font-montserrat text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-col lg:flex-row justify-between mt-3">
      
        <p className="text-gray-500">
          <span className="font-semibold">Email:</span> {doctor?.email || "N/A"}
        </p>
      </div>
    </div>
  );
}