// PokemonEvolutions.js
'use client'

function PokemonMoves({ pokemon }) {

  return (
    <div>
        { pokemon ? (<p>{pokemon.name} Moves</p>) : (<p>Loading...</p>) }
        
    </div>
  );
}

export default PokemonMoves;
