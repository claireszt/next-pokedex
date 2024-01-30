
import { Metadata } from 'next';
import PokemonCard from './pokemon-list/pokemonCard';
import "./ui/global.css";

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const pokemonIds = Array.from({ length: 1 }, (_, index) => index + 1);

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Pokedex
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonIds.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>

    </main>
  );
}
