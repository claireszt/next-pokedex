'use client'

function PokemonStats({ pokemon }) {
  return (
    <div>
      {pokemon ? (
        pokemon.stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-end py-0.5">
            <div className={`bg-${pokemon.type1} w-10 py-0.5 text-center mr-2 rounded-full text-xs font-bold`}>{stat.shortName}</div>
            <div className="mr-2">{stat.base.toString().padStart(3, '0')}</div>
            <div className="w-52 bg-gray-200 rounded-md">
              <div className={`h-1.5 bg-${pokemon.type1} rounded-md`} style={{ width: `${(stat.base * 100) / stat.max}%` }}></div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonStats;
