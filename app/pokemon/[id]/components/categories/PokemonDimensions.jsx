// PokemonEvolutions.js
'use client'
import { GiWeight, GiBodyHeight } from "react-icons/gi";


function PokemonDimensions({ pokemon, titleStyle }) {

  const thisTitleStyle = `${titleStyle} flex flex-row items-center`

  const iconSize = '1em'
  const iconStyle = { marginRight: 5 }

  return (
    <div>
      {pokemon ? (
    <div className="flex flex-row space-x-16 w-full">
    <div className={`w-1/2 flex flex-col align-center items-center justify-start`}>
            <div className={thisTitleStyle}>
              <GiWeight size={iconSize} style={iconStyle} /> WEIGHT
            </div>
            <div className={`mt-2 px-3 rounded-md bg-${pokemon.type1} bg-opacity-20`}>
            <p className='font-bold text-gray-900'>{pokemon.weight/10} kg</p>
            </div>

          </div>
          <div className={`w-1/2 flex flex-col align-center items-center justify-start`}>
          <div className={thisTitleStyle}>
              <GiBodyHeight size={iconSize} style={iconStyle} /> HEIGHT
            </div>
            <div className={`mt-2 px-3 rounded-md bg-${pokemon.type1} bg-opacity-20`}>
            <p className=' font-bold text-gray-900'>{pokemon.height/10} kg</p>
            </div>

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default PokemonDimensions;
