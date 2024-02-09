'use client'
import React, { useState, useEffect, Suspense } from 'react';
import PokemonCard from './pokemonCard';
import Loading from '../loading';
import RegionFilter from './filters/RegionFilter';
import TypeFilter from './filters/TypeFilter';
import { fetchAllPokemons, fetchByGen, fetchByType } from '@/backend/fetch'; // Update the path accordingly

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [regionFilter, setRegionFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage, regionFilter, typeFilter]);

  const fetchPokemonData = async (page) => {
    setIsLoading(true);
    try {
      let pokemonIds = [];

      if (regionFilter && !typeFilter) {
        pokemonIds = await fetchByGen(regionFilter);
      } else if (!regionFilter && typeFilter) {
        pokemonIds = await fetchByType(typeFilter);
      } else if (regionFilter && typeFilter) {
        const regionPokemonIds = await fetchByGen(regionFilter);
        const typePokemonIds = await fetchByType(typeFilter);
        // Find the intersection of Pokémon IDs from both filters
        pokemonIds = regionPokemonIds.filter((id) => typePokemonIds.includes(id));
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


  const handleRegionChange = (selectedRegion) => {
    setCurrentPage(1);
    setRegionFilter(selectedRegion);
  };

  const handleTypeChange = (selectedType) => {
    setCurrentPage(1);
    setTypeFilter(selectedType);
  };

  const handleReset = () => {
    setCurrentPage(1); // Reset the page to the first page
    setRegionFilter(''); // Reset region filter
    setTypeFilter(''); // Reset type filter
  };

  return (
    <div>
      <div className="space-y-4">
        <RegionFilter
          selectedRegion={regionFilter}
          onRegionChange={handleRegionChange}
        />
        <TypeFilter
          selectedType={typeFilter}
          onTypeChange={handleTypeChange}
        />
        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reset Filters
        </button>
      </div>
      <Suspense fallback={<Loading />}>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-center p-4">
              {count === 0 ? <p>No Pokémon</p> : <p>{count} Pokémon</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {pokemonIds.map((id) => (
                <PokemonCard key={id} id={id} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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
