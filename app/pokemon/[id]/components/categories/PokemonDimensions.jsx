// PokemonEvolutions.js
'use client'

function PokemonDimensions({ pokemon }) {

  return (
    <div>
        { pokemon ? (<p>{pokemon.name} Dimensions</p>) : (<p>Loading...</p>) }
        
    </div>
  );
}

export default PokemonDimensions;
