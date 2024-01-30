import React from 'react';
import {formatPokemon} from '@/backend/formatting';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
}

async function PokemonCard({ id }: PokemonCardProps): Promise<React.ReactElement> {
  const pokemon = await formatPokemon(id);

  const typeColorMap: { [key: string]: string } = {
    normal: 'bg-normal', 
    fire: 'bg-fire',
    water: 'bg-water',
    electric: 'bg-electric',
    grass: 'bg-grass',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
  };

  const imageSize = 80
  
  const circleStyle = `relative rounded-full ${typeColorMap[pokemon.type1]} bg-opacity-20 p-4 inline-block`;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
    <div className={`${circleStyle} inline-flex flex-col items-center justify-center`}>
      <p className="text-center">#{pokemon.id.toString().padStart(3, "0")}</p>
      <p>{pokemon.name}</p>
      <Image src={pokemon.sprite['official']} alt={`${pokemon.name} sprite`} width={imageSize} height={imageSize}/>
      <p>{pokemon.type1} {pokemon.type2}</p>
    </div>
    </Link>
  );
}

export default PokemonCard;

