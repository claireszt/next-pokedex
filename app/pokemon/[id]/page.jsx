'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PokemonDetails from './components/PokemonDetails';
import { formatPokemonFull, formatEvolutionChain, formatPokemonSimple } from '@/backend/formatting';
import Loading from './loading'

import PokemonEvolutions from './components/categories/PokemonEvolutions';
import PokemonAbilities from './components/categories/PokemonAbilities';
import PokemonDimensions from './components/categories/PokemonDimensions';
import PokemonStats from './components/categories/PokemonStats'

import { Title } from './components/ui/Title'

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = parseInt(pathname.split("/").pop());

  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching both formattedPokemon and formattedEvolutionChain in parallel
        const [formattedPokemon, formattedEvolutionChain] = await Promise.all([
          formatPokemonFull(id),
          formatEvolutionChain(id)
        ]);
        
        // Setting the state with the fetched data
        setPokemon(formattedPokemon);
        setEvolutionChain(formattedEvolutionChain);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
  
    fetchData();
  }, [id]);
  

  const handleGoBack = () => {
    router.back();
  };

  const bgStyle = 'bg-white rounded-md p-5 mt-5 shadow flex flex-col justify-center items-center content-center gap-4'

  return (
    <div>
      <button onClick={handleGoBack}>
        <ArrowLeftIcon className="w-4 h-4 inline-block align-middle mr-1" /> BACK
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center'>
        <div className={bgStyle}>
          <PokemonDetails pokemon={pokemon} />
        </div>
        {pokemon && evolutionChain ? (
        <div className='flex flex-col'>
          <div className={bgStyle}>
          <Title info={'evolutions'} />
            <PokemonEvolutions pokemon={pokemon} evolutionChain={evolutionChain}/>
          </div>
          <div className={bgStyle}>
            <PokemonDimensions pokemon={pokemon}/>
          </div>
          <div className={bgStyle}>
          <Title info={'abilities'} />
            <PokemonAbilities pokemon={pokemon}/>
          </div>
          <div className={bgStyle}>
          <Title info={'stats'} />
            <PokemonStats pokemon={pokemon}/>
          </div>
        </div>) : (
                <div className={bgStyle}>
        <p>Loading Pokemon info...</p>
          </div>
        )}
      </div>
    </div>
  );
}