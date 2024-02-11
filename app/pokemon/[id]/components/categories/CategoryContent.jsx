import React from 'react';
import PokemonEvolutions from './PokemonEvolutions'
import PokemonAbilities from './PokemonAbilities'
import PokemonDimensions from './PokemonDimensions'
import PokemonMoves from './PokemonMoves'
import PokemonStats from './PokemonStats'

const categoryComponents = {
  evolutions: PokemonEvolutions,
  abilities: PokemonAbilities,
  dimensions: PokemonDimensions,
  moves: PokemonMoves,
  stats: PokemonStats,
  // Add more category components here if needed
};

const CategoryContent = ({ category, id }) => {
  // Get the corresponding component for the selected category
  const Component = categoryComponents[category];

  return <Component id={id} />;
};

export default CategoryContent;
