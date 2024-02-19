'use client'

function PokemonStats({ pokemon }) {


  return (
    <div>
        { pokemon ? (<p>{pokemon.name} Stats</p>) : (<p>Loading...</p>) }
        
    </div>
  );
}

export default PokemonStats;
