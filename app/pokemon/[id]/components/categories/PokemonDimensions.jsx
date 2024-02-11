// PokemonEvolutions.js
'use client'
import { useEffect, useState } from 'react';
import { formatPokemon } from '@/backend/formatting';

function PokemonDimensions({ id }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const formattedPokemon = await formatPokemon(id);
          setPokemon(formattedPokemon);
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      };
  
      fetchData();
    }, [id]);

  return (
    <div>
        { pokemon ? (<p>{pokemon.name} Dimensions</p>) : (<p>Loading...</p>) }
        
    </div>
  );
}

export default PokemonDimensions;
