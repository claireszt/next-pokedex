import React from 'react';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const regions = [
    { label: 'Kanto', value: 1 },
    { label: 'Johto', value: 2 },
    { label: 'Hoenn', value: 3 },
    { label: 'Sinnoh', value: 4 },
    { label: 'Unova', value: 5 },
    { label: 'Kalos', value: 6 },
    { label: 'Alola', value: 7 },
    { label: 'Galar', value: 8 },
    { label: 'Paldea', value: 9 }
  ];

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">Region</label>
      <div className="radio-inputs flex flex-wrap border rounded-md bg-gray-100 p-1">
        {regions.map((region) => (
          <div key={region.value} className="radio flex-1">
            <input
              type="radio"
              id={region.value}
              name="region"
              value={region.value}
              checked={region.value === selectedRegion}
              onChange={(e) => onRegionChange(parseInt(e.target.value))}
              className="hidden"
            />
            <label
              htmlFor={region.value}
              className={`name flex justify-center items-center cursor-pointer border-radius-0.5rem ${
                region.value === selectedRegion ? 'bg-white' : ''
              }`}
            >
              {region.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionFilter;
