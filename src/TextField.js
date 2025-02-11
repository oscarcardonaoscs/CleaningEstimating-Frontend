import React from "react";

const TextField = ({ label, name, value, error, onChange }) => (
  <div>
    <label className="block text-gray-700">{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-md ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default TextField;
