const FormFields = ({ formData, handleChange, formConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {formConfig.inputFields.map(([label, name, type]) => (
        <div key={name}>
          <label className="block font-medium text-gray-700 mb-2">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required={["patientName", "patientId", "doctorName"].includes(name)}
            {...(name === "payment" && { min: "0", step: "1" })}
          />
        </div>
      ))}

      {formConfig.selectFields.map(([label, name, options]) => (
        <div key={name}>
          <label className="block font-medium text-gray-700 mb-2">{label}</label>
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required={["testType", "category"].includes(name)}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FormFields;