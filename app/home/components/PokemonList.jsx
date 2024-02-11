'use client'
import React, { useEffect, useState, Suspense, useCallback } from 'react';
import PokemonCard from './pokemonCard';
import Loading from '../loading';
import RegionFilter from './filters/RegionFilter';
import TypeFilter from './filters/TypeFilter';
import SortingFilter from './filters/SortingFilter';
import { fetchAllPokemons, fetchByGen, fetchByType } from '@/backend/fetch';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Pagination from './ui/Pagination';

const PokemonList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [sorting, setSorting] = useState(searchParams.get('sort') || '#');

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let pokemonIds = [];
      if (regionFilter && !typeFilter) {
        pokemonIds = await fetchByGen(regionFilter, sorting);
      } else if (!regionFilter && typeFilter) {
        pokemonIds = await fetchByType(typeFilter, sorting);
      } else if (regionFilter && typeFilter) {
        const regionPokemonIds = await fetchByGen(regionFilter, sorting);
        const typePokemonIds = await fetchByType(typeFilter, sorting);
        pokemonIds = regionPokemonIds.filter((id) => typePokemonIds.includes(id));
      } else {
        pokemonIds = await fetchAllPokemons(sorting);
      }
      const offsetStart = (currentPage - 1) * 9;
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

  useEffect(() => {
    fetchData();
  }, [currentPage, regionFilter, typeFilter, sorting]);

  const handleRegionChange = (selectedRegion) => {
    setRegionFilter(selectedRegion);
    setCurrentPage(1);
    router.push(pathname + '?' + createQueryString('region', selectedRegion));
  };

  const handleTypeChange = (selectedType) => {
    setTypeFilter(selectedType);
    setCurrentPage(1);
    router.push(pathname + '?' + createQueryString('type', selectedType));
  };

  const handleSortChange = (selectedSort) => {
    setSorting(selectedSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setRegionFilter('');
    setTypeFilter('');
    setSorting('#');
    router.push('/home');
  };

  return (
    <div>
      <div className="space-y-4">
        <RegionFilter selectedRegion={regionFilter} onRegionChange={handleRegionChange} />
        <TypeFilter selectedType={typeFilter} onTypeChange={handleTypeChange} />
        <SortingFilter selectedSort={sorting} onSortChange={handleSortChange} />
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
            <div className="text-center p-4">{count === 0 ? <p>No Pokémon</p> : <p>{count} Pokémon</p>}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {pokemonIds.map((id) => (
                <PokemonCard key={id} id={id} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination currentPage={currentPage} totalPages={Math.ceil(count / 9)} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default PokemonList;
