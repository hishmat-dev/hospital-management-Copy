

export default function SectionTest({ formData, handleChange, errors, doctors = [], testCategories = {} }) {
  const selectedCategory = testCategories[formData.testType] || []

  return (
    <div className="space-y-4">
      <h3 className=" font-semibold text-gray-900 border-b pb-2">Test Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Test Category *</label>
          <select
            name="testType"
            required
            value={formData.testType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.testType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Test Category</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Radiology">Radiology</option>
            <option value="Pathology">Pathology</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Immunology">Immunology</option>
          </select>
          {errors.testType && <p className="text-red-500  mt-1">{errors.testType}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Specific Test *</label>
          <select
            name="testName"
            required
            value={formData.testName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.testName ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Test</option>
            {selectedCategory.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
            <option value="Custom">Custom Test</option>
          </select>
          {errors.testName && <p className="text-red-500  mt-1">{errors.testName}</p>}
        </div>

        {formData.testName === "Custom" && (
          <div className="md:col-span-2">
            <label className="block  font-medium text-gray-700 mb-1">Custom Test Name *</label>
            <input
              type="text"
              name="customTestName"
              required
              placeholder="Enter custom test name"
              value={formData.customTestName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Ordered By *</label>
          <select
            name="orderedBy"
            required
            value={formData.orderedBy}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.orderedBy ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
          {errors.orderedBy && <p className="text-red-500  mt-1">{errors.orderedBy}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Priority *</label>
          <select
            name="priority"
            required
            value={formData.priority}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.priority ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="STAT">STAT (Immediate)</option>
            <option value="Routine">Routine</option>
          </select>
          {errors.priority && <p className="text-red-500  mt-1">{errors.priority}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Sample Type</label>
          <select
            name="sampleType"
            value={formData.sampleType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Sample Type</option>
            <option value="Blood">Blood</option>
            <option value="Urine">Urine</option>
            <option value="Stool">Stool</option>
            <option value="Saliva">Saliva</option>
            <option value="Tissue">Tissue</option>
            <option value="Swab">Swab</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Expected Duration</label>
          <select
            name="expectedDuration"
            value={formData.expectedDuration}
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
          <label className="block  font-medium text-gray-700 mb-1">Clinical Information</label>
          <textarea
            name="clinicalInfo"
            rows={3}
            value={formData.clinicalInfo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Relevant clinical history, symptoms, or diagnosis"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block  font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            name="instructions"
            rows={2}
            value={formData.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special instructions for sample collection or processing"
          />
        </div>
      </div>
    </div>
  )
}
