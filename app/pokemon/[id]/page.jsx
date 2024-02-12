'use client'
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ToggleCategory } from './components/ui/Button';
import CategoryContent from './components/categories/CategoryContent'
import PokemonDetails from './components/PokemonDetails'

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const id = pathnameParts[pathnameParts.length - 1];

  const [categories, setCategories] = useState({
    evolutions: false,
    abilities: false,
    dimensions: false,
    moves: false,
    stats: false
    
    // Add more categories here if needed
  });

  const handleGoBack = () => {
    router.back();
  };

  const toggleCategory = (category) => {
    // Create a new object to hold the updated category states
    const updatedCategories = {};

    // Iterate through all categories
    Object.keys(categories).forEach((cat) => {
      // Set the state of the current category based on whether it's the clicked category
      updatedCategories[cat] = cat === category ? !categories[category] : false;
    });

    // Update the state with the new category states
    setCategories(updatedCategories);
  };

  return (
    <div>
      <button onClick={handleGoBack}>
        <ArrowLeftIcon className="w-4 h-4 inline-block align-middle mr-1" /> BACK
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center'>
        <div className='flex justify-center'>
        <PokemonDetails id={id} />
        </div>
      <div className='flex flex-col'>
      {Object.entries(categories).map(([category, isOpen]) => (
        <React.Fragment key={category}>
          <ToggleCategory
            onClick={() => toggleCategory(category)}
            category={isOpen}
            title={category.toUpperCase()}
          />
                <div className="flex justify-center pb-5">
          {isOpen && <CategoryContent category={category} id={id} />}
          </div>

        </React.Fragment>
      ))}
      </div>
      </div>
    </div>
  );
}
