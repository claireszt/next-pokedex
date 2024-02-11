// PokemonEvolutions.js
'use client'
import { useEffect, useState } from 'react';
import { formatPokemon } from '@/backend/formatting';

function PokemonMoves({ id }) {
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
        { pokemon ? (<p>{pokemon.name} Moves</p>) : (<p>Loading...</p>) }
        
    </div>
  );
}

export default PokemonMoves;
