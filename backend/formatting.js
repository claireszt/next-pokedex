import { fetchPokemonData, fetchEvoChain } from "./fetch";

const formatPokemon = async (id) => {
  const pokemonData = await fetchPokemonData(id);
  const evoData = await fetchEvoChain(id);

  const pokemonName =
    pokemonData.name[0].toUpperCase() +
    pokemonData.name.slice(1).toLowerCase();

  const type1 = pokemonData.types[0]?.type?.name || null;
  const type2 = pokemonData.types[1]?.type?.name || null;

  const formattedData = {
    id: pokemonData.id,
    name: pokemonName,
    sprite: {
      official: pokemonData.sprites.other['official-artwork'].front_default,
      small: pokemonData.sprites['front_default'],
      dreamworld: pokemonData.sprites.other['dream_world'].front_default,
      gif: pokemonData.sprites.other['showdown'].front_default,
      '3d': pokemonData.sprites.other['home'].front_default,
    },
    type1: type1,
    type2: type2,
  };

  console.log('Formatted Pokemon Data:', formattedData);
  return formattedData;
};

export { formatPokemon };
