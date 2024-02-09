// Page.js
'use client'
import { usePathname, useRouter } from 'next/navigation';
import PokemonInfo from './components/PokemonInfo'
import PokemonEvolutions from './components/PokemonEvolutions'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const router = useRouter(); // Access the router object
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const id = pathnameParts[pathnameParts.length - 1];

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous route
  };

  return (
    <div>
      <button onClick={handleGoBack}>
        <ArrowLeftIcon className="w-4 h-4 inline-block align-middle mr-1"/> BACK
      </button>
      <h1>__</h1>
      <PokemonInfo id={id} />
      <h1>__</h1>
      <PokemonEvolutions id={id} />
    </div>
  );
}
