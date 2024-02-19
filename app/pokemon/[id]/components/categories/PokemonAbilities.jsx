// PokemonAbilities.js
'use client'

function PokemonAbilities({ pokemon }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center py-4">
      {pokemon ? (
        pokemon.abilities.map((ability, index) => (
          <div key={index} className={`flex flex-col align-center items-center justify-start px-5`}>
            <div className="font-bold  w-full text-center">{ability.name.toUpperCase()}
              {ability.isHidden ? <span className="text-[0.6rem] text-gray-500 pl-1 font-normal">(hidden)</span> : <span></span>}
            </div>
            <p className={`mt-1 rounded-md bg-${pokemon.type1} bg-opacity-20 p-2 text-sm text-center`}>{ability.effect}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function getAbilityContainerClass(abilityCount) {
  switch (abilityCount) {
    case 1:
      return "w-full";
    case 2:
      return "w-1/2";
    case 3:
      return "w-1/3";
    default:
      return "w-full";
  }
}

export default PokemonAbilities;
