import React from 'react';

const InputField = ({ label, name, type, value, onChange, required = false }) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};

export default InputField;