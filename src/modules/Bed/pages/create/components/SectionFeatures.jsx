

export default function SectionFeatures({ formData, handleChange, errors }) {
  const handleFeatureChange = (feature) => {
    const currentFeatures = formData.features || []
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature]

    handleChange({
      target: {
        name: "features",
        value: updatedFeatures,
      },
    })
  }

  const availableFeatures = [
    "Oxygen Supply",
    "Cardiac Monitor",
    "Ventilator",
    "IV Stand",
    "Bedside Table",
    "Privacy Curtain",
    "Call Button",
    "Adjustable Bed",
    "TV",
    "WiFi",
    "Air Conditioning",
    "Private Bathroom",
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Features & Equipment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate ($)</label>
          <input
            type="number"
            name="dailyRate"
            value={formData.dailyRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="150"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Occupancy</label>
          <input
            type="number"
            name="maxOccupancy"
            value={formData.maxOccupancy}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1"
            min="1"
            max="4"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableFeatures.map((feature) => (
              <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(formData.features || []).includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Additional details about the bed and room"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            name="specialInstructions"
            rows={2}
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special care instructions or restrictions"
          />
        </div>
      </div>
    </div>
  )
}
