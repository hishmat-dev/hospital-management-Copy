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
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border-b pb-3 mb-3">
                        <div className="font-medium text-gray-700">Doctor</div>
                        <div className="font-medium text-gray-700">Visit Date</div>
                        <div className="font-medium text-gray-700">Department</div>
                        <div className="font-medium text-gray-700">Fee Paid</div>
                        <div className="font-medium text-gray-700">Reports</div>
                        <div>{visit.consultingDoctor}</div>
                        <div>{visit.visitDate}</div>
                        <div>{visit.department}</div>
                        <div>${visit.feePaid}</div>
                        <div>
                            <button className="px-3 py-1 bg-primary-color text-white rounded text-sm">
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
                        <p className="font-semibold text-gray-700 mb-2">Medicines</p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {visit.medicines.map((med, idx) => (
                                <li key={idx}>
                                    <strong>{med.name}</strong> — Morning: {med.schedule.morning}, Afternoon: {med.schedule.afternoon}, Night: {med.schedule.night}
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
