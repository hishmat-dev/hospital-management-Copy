// components/SectionTest.jsx
import { useState } from "react";
import { createConfig } from "../create.config"; // Import createConfig for testTypes

export default function SectionTest({ formData, handleChange, errors, doctors = [], testCategories = [] }) {
  const [doctorSuggestions, setDoctorSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle doctor name input and filter suggestions
  const handleDoctorInput = (e) => {
    const value = e.target.value;
    handleChange({ target: { name: "orderingDoctor", value } });

    // Filter doctors based on input
    if (value.length > 0) {
      const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(value.toLowerCase())
      );
      setDoctorSuggestions(filteredDoctors);
      setShowSuggestions(true);
    } else {
      setDoctorSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectDoctor = (doctor) => {
    handleChange({ target: { name: "orderingDoctor", value: doctor.name } });
    setDoctorSuggestions([]);
    setShowSuggestions(false);
  };

  // Get test types for the selected category
  const selectedTestTypes = createConfig.testTypes[formData.testCategory] || [];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Test Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Test Category *</label>
          <select
            name="testCategory"
            required
            value={formData.testCategory}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.testCategory ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Test Category</option>
            {testCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.testCategory && <p className="text-red-500 mt-1">{errors.testCategory}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Specific Test *</label>
          <select
            name="testType"
            required
            value={formData.testType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.testType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Test</option>
            {selectedTestTypes.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
            <option value="Custom">Custom Test</option>
          </select>
          {errors.testType && <p className="text-red-500 mt-1">{errors.testType}</p>}
        </div>

        {formData.testType === "Custom" && (
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Custom Test Name *</label>
            <input
              type="text"
              name="customTestName"
              required
              placeholder="Enter custom test name"
              value={formData.customTestName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.customTestName && <p className="text-red-500 mt-1">{errors.customTestName}</p>}
          </div>
        )}

        <div className="relative">
          <label className="block font-medium text-gray-700 mb-1">Ordered By *</label>
          <input
            type="text"
            name="orderingDoctor"
            value={formData.orderingDoctor}
            onChange={handleDoctorInput}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.orderingDoctor ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Start typing doctor name..."
            required
          />
          {errors.orderingDoctor && (
            <p className="text-red-500 mt-1">{errors.orderingDoctor}</p>
          )}
          {showSuggestions && doctorSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {doctorSuggestions.map((doctor) => (
                <li
                  key={doctor.id}
                  onClick={() => handleSelectDoctor(doctor)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {doctor.name} - {doctor.specialty}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Priority *</label>
          <select
            name="priority"
            required
            value={formData.priority}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.priority ? "border-red-500" : "border-gray-300"
            }`}
          >
            {createConfig.priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          {errors.priority && <p className="text-red-500 mt-1">{errors.priority}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Sample Type</label>
          <select
            name="sampleType"
            value={formData.sampleType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Sample Type</option>
            {createConfig.sampleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Expected Duration</label>
          <select
            name="expectedDuration"
            value={formData.expectedDuration || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Duration</option>
            <option value="1-2 hours">1-2 hours</option>
            <option value="4-6 hours">4-6 hours</option>
            <option value="1 day">1 day</option>
            <option value="2-3 days">2-3 days</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Clinical Information</label>
          <textarea
            name="clinicalInfo"
            rows={3}
            value={formData.clinicalInfo || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Relevant clinical history, symptoms, or diagnosis"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            name="specialInstructions"
            rows={2}
            value={formData.specialInstructions || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special instructions for sample collection or processing"
          />
        </div>
      </div>
    </div>
  );
}