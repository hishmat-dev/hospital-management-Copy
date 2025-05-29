

export default function SectionContact({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Contact Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+1-555-0123"
          />
          {errors.phone && <p className="text-red-500  mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="patient@email.com"
          />
          {errors.email && <p className="text-red-500  mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block  font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter complete address"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Emergency contact name"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1-555-0124"
          />
        </div>
      </div>
    </div>
  )
}
