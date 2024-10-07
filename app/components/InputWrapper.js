import React from 'react';

const InputWrapper = ({ label, type, value, id, onChange, required }) => (
  <div className="w-full flex flex-col gap-2">
    <label htmlFor={id} className="opacity-50">{label}</label>
    <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} className="p-2 rounded border border-white border-opacity-25 bg-transparent outline-transparent focus:outline-0 transition-all duration-300 focus:border-green-500 focus:border-opacity-80" />
  </div>
);

export default InputWrapper;