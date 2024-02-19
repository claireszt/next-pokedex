// PokemonEvolutions.js
'use client'
import { useEffect, useState } from 'react';
import { formatEvolutionChain } from '@/backend/formatting';
import PokemonInfo from '../ui/PokemonInfo';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function PokemonEvolutions({ pokemon, evolutionChain }) {

  const isCurrentPage = (pokemonId) => {
    return pokemon.id == pokemonId;
  };

  return (
    <div className='flex'>
      {evolutionChain ? (
        <>
          <div className="flex items-center space-x-4">
          <Link href={`/pokemon/${evolutionChain.species.id}`}>
          <div className={`flex items-center space-x-4 border p-4 text-center ${isCurrentPage(evolutionChain.species.id) ? 'border-black' : 'border-transparent'}`}>
              <PokemonInfo pokemon={evolutionChain.species}/>
          </div>
          </Link>
          </div>

          {evolutionChain.evolves_to.map((evolution, index) => (
            <div key={index} className="flex items-center px-4 space-x-4">
              <div className='px-3 rounded-md bg-gray-200'>
                <p className='text-xs font-bold text-gray-00'>{evolution.trigger.trigger}</p>
              </div>
              <Link href={`/pokemon/${evolution.evolves_to.id}`}>
              <div className={`flex items-center space-x-4 border p-2 text-center ${isCurrentPage(evolution.evolves_to.id) ? 'border-black' : 'border-transparent'}`}>
                <PokemonInfo pokemon={evolution.evolves_to}/>
              </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        
          <p>Loading Evolution Chain info...</p>
        
      )}
    </div>
  );
}

export default PokemonEvolutions;
