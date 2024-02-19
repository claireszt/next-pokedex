'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import PokemonDetails from './components/PokemonDetails';
import { formatPokemonFull, formatEvolutionChain, formatPokemonSimple } from '@/backend/formatting';

import PokemonEvolutions from './components/categories/PokemonEvolutions';
import PokemonAbilities from './components/categories/PokemonAbilities';
import PokemonDimensions from './components/categories/PokemonDimensions'

function ToggleCategory({ onClick, category, title }) {
  return (
    <button onClick={onClick} className="bg-gray-200 flex items-center justify-center">
      <span className="mr-2">{title}</span>
      {category ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
    </button>
  );
}

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = parseInt(pathname.split("/").pop());

  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedPokemon = await formatPokemonFull(id);
        setPokemon(formattedPokemon);
        const formattedEvolutionChain = await formatEvolutionChain(id);
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

  const categories = [
    {
      name: 'evolutions',
      component: <PokemonEvolutions pokemon={pokemon} evolutionChain={evolutionChain}/>
    },
    {
      name: 'abilities',
      component: <PokemonAbilities pokemon={pokemon}/>
    },
    {
      name: 'dimensions',
      component: <PokemonDimensions pokemon={pokemon}/>
    }
  ];

  const toggleCategory = (categoryName) => {
    setActiveCategory(categoryName === activeCategory ? null : categoryName);
  };

  return (
    <div>
      <button onClick={handleGoBack}>
        <ArrowLeftIcon className="w-4 h-4 inline-block align-middle mr-1" /> BACK
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center'>
        <div className='flex justify-center'>
          <PokemonDetails pokemon={pokemon} />
        </div>
        <div className='flex flex-col'>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <ToggleCategory
                category={category.name === activeCategory}
                title={category.name.toUpperCase()}
                onClick={() => toggleCategory(category.name)}
              />
              <div className='py-3 flex align-center items-center justify-center'>
                {category.name === activeCategory && category.component}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
