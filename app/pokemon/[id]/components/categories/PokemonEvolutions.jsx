// PokemonEvolutions.js
'use client'
import PokemonInfo from '../ui/PokemonInfo';
import Link from 'next/link';

function PokemonEvolutions({ pokemon, evolutionChain }) {

  const isCurrentPage = (pokemonId) => {
    return pokemon.id == pokemonId;
  };

  return (
    <div className='flex'>
      {evolutionChain.evolves_to.length > 0 ? (
        <>
          <div className="flex items-center space-x-4">
            <Link href={`/pokemon/${evolutionChain.species.id}`}>
              <div className={`flex items-center space-x-4 p-4 text-center border-2 ${isCurrentPage(evolutionChain.species.id) ? `border-gray-200 rounded-full` : 'border-white'}`}>
                <PokemonInfo pokemon={evolutionChain.species}/>
              </div>
            </Link>
          </div>

          {evolutionChain.evolves_to.map((evolution, index) => (
            <div key={index} className="flex items-center px-4 space-x-4">
              <div className={`px-3 rounded-md bg-${pokemon.type1} bg-opacity-20`}>
                <p className='text-xs font-bold text-gray-900'>{evolution.trigger.trigger}</p>
              </div>
              <Link href={`/pokemon/${evolution.evolves_to.id}`}>
                <div className={`flex items-center space-x-4 p-2 text-center border-2 ${isCurrentPage(evolution.evolves_to.id) ? `border-gray-200 rounded-full` : 'border-white'}`}>
                  <PokemonInfo pokemon={evolution.evolves_to}/>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonEvolutions;
