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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center py-4">
      <div className={`flex flex-col align-center items-center justify-start`}>
            <div className={thisTitleStyle}>
              {/* <GiWeight size={iconSize} style={iconStyle} /> */}
              WEIGHT
            </div>
            <div className={`mt-4 px-3 rounded-md bg-${pokemon.type1} bg-opacity-20`}>
              <p className='font-bold text-gray-900'>{pokemon.weight / 10} kg</p>
            </div>

          </div>
          <div className={`flex flex-col align-center items-center justify-start`}>
            <div className={thisTitleStyle}>
              {/* <GiBodyHeight size={iconSize} style={iconStyle} /> */}
              HEIGHT
            </div>
            <div className={`mt-4 px-3 rounded-md bg-${pokemon.type1} bg-opacity-20`}>
              <p className=' font-bold text-gray-900'>{pokemon.height / 10} kg</p>
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
