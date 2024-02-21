// PokemonInfo.js
'use client'
import { useEffect, useState } from 'react';
import { formatPokemonSimple } from '@/backend/formatting';
import Image from 'next/image';

import { TypePill } from "../../../../ui/type-pills"

function PokemonInfo({ pokemon }) {

  const imageSize = 60;


  return (
    <div>
      {pokemon ? (
        <>
          <Image
              src={pokemon.sprite['small']}
              alt={`${pokemon.name} sprite`}
              width={imageSize}
              height={imageSize}
              priority={true}
            />
        </>
      ) : (
        <p>Loading Pokemon info...</p>
      )}
    </div>
  );
}

export default PokemonInfo;
