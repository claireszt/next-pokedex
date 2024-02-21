// PokemonEvolutions.js
'use client'
import { GiWeight, GiBodyHeight } from "react-icons/gi";
import { CategDetail } from "../ui/CategDetails";
import { Title } from '../ui/Title'

const InfoComponent = ({ title, Icon, data, color }) => {
  const iconSize = '1em'
  const iconStyle = { marginRight: 5 }

  return (
    <div className={`flex flex-col align-center items-center justify-start gap-4`}>
    <div className={'flex flex-row items-center'}>
        {Icon && <Icon size={iconSize} style={iconStyle} />}
        <Title info={title} />
      </div>
      <CategDetail info={data} color={color} size={'lg'} additional={'w-full'}/>
    </div>
  );
};



function PokemonDimensions({ pokemon }) {

  return (
    <div>
      {pokemon ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center py-4">
            <InfoComponent
              title={'WEIGHT'}
              // Icon={GiWeight}
              data={`${pokemon.weight / 10} kg`} 
              color={pokemon.type1}
            />
            <InfoComponent
              title={'HEIGHT'}
              // Icon={GiBodyHeight}
              data={`${pokemon.height / 10} m`} 
              color={pokemon.type1}
            />
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default PokemonDimensions;
