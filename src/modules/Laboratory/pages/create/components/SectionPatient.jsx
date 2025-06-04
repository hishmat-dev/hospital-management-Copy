// components/SectionPatient.jsx
import { useState } from "react";

export default function SectionPatient({ formData, handleChange, errors, patients = [] }) {
  const [patientSuggestions, setPatientSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle patient name input and filter suggestions
  const handlePatientInput = (e) => {
    const value = e.target.value;
    handleChange({ target: { name: "patientName", value } });

    // Filter patients based on input
    if (value.length > 0) {
      const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(value.toLowerCase())
      );
      setPatientSuggestions(filteredPatients);
      setShowSuggestions(true);
    } else {
      setPatientSuggestions([]);
      setShowSuggestions(false);
      // Clear patient-related fields when input is cleared
      handleChange({ target: { name: "patientId", value: "" } });
      handleChange({ target: { name: "patientAge", value: "" } });
      handleChange({ target: { name: "patientGender", value: "" } });
      handleChange({ target: { name: "department", value: "" } });
    }
  };

  // Handle suggestion selection
  const handleSelectPatient = (patient) => {
    handleChange({ target: { name: "patientId", value: patient.id } });
    handleChange({ target: { name: "patientName", value: patient.name } });
    handleChange({ target: { name: "patientAge", value: patient.age } });
    handleChange({ target: { name: "patientGender", value: patient.gender } });
    handleChange({ target: { name: "department", value: patient.department } });
    setPatientSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Patient Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block font-medium text-gray-700 mb-1">Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handlePatientInput}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={`w-full px-3 py-2 border rounded-lg  focus:border-transparent ${
              errors.patientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Start typing patient name..."
            required
          />
          {errors.patientName && (
            <p className="text-red-500 mt-1">{errors.patientName}</p>
          )}
          {showSuggestions && patientSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {patientSuggestions.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {patient.name} ({patient.id}) - {patient.department}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Patient Age</label>
          <input
            type="text"
            name="patientAge"
            value={formData.patientAge}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient age"
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Patient Gender</label>
          <input
            type="text"
            name="patientGender"
            value={formData.patientGender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient gender"
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient department"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}