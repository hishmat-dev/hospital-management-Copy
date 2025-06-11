import { Phone } from 'lucide-react';
export default function PersonalInfo({ patient, profile, navigate }) {

  return (
    <div className="bg-white shadow rounded-lg p-3 font-montserrat text-[12px]">
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

          <div >
            <p className="text-gray-500">
              <span className="font-semibold">Date of Birth:</span> {patient?.dateOfBirth || "N/A"}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Age:</span> {patient?.age || "N/A"}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500">
              <span className="font-semibold">Gender:</span> {patient?.gender}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Blood Type:</span> {patient?.bloodType || "N/A"}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500">
              <span className="font-semibold">Phone Number:</span> {patient?.phone || "N/A"}
            </p>
            
          </div>
        </div>

        <div className="lg:ml-auto">
          <button
            onClick={() => navigate("/hospital/patients/list")}
            className="bg-primary-color font-montserrat text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-col lg:flex-row justify-between  mt-3">
        <p className="text-gray-500">
          <span className="font-semibold">Consulting Doctor:</span> {patient?.consultingDoctor || "N/A"}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Recent Visit:</span> {patient?.recentVisit || "N/A"}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Upcoming Visit:</span> {patient?.upcomingVisit || "N/A"}
        </p>
      </div>
    </div>
  );

}
