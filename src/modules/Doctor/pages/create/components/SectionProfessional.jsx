

export default function SectionProfessional({ formData, handleChange, errors }) {
  return (
    <div className=" text-[12px] space-y-4">
      <h3 className=" font-semibold text-gray-900 border-b pb-2">Professional Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Specialty *</label>
          <select
            name="specialty"
            required
            value={formData.specialty}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.specialty ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Surgery">Surgery</option>
          </select>
          {errors.specialty && <p className="text-red-500  mt-1">{errors.specialty}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Department *</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.department && <p className="text-red-500  mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Medical License Number *</label>
          <input
            type="text"
            name="licenseNumber"
            required
            value={formData.licenseNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.licenseNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="MD123456"
          />
          {errors.licenseNumber && <p className="text-red-500  mt-1">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Years of Experience *</label>
          <input
            type="number"
            name="experience"
            required
            value={formData.experience}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="10"
            min="0"
            max="50"
          />
          {errors.experience && <p className="text-red-500  mt-1">{errors.experience}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Qualification *</label>
          <input
            type="text"
            name="qualification"
            required
            value={formData.qualification}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.qualification ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="MD, FACC"
          />
          {errors.qualification && <p className="text-red-500  mt-1">{errors.qualification}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Shift *</label>
          <select
            name="shift"
            required
            value={formData.shift}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.shift ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Shift</option>
            <option value="Morning">Morning (7:00 AM - 3:00 PM)</option>
            <option value="Evening">Evening (3:00 PM - 11:00 PM)</option>
            <option value="Night">Night (11:00 PM - 7:00 AM)</option>
            <option value="Rotating">Rotating Shifts</option>
          </select>
          {errors.shift && <p className="text-red-500  mt-1">{errors.shift}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Board Certifications</label>
          <textarea
            name="certifications"
            rows={2}
            value={formData.certifications}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Board certifications and additional qualifications"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Areas of Expertise</label>
          <textarea
            name="expertise"
            rows={2}
            value={formData.expertise}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Specific areas of medical expertise"
          />
        </div>
      </div>
    </div>
  )
}
