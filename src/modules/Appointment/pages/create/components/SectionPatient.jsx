import { useState } from "react";

export default function SectionPatient({ formData, handleChange, errors, patients = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    handleChange({ target: { name: "patientId", value: patient.id } });
    handleChange({ target: { name: "patientContact", value: patient.phone } });
    setSearchTerm(patient.name);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4 text-[12px]">
      <h3 className=" font-semibold text-gray-900 border-b pb-2">Patient Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Patient by Name */}
        <div className="relative">
          <label className="block  font-medium text-gray-700 mb-1">Patient Name *</label>
          <input
            type="text"
            name="patientSearch"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
              handleChange({ target: { name: "patientId", value: "" } }); // reset selection
              handleChange({ target: { name: "patientContact", value: "" } }); // reset contact
            }}
            className={`w-full px-3 py-2 rounded-lg border  focus:ring-gray-500  ${errors.patientId ? "border-red-500" : "border-gray-300"
              } transition-colors`}
            placeholder="Enter patient name"
            autoComplete="off"
          />

          {showSuggestions && searchTerm && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow max-h-40 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <li
                    key={patient.id}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer "
                    onClick={() => handlePatientSelect(patient)}
                  >
                    {patient.name} ({patient.id}) - {patient.department}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2  text-gray-500">No patient found</li>
              )}
            </ul>
          )}
          {errors.patientId && <p className="text-red-500  mt-1">{errors.patientId}</p>}
        </div>

        {/* Auto-filled contact */}
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Patient Contact</label>
          <input
            type="text"
            name="patientContact"
            value={formData.patientContact}
            onChange={handleChange}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            placeholder="Patient phone number"
          />
        </div>

        {/* Complaint */}
        <div className="md:col-span-2">
          <label className="block  font-medium text-gray-700 mb-1">Chief Complaint</label>
          <textarea
            name="chiefComplaint"
            rows={2}
            value={formData.chiefComplaint}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of patient's main concern"
          />
        </div>
      </div>
    </div>
  );
}
