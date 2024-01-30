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


export { fetchPokemonData, fetchSpeciesData, fetchEvoChain };
