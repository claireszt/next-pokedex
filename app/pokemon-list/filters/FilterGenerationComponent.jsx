'use client'
import React, { useState } from 'react';

const FilterGenerationComponent = ({ onGenerationChange }) => {
  const [selectedGeneration, setSelectedGeneration] = useState('');

  const handleGenerationChange = (event) => {
    const { value } = event.target;
    setSelectedGeneration(value);
    onGenerationChange(value);
  };

  return (
    <div>
      <label htmlFor="generation">Filter by Generation:</label>
      <select
        id="generation"
        value={selectedGeneration}
        onChange={handleGenerationChange}
      >
        <option value="">All</option>
        <option value="1">Generation 1</option>
        <option value="2">Generation 2</option>
        <option value="3">Generation 3</option>
        {/* Add more options for other generations */}
      </select>
    </div>
  );
};

export default FilterGenerationComponent;
