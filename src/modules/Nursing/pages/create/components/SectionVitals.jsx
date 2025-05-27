

export default function SectionVitals({ formData, handleChange, errors, patients = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vital Signs Recording</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient *</label>
          <select
            name="patientId"
            required
            value={formData.patientId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.patientId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} ({patient.id}) - Room {patient.roomNumber || "N/A"}
              </option>
            ))}
          </select>
          {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recording Time *</label>
          <input
            type="datetime-local"
            name="recordedAt"
            required
            value={formData.recordedAt}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.recordedAt ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.recordedAt && <p className="text-red-500 text-xs mt-1">{errors.recordedAt}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure *</label>
          <input
            type="text"
            name="bloodPressure"
            required
            value={formData.bloodPressure}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.bloodPressure ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="120/80"
          />
          {errors.bloodPressure && <p className="text-red-500 text-xs mt-1">{errors.bloodPressure}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (bpm) *</label>
          <input
            type="number"
            name="heartRate"
            required
            value={formData.heartRate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.heartRate ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="72"
            min="30"
            max="200"
          />
          {errors.heartRate && <p className="text-red-500 text-xs mt-1">{errors.heartRate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F) *</label>
          <input
            type="number"
            name="temperature"
            required
            value={formData.temperature}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.temperature ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="98.6"
            min="90"
            max="110"
            step="0.1"
          />
          {errors.temperature && <p className="text-red-500 text-xs mt-1">{errors.temperature}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate (/min) *</label>
          <input
            type="number"
            name="respiratoryRate"
            required
            value={formData.respiratoryRate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.respiratoryRate ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="16"
            min="8"
            max="40"
          />
          {errors.respiratoryRate && <p className="text-red-500 text-xs mt-1">{errors.respiratoryRate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation (%) *</label>
          <input
            type="number"
            name="oxygenSaturation"
            required
            value={formData.oxygenSaturation}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.oxygenSaturation ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="98"
            min="70"
            max="100"
          />
          {errors.oxygenSaturation && <p className="text-red-500 text-xs mt-1">{errors.oxygenSaturation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pain Scale (0-10)</label>
          <select
            name="painScale"
            value={formData.painScale}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Pain Level</option>
            <option value="0">0 - No Pain</option>
            <option value="1">1 - Minimal</option>
            <option value="2">2 - Mild</option>
            <option value="3">3 - Uncomfortable</option>
            <option value="4">4 - Moderate</option>
            <option value="5">5 - Distracting</option>
            <option value="6">6 - Distressing</option>
            <option value="7">7 - Unmanageable</option>
            <option value="8">8 - Intense</option>
            <option value="9">9 - Severe</option>
            <option value="10">10 - Unable to Move</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="70"
            min="0"
            max="500"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="170"
            min="0"
            max="250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Glucose (mg/dL)</label>
          <input
            type="number"
            name="bloodGlucose"
            value={formData.bloodGlucose}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="100"
            min="0"
            max="600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recorded By *</label>
          <input
            type="text"
            name="recordedBy"
            required
            value={formData.recordedBy}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.recordedBy ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nurse name"
          />
          {errors.recordedBy && <p className="text-red-500 text-xs mt-1">{errors.recordedBy}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Additional observations or notes"
          />
        </div>
      </div>
    </div>
  )
}
