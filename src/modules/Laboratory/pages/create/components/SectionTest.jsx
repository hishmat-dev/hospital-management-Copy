import { useState, useEffect } from "react";
import { createConfig } from "../create.config";

export default function SectionTest({ doctors = [], testCategories = [], onAddTest }) {
  const [testData, setTestData] = useState({
    testCategory: "",
    testType: "",
    customTestName: "",
    orderingDoctor: "",
    priority: "",
    sampleType: "",
    expectedDuration: "",
    clinicalInfo: "",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState({});

  // Reset testData when component mounts
  useEffect(() => {
    setTestData({
      testCategory: "",
      testType: "",
      customTestName: "",
      priority: "",
      sampleType: "",
      expectedDuration: "",
      clinicalInfo: "",
      specialInstructions: "",
    });
    setErrors({});
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));

    // Clear errors for the changed field
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Reset testType if testCategory changes
    if (name === "testCategory") {
      setTestData((prev) => ({ ...prev, testType: "", customTestName: "" }));
    }

    // Reset customTestName if testType is not Custom
    if (name === "testType" && value !== "Custom") {
      setTestData((prev) => ({ ...prev, customTestName: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!testData.testCategory) newErrors.testCategory = "Test Category is required";
    if (!testData.testType) newErrors.testType = "Specific Test is required";
    if (testData.testType === "Custom" && !testData.customTestName)
      newErrors.customTestName = "Custom Test Name is required";
    if (!testData.priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding test
  const handleAdd = () => {
    if (validateForm()) {
      onAddTest(testData);
      // Reset form
      setTestData({
        testCategory: "",
        testType: "",
        customTestName: "",
        priority: "",
        sampleType: "",
        expectedDuration: "",
        clinicalInfo: "",
        specialInstructions: "",
      });
      setErrors({});
    }
  };

  // Get test types for the selected category
  const selectedTestTypes = createConfig.testTypes[testData.testCategory] || [];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Test Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Test Category *</label>
          <select
            name="testCategory"
            required
            value={testData.testCategory}
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
            value={testData.testType}
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

        {testData.testType === "Custom" && (
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Custom Test Name *</label>
            <input
              type="text"
              name="customTestName"
              required
              placeholder="Enter custom test name"
              value={testData.customTestName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.customTestName && <p className="text-red-500 mt-1">{errors.customTestName}</p>}
          </div>
        )}


        <div>
          <label className="block font-medium text-gray-700 mb-1">Priority *</label>
          <select
            name="priority"
            required
            value={testData.priority}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.priority ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Priority</option>
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
            value={testData.sampleType}
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
            value={testData.expectedDuration || ""}
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

        <div className="md:col-span-3">
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Clinical Information</label>
            <textarea
              name="clinicalInfo"
              rows={3}
              value={testData.clinicalInfo || ""}
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
              value={testData.specialInstructions || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special instructions for sample collection or processing"
            />
          </div>
        </div>
      </div>

      {/* Add Test Button */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Test
        </button>
        <button
          type="button"
          onClick={() => onAddTest(null)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}