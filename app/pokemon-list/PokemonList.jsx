'use client'
import React, { useState, useEffect, Suspense } from 'react';
import PokemonCard from './pokemonCard';
import Loading from '../loading';
import FilterGenerationComponent from './filters/FilterGenerationComponent'
import { fetchByGen } from '@/backend/fetch';

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [generationFilter, setGenerationFilter] = useState('');

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage, generationFilter]); // Include generationFilter in the dependency array

  const fetchPokemonData = async (page) => {
    setIsLoading(true);
    try {
      const pokemonIds = await fetchByGen(generationFilter);
      
      // Divide the array of Pokémon IDs into pages of 9 IDs each
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
    setCurrentPage(1); // Reset currentPage when generation filter changes
    setGenerationFilter(selectedGeneration);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        {/* Filter components */}
        <FilterGenerationComponent onGenerationChange={handleGenerationChange} />
        {/* You can add more filter components here */}
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
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                className="mx-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
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
