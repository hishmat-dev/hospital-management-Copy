

export default function SectionContact({ formData, handleInputChange, errors }) {
  return (
    <div className="text-[12px] bg-white rounded-lg shadow p-6">
      <h3 className=" font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-gray-300 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring-gray-300 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block  font-medium text-gray-700 mb-1">Address *</label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring-gray-300 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full address"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-gray-300"
            placeholder="Enter emergency contact name"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-gray-300"
            placeholder="Enter emergency contact phone"
          />
        </div>
      </div>
    </div>
  )
}
