'use client'
import React, { useState, useEffect, Suspense } from 'react';
import PokemonCard from './pokemonCard';
import Loading from '../loading';

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage]);

  const fetchPokemonData = async (page) => {
    try {
      setIsLoading(true); // Set loading state to true while fetching data
      const offsetValue = (page - 1) * 9;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetValue}&limit=9`);
      const data = await response.json();
      const ids = data.results.map((pokemon, index) => {
        return offsetValue + index + 1; // Calculate ID based on page and index
      });
      setPokemonIds(ids);
      setOffset(offsetValue);
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
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
      <Suspense fallback={<Loading/>}>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {pokemonIds.map(id => (
                <PokemonCard key={id} id={id} />
              ))}
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || offset === 0}
                className="mx-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={offset >= count}
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
