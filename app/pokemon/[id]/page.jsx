'use client'
import { usePathname } from 'next/navigation';
import { formatPokemon } from '@/backend/formatting';
import Image from 'next/image';

export default async function Page() {
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const id = pathnameParts[pathnameParts.length - 1];

  const pokemon = await formatPokemon(id);

  const imageSize = 80;

  return (
    <div>
      <p>#{pokemon.id.toString().padStart(3, '0')}</p>
      <p>{pokemon.name}</p>
      <Image src={pokemon.sprite['official']} alt={`${pokemon.name} sprite`} width={imageSize} height={imageSize} />
      <p>{pokemon.type1} {pokemon.type2}</p>
      <p>Evolution Chain:</p>
    </div>
  );
}