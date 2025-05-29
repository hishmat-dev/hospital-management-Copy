export default function PersonalInfo({ patient, profile, navigate }) {

  return (
    <div className="bg-white shadow rounded-lg p-3">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">

        {/* Patient Info Group */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <img
              src={patient?.profilePicture || profile}
              alt="Patient Profile"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-bold font-montserrat text-primary-color">{patient?.name}</h1>
              <p className="text-gray-500">
                <span className="font-semibold">Patient ID:</span> {patient?.id}
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base">
            <p className="text-gray-500">
              <span className="font-semibold">Date of Birth:</span> {patient?.dateOfBirth || "N/A"}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Age:</span> {patient?.age || "N/A"}
            </p>
          </div>
          <div className="text-sm sm:text-base">
            <p className="text-gray-500">
              <span className="font-semibold">Gender:</span> {patient?.gender}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Blood Type:</span> {patient?.bloodType || "N/A"}
            </p>
          </div>
        </div>

        <div className="lg:ml-auto">
          <button
            onClick={() => navigate("/patients/list")}
            className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between text-sm sm:text-base mt-3">
        <p className="text-gray-700">
          <span className="font-semibold">Consulting Doctor:</span> {patient?.consultingDoctor || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Recent Visit:</span> {patient?.recentVisit || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Upcoming Visit:</span> {patient?.upcomingVisit || "N/A"}
        </p>
      </div>
    </div>
  );

}
