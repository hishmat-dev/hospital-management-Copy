export default function SectionFeatures({ formData, handleChange, errors }) {
  const availableFeatures = [
    { name: "Oxygen Supply", price: 50.00 },
    { name: "Cardiac Monitor", price: 75.00 },
    { name: "Ventilator", price: 100.00 },
    { name: "IV Stand", price: 20.00 },
    { name: "Bedside Table", price: 15.00 },
    { name: "Privacy Curtain", price: 10.00 },
    { name: "Call Button", price: 5.00 },
    { name: "Adjustable Bed", price: 30.00 },
    { name: "TV", price: 25.00 },
    { name: "WiFi", price: 15.00 },
    { name: "Air Conditioning", price: 20.00 },
    { name: "Private Bathroom", price: 50.00 },
  ]

  const handleFeatureChange = (featureName) => {
    const currentFeatures = formData.features || []
    const updatedFeatures = currentFeatures.includes(featureName)
      ? currentFeatures.filter((f) => f !== featureName)
      : [...currentFeatures, featureName]

    handleChange({
      target: {
        name: "features",
        value: updatedFeatures,
      },
    })
  }

  // Calculate total daily amount (base rate + selected features)
  const calculateTotalDailyAmount = () => {
    const baseRate = parseFloat(formData.dailyRate) || 0
    const featuresCost = (formData.features || []).reduce((total, featureName) => {
      const feature = availableFeatures.find((f) => f.name === featureName)
      return total + (feature ? feature.price : 0)
    }, 0)
    return (baseRate + featuresCost).toFixed(2)
  }

  return (
    <div className="space-y-2 text-[12px]">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Features & Equipment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-2">Available Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableFeatures.map((feature) => (
              <label key={feature.name} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(formData.features || []).includes(feature.name)}
                  onChange={() => handleFeatureChange(feature.name)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {feature.name} (Rs: {feature.price.toFixed(2)})
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Base Daily Rate (Rs)</label>
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
          <label className="block font-medium text-gray-700 mb-1">Total Daily Amount (Rs)</label>
          <input
            type="text"
            value={calculateTotalDailyAmount()}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
            placeholder="Calculated total"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Description</label>
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
          <label className="block font-medium text-gray-700 mb-1">Special Instructions</label>
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