// PokemonAbilities.js
'use client'

function PokemonAbilities({ pokemon }) {
  return (
    <div className="flex flex-row space-x-4 w-full">
      {pokemon ? (
        pokemon.abilities.map((ability, index) => (
          <div key={index} className={`${getAbilityContainerClass(pokemon.abilities.length)} flex flex-col align-center items-center justify-start`}>
            <div className="font-bold border-b border-gray-500 w-full text-center">{ability.name.toUpperCase()}
            {ability.isHidden ? <span className="text-[0.6rem] text-gray-500 pl-1 font-normal">(hidden)</span> : <span></span>}
            </div>
            <p className="px-2 pt-2 text-sm text-center">{ability.effect}</p>
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
