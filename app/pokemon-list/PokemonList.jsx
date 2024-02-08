'use client'
import React, { useState, useEffect, Suspense } from 'react';
import PokemonCard from './pokemonCard';
import Loading from '../loading';
import FilterComponent from './filters/FilterComponent';
import { fetchAllPokemons, fetchByGen, fetchByType } from '@/backend/fetch'; // Update the path accordingly

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generationFilter, setGenerationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage, generationFilter, typeFilter]);

  const fetchPokemonData = async (page) => {
    setIsLoading(true);
    try {
      let pokemonIds = [];
      if (generationFilter) {
        pokemonIds = await fetchByGen(generationFilter);
      } else if (typeFilter) {
        pokemonIds = await fetchByType(typeFilter);
      } else {
        pokemonIds = await fetchAllPokemons();
      }
      
      const offsetStart = (page - 1) * 9;
      const offsetEnd = offsetStart + 9;
      const slicedPokemonIds = pokemonIds.slice(offsetStart, offsetEnd);

      setPokemonIds(slicedPokemonIds);
      setCount(pokemonIds.length);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerationChange = (selectedGeneration) => {
    setCurrentPage(1);
    setGenerationFilter(selectedGeneration);
    setTypeFilter('');
  };

  const handleTypeChange = (selectedType) => {
    setCurrentPage(1);
    setTypeFilter(selectedType);
    setGenerationFilter('');
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const generationOptions = [
    { label: 'Generation 1', value: '1' },
    { label: 'Generation 2', value: '2' },
    { label: 'Generation 3', value: '3' },
    // Add more options for other generations
  ];

  const typeOptions = [
    { label: 'Fire', value: 'fire' },
    { label: 'Water', value: 'water' },
    { label: 'Grass', value: 'grass' },
    // Add more options for other types
  ];

  return (
    <div>
      <div>
        <FilterComponent
          label="Generation"
          options={generationOptions}
          selectedValue={generationFilter}
          onChange={handleGenerationChange}
        />
        <FilterComponent
          label="Type"
          options={typeOptions}
          selectedValue={typeFilter}
          onChange={handleTypeChange}
        />
      </div>
      <Suspense fallback={<Loading />}>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {pokemonIds.map((id) => (
                <PokemonCard key={id} id={id} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="mx-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={pokemonIds.length < 9}
                className="mx-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default PokemonList;
