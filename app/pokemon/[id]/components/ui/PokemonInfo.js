// PokemonInfo.js
'use client'
import { useEffect, useState } from 'react';
import { formatPokemon } from '@/backend/formatting';
import Image from 'next/image';

import { TypePill } from "../../../../ui/type-pills"

function PokemonInfo({ id }) {
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

  const imageSize = 80;


  return (
    <div>
      {pokemon ? (
        <>
          <p>#{pokemon.id.toString().padStart(3, '0')}</p>
          <p>{pokemon.name}</p>
          <Image
              src={pokemon.sprite['official']}
              alt={`${pokemon.name} sprite`}
              width={imageSize}
              height={imageSize}
            />
          <TypePill type={pokemon.type1} size={'md'} />
          {pokemon.type2 ? (
              <TypePill type={pokemon.type2} size={'md'}/>
          ) : <p></p>
          }
        </>
      ) : (
        <p>Loading Pokemon info...</p>
      )}
    </div>
  );
}

export default PokemonInfo;