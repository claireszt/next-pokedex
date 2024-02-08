'use client'
import React, { useState } from 'react';

const FilterTypeComponent = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setSelectedType(value);
    onTypeChange(value);
  };

  return (
    <div>
      <label htmlFor="type">Filter by Type:</label>
      <select
        id="type"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>

      </select>
    </div>
  );
};

export default FilterTypeComponent;
