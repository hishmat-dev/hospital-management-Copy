const PatientVisits = ({ patient }) => {
    // console.log("Patient Visits", patient);
    return (
        <div className="p-4 rounded-lg shadow-md bg-white text-[12px]">
            <h2 className="font-semibold text-gray-800 mb-4">Patient Visits</h2>
            {patient.visits.map((visit, index) => (
                <div
                    key={index}
                    className="p-4 "
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 border-b pb-3 mb-3">
                        {/* Doctor */}
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Doctor</p>
                            <p>{visit.consultingDoctor}</p>
                        </div>

                        {/* Visit Date */}
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Visit Date</p>
                            <p>{visit.visitDate}</p>
                        </div>

                        {/* Department */}
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Department</p>
                            <p>{visit.department}</p>
                        </div>

                        {/* Fee Paid */}
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Fee Paid</p>
                            <p>${visit.feePaid}</p>
                        </div>

                        {/* Reports */}
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Reports</p>
                            <button className="px-3 py-1 bg-primary-color text-white rounded text-sm hover:bg-primary-color-dark transition">
                                View Reports
                            </button>
                        </div>
                    </div>


                    <div className="mb-3">
                        <p className="font-semibold text-gray-700 mb-1">Prescription</p>
                        <p className="text-gray-600">{visit.prescription}</p>
                    </div>

                    <div className="mb-3">
                        <p className="font-semibold text-gray-700 mb-1">Reports</p>
                        <div className="text-gray-600 flex flex-col sm:flex-row gap-3 sm:gap-6">
                            <span>Weight: {visit.reports.weight}</span>
                            <span>Blood Pressure: {visit.reports.bloodPressure}</span>
                            <span>Sugar Before: {visit.reports.sugarBefore}</span>
                            <span>Sugar After: {visit.reports.sugarAfter}</span>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-700 mb-4">Medicines</p>
                        <ul className="flex flex-wrap gap-6 pl-6 text-gray-700">
                            {visit.medicines.map((med, idx) => (
                                <li key={idx} className="flex flex-col w-full sm:w-auto">
                                    <strong className="mb-1">
                                        {idx + 1}. <span className="ml-1">{med.name}</span>
                                    </strong>
                                    <span className="text-sm">
                                        Morning: {med.schedule.morning}, Afternoon: {med.schedule.afternoon}, Night: {med.schedule.night}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default PatientVisits;
