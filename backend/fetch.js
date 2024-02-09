const fetchAllPokemons = async ( sort ) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

  if (!response.ok) {
    throw new Error(`Failed to fetch all Pokemons. Status: ${response.status}`);
  }

  const data = await response.json();

  if (sort == 'abc') {
    const pokemonNames = data.results;
    const names = pokemonNames.map(pokemon => pokemon.name)
    return names.sort()
  }

  if (sort == '#') {
    const pokemonIds = data.results;
    const ids = pokemonIds.map(pokemon => {
        const urlParts = pokemon.url.split('/');
        return parseInt(urlParts[urlParts.length - 2]); // Extract the last number in the URL
    });
    ids.sort((a, b) => a - b);
  
    return ids; 
  }
}

const fetchPokemonData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // Vérifie si la réponse est réussie (statut 200)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon data. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const fetchSpeciesData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

  // Vérifie si la réponse est réussie (statut 200)
  if (!response.ok) {
    throw new Error(`Failed to fetch Species data. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

const fetchEvoChain = async (id) => {
  const speciesData = await fetchSpeciesData(id);
  const url = speciesData['evolution_chain'].url;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Evolution Chain data. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const fetchByGen = async (id, sort) => {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
  const data = await response.json();

  const pokemonSpecies = data.pokemon_species;

  if (sort == 'abc') {
    const names = pokemonSpecies.map(pokemon => pokemon.name)
    return names.sort()
  }

  if (sort == '#') {
    const ids = pokemonSpecies.map(pokemon => {
        const urlParts = pokemon.url.split('/');
        return parseInt(urlParts[urlParts.length - 2]); // Extract the last number in the URL
    });
    ids.sort((a, b) => a - b);
    return ids;
  }

}

const fetchByType = async (type, sort) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const nestedPokemon = data.pokemon; 

    if (sort == 'abc') {
      const names = nestedPokemon.map(entry => entry.pokemon.name); // Extracting "pokemon" object from each entry
      return names.sort()
    }
  
    if (sort == '#') {
      const pokemonSpecies = nestedPokemon.map(entry => entry.pokemon); // Extracting "pokemon" object from each entry
      const ids = pokemonSpecies.map(poke => {
        const urlParts = poke.url.split('/');
        return parseInt(urlParts[urlParts.length - 2]); // Extract the last number in the URL
      });
      ids.sort((a, b) => a - b);
      return ids;
    }



  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}



export { fetchAllPokemons, fetchPokemonData, fetchSpeciesData, fetchEvoChain, fetchByGen, fetchByType };
