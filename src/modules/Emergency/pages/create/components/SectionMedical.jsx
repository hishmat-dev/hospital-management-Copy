

export default function SectionMedical({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Medical Assessment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint *</label>
          <textarea
            name="complaint"
            required
            rows={3}
            value={formData.complaint}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.complaint ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the main reason for emergency visit"
          />
          {errors.complaint && <p className="text-red-500 text-xs mt-1">{errors.complaint}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severity Level *</label>
          <select
            name="severity"
            required
            value={formData.severity}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.severity ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Severity</option>
            <option value="Critical">Critical - Life Threatening</option>
            <option value="High">High - Urgent Care Needed</option>
            <option value="Medium">Medium - Prompt Care</option>
            <option value="Low">Low - Non-Urgent</option>
          </select>
          {errors.severity && <p className="text-red-500 text-xs mt-1">{errors.severity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Triage Level *</label>
          <select
            name="triageLevel"
            required
            value={formData.triageLevel}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.triageLevel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Triage Level</option>
            <option value="Level 1">Level 1 - Resuscitation (0 min)</option>
            <option value="Level 2">Level 2 - Emergent (15 min)</option>
            <option value="Level 3">Level 3 - Urgent (30 min)</option>
            <option value="Level 4">Level 4 - Less Urgent (60 min)</option>
            <option value="Level 5">Level 5 - Non-Urgent (120 min)</option>
          </select>
          {errors.triageLevel && <p className="text-red-500 text-xs mt-1">{errors.triageLevel}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Arrival</label>
          <select
            name="modeOfArrival"
            value={formData.modeOfArrival}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select Mode</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Private Vehicle">Private Vehicle</option>
            <option value="Police">Police</option>
            <option value="Helicopter">Helicopter</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Referring Facility</label>
          <input
            type="text"
            name="referringFacility"
            value={formData.referringFacility}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Name of referring hospital/clinic"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
          <textarea
            name="currentMedications"
            rows={2}
            value={formData.currentMedications}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="List current medications and dosages"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            rows={2}
            value={formData.medicalHistory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Relevant medical history"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Assessment Notes</label>
          <textarea
            name="initialAssessment"
            rows={3}
            value={formData.initialAssessment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Initial nursing/physician assessment"
          />
        </div>
      </div>
    </div>
  )
}
