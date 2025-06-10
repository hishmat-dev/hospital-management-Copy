import React from 'react';

const TextArea = ({ label, name, value, onChange, rows = 3 }) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TextArea;