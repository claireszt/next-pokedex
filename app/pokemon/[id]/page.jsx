// Page.js
'use client'
import { usePathname } from 'next/navigation';
import PokemonInfo from './components/PokemonInfo'
import PokemonEvolutions from './components/PokemonEvolutions'
// import { useEffect } from 'react';

export default function Page() {
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const id = pathnameParts[pathnameParts.length - 1];

  return (
    <div>
      <PokemonInfo id={id} />
      <h1>__</h1>
      <PokemonEvolutions id={id} />
    </div>
  );
}
