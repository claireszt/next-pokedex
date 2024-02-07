// PokemonEvolutions.js
import { useEffect, useState } from 'react';
import { formatEvolutionChain } from '@/backend/formatting';
import PokemonInfo from './PokemonInfo';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function PokemonEvolutions({ id }) {
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedEvolutionChain = await formatEvolutionChain(id);
        setEvolutionChain(formattedEvolutionChain);
      } catch (error) {
        console.error('Error fetching Pokemon evolution data:', error);
      }
    };

    fetchData();
  }, [id]);

  const isCurrentPage = (pokemonId) => {
    return id == pokemonId;
  };

  return (
    <div className="flex">
      {evolutionChain ? (
        <>
          <div className="flex items-center space-x-4">
            <Link href={`/pokemon/${evolutionChain.species.id}`}>
          <div className={`flex items-center space-x-4 border p-4 text-center ${isCurrentPage(evolutionChain.species.id) ? 'border-black' : 'border-transparent'}`}>
              <PokemonInfo id={evolutionChain.species.id}/>
          </div>
          </Link>
          </div>

          {evolutionChain.evolves_to.map((evolution, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div>
                <p>{evolution.trigger.trigger}</p>
                <ArrowLongRightIcon/>
              </div>
              <Link href={`/pokemon/${evolution.evolves_to.id}`}>
              <div className={`flex items-center space-x-4 border p-4 text-center ${isCurrentPage(evolution.evolves_to.id) ? 'border-black' : 'border-transparent'}`}>
                <PokemonInfo id={evolution.evolves_to.id}/>
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
