// PokemonEvolutions.js
'use client'
import PokemonInfo from '../ui/PokemonInfo';
import Link from 'next/link';

import { CategDetail } from '../ui/CategDetails';

function PokemonEvolutions({ pokemon, evolutionChain }) {

  const isCurrentPage = (pokemonId) => {
    return pokemon.id == pokemonId;
  };

  const selectedStyle = `border-${pokemon.type1} rounded-full`

  return (
    <div className='flex gap-4'>
      {evolutionChain.evolves_to.length > 0 ? (
        <>
          <Link href={`/pokemon/${evolutionChain.species.id}`}>
            <div className={`flex items-center space-x-4 text-center border-2 ${isCurrentPage(evolutionChain.species.id) ? selectedStyle : 'border-transparent'}`}>
              <PokemonInfo pokemon={evolutionChain.species}/>
            </div>
          </Link>
  
          {evolutionChain.evolves_to.map((evolution, index) => (
            <div key={index} className="flex items-center space-x-4">
              <CategDetail info={evolution.trigger.trigger} color={pokemon.type1} size={'sm'} />
              <Link href={`/pokemon/${evolution.evolves_to.id}`}>
                <div className={`flex items-center text-center border-2 ${isCurrentPage(evolution.evolves_to.id) ? selectedStyle : 'border-transparent'}`}>
                  <PokemonInfo pokemon={evolution.evolves_to}/>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div>
          <p>This Pokémon has no evolution.</p>
        </div>
      )}
    </div>
  );  
}

export default PokemonEvolutions;
