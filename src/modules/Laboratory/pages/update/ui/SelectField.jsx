import React from 'react';

const SelectField = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required={required}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;