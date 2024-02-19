const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function HomeSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
      </div>
    </>
  );
}

function PokemonCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex items-center justify-center h-36 bg-gray-100 rounded-t-xl">
        <div className="h-24 w-24 rounded-md bg-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="h-4 w-16 rounded-md bg-gray-200 mb-2" />
        <div className="h-4 w-24 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}