

export default function SectionVitals({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vital Signs</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="120/80"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (bpm)</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="72"
            min="0"
            max="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="98.6"
            min="90"
            max="110"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate (/min)</label>
          <input
            type="number"
            name="respiratoryRate"
            value={formData.respiratoryRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="16"
            min="0"
            max="60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation (%)</label>
          <input
            type="number"
            name="oxygenSaturation"
            value={formData.oxygenSaturation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="98"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pain Scale (0-10)</label>
          <select
            name="painScale"
            value={formData.painScale}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Glasgow Coma Scale</label>
          <input
            type="number"
            name="glasgowComaScale"
            value={formData.glasgowComaScale}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="15"
            min="3"
            max="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="170"
            min="0"
            max="250"
          />
        </div>
      </div>
    </div>
  )
}
