const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export default function PokemonCategoriesSkeleton() {
    return (
      <>
        <div
          className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
        />
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center'>
          <CategSkeleton />
        </div>
      </>
    );
  }
  
  
  function CategSkeleton() {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm">
        <div className="flex flex-row space-x-16 w-full justify-center"> {/* Updated line */}
          <div className="w-1/2 flex flex-row justify-center items-center align-center">
            <div>
              <div className="h-4 w-16 rounded-md bg-gray-200 mb-2" />
              <div className="h-4 w-24 rounded-md bg-gray-200" />
            </div>
            <div>
              <div className="h-4 w-16 rounded-md bg-gray-200 mb-2" />
              <div className="h-4 w-24 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
