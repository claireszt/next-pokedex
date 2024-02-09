import React from 'react';
import { TypePill } from '../../ui/type-pills';

function TypeFilter({ selectedType, onTypeChange }) {
  const types = [
    { label: 'Fire', value: 'fire' },
    { label: 'Water', value: 'water' },
    { label: 'Grass', value: 'grass' },
    { label: 'Electric', value: 'electric' },
    { label: 'Ground', value: 'ground' },
    { label: 'Rock', value: 'rock' },
    { label: 'Poison', value: 'poison' },
    { label: 'Bug', value: 'bug' },
    { label: 'Dragon', value: 'dragon' },
    { label: 'Psychic', value: 'psychic' },
    { label: 'Flying', value: 'flying' },
    { label: 'Fighting', value: 'fighting' },
    { label: 'Normal', value: 'normal' },
    { label: 'Dark', value: 'dark' },
    { label: 'Ghost', value: 'ghost' },
    { label: 'Ice', value: 'ice' },
    { label: 'Fairy', value: 'fairy' },
    { label: 'Steel', value: 'steel' }
  ];

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
      <div className="flex flex-wrap">
        {types.map((type) => (
          <div key={type.value} className="m-1">
            <input
              type="radio"
              id={type.value}
              name="type"
              value={type.value}
              checked={type.value === selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="hidden"
            />
            <label htmlFor={type.value} className="cursor-pointer">
              <TypePill type={type.value} size={type.value === selectedType ? 'md' : 'sm'}/>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeFilter;
