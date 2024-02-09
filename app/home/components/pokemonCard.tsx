import React from 'react';
import {formatPokemon} from '@/backend/formatting';
import Image from 'next/image';
import Link from 'next/link';

import { TypePill } from '../../ui/type-pills';

interface PokemonCardProps {
  id: number;
}

async function PokemonCard({ id }: PokemonCardProps): Promise<React.ReactElement> {
  const pokemon = await formatPokemon(id)

  const imageSize = 80

  const divStyle = `flex flex-col bg-white shadow-md rounded-lg px-2 py-6 justify-items-center items-center	`

  return (
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className={divStyle}>
          <Image src={pokemon.sprite['official']} alt={`${pokemon.name} sprite`} width={imageSize} height={imageSize} priority={true}/>
          <p className='text-gray-500 font-mono text-xs font-bold'>#{pokemon.id.toString().padStart(3, "0")}</p>
          <p className='font-bold text-xl'>{pokemon.name}</p>
          <div className='space-x-1'>
            <TypePill type={pokemon.type1} size={'sm'}/> 
            {pokemon.type2 ? <TypePill type={pokemon.type2} size={'sm'}/> : null}
          </div>
        </div>
      </Link>
      );
}

export default PokemonCard;

