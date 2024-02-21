// PokemonAbilities.js
'use client'
import {CategDetail} from '../ui/CategDetails'

function PokemonAbilities({ pokemon }) {
  
  return (
    <div className={`grid grid-cols-1 ${getAbilityContainerClass(pokemon.abilities.length)} sm:gap-3 justify-center `}>
      {pokemon ? (
        pokemon.abilities.map((ability, index) => (
          <div key={index} className={`flex flex-col align-center items-center justify-start`}>
            <div className="text-center text-sm">{ability.name.toUpperCase()}
              {ability.isHidden ? <span className="text-[0.6rem] text-gray-500 pl-1 font-normal">(hidden)</span> : <span></span>}
            </div>
              <CategDetail info={ability.effect} color={pokemon.type1} size={'md'} additional={'w-11/12 h-full'} />
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
      return "";
    case 2:
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
    case 3:
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    default:
      return "";
  }
}

export default PokemonAbilities;
