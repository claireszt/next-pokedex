// FilterComponent.jsx
import React from 'react';

const FilterComponent = ({ label, options, selectedValue, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select id={label} value={selectedValue} onChange={handleChange}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
