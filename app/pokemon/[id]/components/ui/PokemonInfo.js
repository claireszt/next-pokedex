// PokemonInfo.js
'use client'
import { useEffect, useState } from 'react';
import { formatPokemonSimple } from '@/backend/formatting';
import Image from 'next/image';

import { TypePill } from "../../../../ui/type-pills"

function PokemonInfo({ pokemon }) {

  const imageSize = 50;


  return (
    <div>
      {pokemon ? (
        <>
          <Image
              src={pokemon.sprite['gif']}
              alt={`${pokemon.name} sprite`}
              width="0"
              height="0"
              style={{ width: 30, height: 'auto' }}
            />
        </>
      ) : (
        <p>Loading Pokemon info...</p>
      )}
    </div>
  );
}

export default PokemonInfo;
