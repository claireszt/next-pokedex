import { fetchPokemonData, fetchEvoChain, fetchSpeciesData, fetchAbilityData } from "./fetch";

const formatPokemonSimple = async (id) => {
  try {
    const pokemonData = await fetchPokemonData(id);

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
  } catch (error) {
    console.error('Error formatting Pokemon data:', error);
    throw error; // Re-throw the error to propagate it further
  }
};

const formatPokemonFull = async (id) => {
  try {
    const pokemonData = await fetchPokemonData(id);
    const speciesData = await fetchSpeciesData(id)
    

  const pokemonName =
    pokemonData.name[0].toUpperCase() +
    pokemonData.name.slice(1).toLowerCase();

  const type1 = pokemonData.types[0]?.type?.name || null;
  const type2 = pokemonData.types[1]?.type?.name || null;

  const getGenus = (lang) => {
    const genusEntry = speciesData.genera.find((entry) => entry.language.name === lang);
    return genusEntry ? genusEntry.genus : null;
  };

  const getPokedexEntry = (lang) => {
    const pokedexEntry = speciesData['flavor_text_entries'].find((entry) => entry.language.name === lang);
    return pokedexEntry ? pokedexEntry['flavor_text'] : null;
  };

  async function formatAbilities(abilities) {
    const formattedAbilities = await Promise.all(abilities.map(async ability => {
      const urlParts = ability.ability.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      const name = ability.ability.name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());;
      const isHidden = ability.is_hidden;
  
      // Fetch specific information for the ability
      const additionalData = await fetchAbilityData(id);

      const effectEntry = (lang) => {
        const effectEntry = additionalData.flavor_text_entries.find((entry) => entry.language.name === lang);
        return effectEntry ? effectEntry['flavor_text'] : null;
      };
  
      // Extract only the required information from additionalData
      const effect = effectEntry('en')
  
      return {
        id,
        name,
        isHidden,
        effect,
      };
    }));
  
    return formattedAbilities;
  }

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
    genera: getGenus('en'),
    pokedexEntry: getPokedexEntry('en'),
    abilities: await formatAbilities(pokemonData.abilities),
    weight: pokemonData.weight,
    height: pokemonData.height
  };

  console.log('Formatted Pokemon Data:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error formatting Pokemon data:', error);
    throw error; // Re-throw the error to propagate it further
  }
};

async function formatEvolutionChain(id) {
  const evoData = await fetchEvoChain(id);

  const extractIdFromUrl = (url) => {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  };

  const formatTriggerName = (triggerName) => {
    const formattedName = triggerName.replace(/-/g, ' '); // Replace dashes with spaces
    const words = formattedName.split(' ');

    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(' ');
  };

  const initialPokeData = await formatPokemonSimple(extractIdFromUrl(evoData.chain.species.url))

  const formattedChain = {
    species: {
      id: extractIdFromUrl(evoData.chain.species.url),
      ...initialPokeData
    },
    evolves_to: [],
  };

  async function processEvolutions(evolutionData) {
    const evolutionDetails = await Promise.all(evolutionData.evolves_to.map(async (evolution) => {
      const detail = evolution.evolution_details[0];
      const triggerInfo = getTriggerInfo(detail);
      const pokemonInfo = await formatPokemonSimple(extractIdFromUrl(evolution.species.url));
  
      return {
        trigger: {
          name: formatTriggerName(detail.trigger.name),
          ...triggerInfo,
        },
        evolves_to: {
          name: evolutionData.species.name,
          id: extractIdFromUrl(evolutionData.species.url),
          ...pokemonInfo, // Add additional info fetched from fetchPokemonSimple
        },
      };
    }));
  
    formattedChain.evolves_to.push(...evolutionDetails);
  
    if (evolutionData.evolves_to.length > 0) {
      await Promise.all(evolutionData.evolves_to.map(async (nextEvolution) => {
        await processEvolutions(nextEvolution);
      }));
    }
  }  

  function getTriggerInfo(detail) {
    const triggerInfo = {};

    switch (detail.trigger.name) {
      case 'level-up':
        if (detail.min_level !== null) triggerInfo.trigger = `LVL ${detail.min_level}`;
        if (detail.min_happiness !== null) triggerInfo.trigger = `Happiness +${detail.min_happiness}`;
        if (detail.relative_physical_stats !== null) {
          if (detail.relative_physical_stats === 0) triggerInfo.trigger = `LVL ${detail.min_level}, Atk = Def`;
          if (detail.relative_physical_stats === 1) triggerInfo.trigger = `LVL ${detail.min_level}, Atk > Def`;
          if (detail.relative_physical_stats === -1) triggerInfo.trigger = `LVL ${detail.min_level}, Atk < Def`;
        }
        break;
      case 'use-item':
        if (detail.item?.name) triggerInfo.trigger = formatTriggerName(detail.item.name);
        break;
      case 'trade':
        triggerInfo.trigger = 'Trade';
        break;

      default:
        break;
    }

    return triggerInfo;
  }

  await processEvolutions(evoData.chain); // Wait for processing all evolutions
  console.log('Formatted Evolution Data:', formattedChain);

  return formattedChain;
}






export { formatPokemonSimple, formatPokemonFull, formatEvolutionChain };
