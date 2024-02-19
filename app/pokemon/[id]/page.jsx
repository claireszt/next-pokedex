'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PokemonDetails from './components/PokemonDetails';
import { formatPokemonFull, formatEvolutionChain, formatPokemonSimple } from '@/backend/formatting';

import PokemonEvolutions from './components/categories/PokemonEvolutions';
import PokemonAbilities from './components/categories/PokemonAbilities';
import PokemonDimensions from './components/categories/PokemonDimensions'

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

  const bgStyle = 'bg-white rounded-md p-5 mt-5 shadow flex flex-col justify-center items-center content-center'
  const titleStyle = 'text-xl leading-3 tracking-[0.3em]	'

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
        <div className='flex flex-col '>
          <div className={bgStyle}>
            <h2 className={titleStyle}>EVOLUTIONS</h2>
            <PokemonEvolutions pokemon={pokemon} evolutionChain={evolutionChain}/>
          </div>
          <div className={bgStyle}>
            <PokemonDimensions pokemon={pokemon} titleStyle={titleStyle}/>
          </div>
          <div className={bgStyle}>
            <h2 className={titleStyle}>ABILITIES</h2>
            <PokemonAbilities pokemon={pokemon}/>
          </div>
        </div>) : (
          <p></p>
        )}
      </div>
    </div>
  );
}