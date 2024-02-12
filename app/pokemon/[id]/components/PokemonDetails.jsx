// PokemonInfo.js
'use client'
import React, { useEffect, useState } from 'react';
import { formatPokemon } from '@/backend/formatting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { TypePill } from "../../../ui/type-pills"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';


function PokemonDetails({ id }) {
    const router = useRouter()
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedPokemon = await formatPokemon(id);
                setPokemon(formattedPokemon);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchData();
    }, [id]);

    const imageSize = 300;

    const handlePreviousClick = () => {
        if (pokemon.id > 1) {
            router.push(`/pokemon/${pokemon.id - 1}`);
        }
    };

    const handleNextClick = () => {
        if (pokemon.id < 1302) {
            router.push(`/pokemon/${pokemon.id + 1}`);
        }
    };

    return (
        <div> {/* Updated align-center to items-center */}
            {pokemon ? (
                <div className='flex flex-col justify-center items-center'>
                    <Image
                        src={pokemon.sprite['3d']}
                        alt={`${pokemon.name} sprite`}
                        width={imageSize}
                        height={imageSize}
                    />
                    <p className='font-mono font-bold text-sm text-gray-700'>#{pokemon.id.toString().padStart(3, '0')}</p>
                    <p className='text-5xl font-bold'>{pokemon.name}</p>
                    <p className='text-gray-400'>{pokemon.genera}</p>
                    <div className='flex flex-row gap-3 py-5'>
                        <TypePill type={pokemon.type1} size={'md'} />
                        {pokemon.type2 ? (
                            <TypePill type={pokemon.type2} size={'md'} />
                        ) : <p></p>}
                    </div>
                    <p className='w-1/2 text-justify'>{pokemon.pokedexEntry}</p>
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handlePreviousClick}
                            disabled={pokemon.id === 1}
                            className={`flex h-10 w-40 items-center justify-center rounded-md border ${pokemon.id === 1 ? 'pointer-events-none text-gray-300' : ''}`}
                        >
                            <ArrowLeftIcon className='w-6 h-6 text-gray-500' />
                            {pokemon.id !== 1 && (
                                <p className='px-2 font-mono font-bold text-xs text-gray-500'>
                                    #{(pokemon.id - 1).toString().padStart(3, '0')}
                                </p>
                            )}
                        </button>
                        <button
                            onClick={handleNextClick}
                            disabled={pokemon.id === 1302}
                            className={`flex h-10 w-40 items-center justify-center rounded-md border ${pokemon.id === 1302 ? 'pointer-events-none text-gray-300' : ''}`}
                        >
                            <ArrowRightIcon className='w-6 h-6 text-gray-500' />
                            {pokemon.id !== 1302 && (
                                <p className='px-2 font-mono font-bold text-xs text-gray-500'>
                                    #{(pokemon.id + 1).toString().padStart(3, '0')}
                                </p>
                            )}
                        </button>
                    </div>

                </div>
            ) : (
                <p>Loading Pokemon info...</p>
            )}
        </div>
    );

}

export default PokemonDetails;
