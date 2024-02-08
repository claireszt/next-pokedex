import { fetchPokemonData, fetchEvoChain } from "./fetch";

const formatPokemon = async (id) => {
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
    type2: type2
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

  const formattedChain = {
    species: {
      name: evoData.chain.species.name,
      id: extractIdFromUrl(evoData.chain.species.url),
    },
    evolves_to: [],
  };

  function processEvolutions(evolutionData) {
    const evolutionDetails = evolutionData.evolution_details.map((detail) => {
      const triggerInfo = getTriggerInfo(detail);
      return {
        trigger: {
          name: formatTriggerName(detail.trigger.name),
          ...triggerInfo,
        },
        evolves_to: {
          name: evolutionData.species.name,
          id: extractIdFromUrl(evolutionData.species.url),
        },
      };
    });

    formattedChain.evolves_to.push(...evolutionDetails);

    if (evolutionData.evolves_to.length > 0) {
      evolutionData.evolves_to.forEach((nextEvolution) => {
        processEvolutions(nextEvolution);
      });
    }
  }

  function getTriggerInfo(detail) {
    const triggerInfo = {};

    switch (detail.trigger.name) {
      case 'level-up':
        if (detail.min_level !== null) triggerInfo.trigger = `Level ${detail.min_level}`;
        if (detail.min_happiness !== null) triggerInfo.trigger = `Happiness +${detail.min_happiness}`;
        if (detail.relative_physical_stats !== null) {
          if (detail.relative_physical_stats === 0) triggerInfo.trigger = `Level ${detail.min_level}, Atk = Def`;
          if (detail.relative_physical_stats === 1) triggerInfo.trigger = `Level ${detail.min_level}, Atk > Def`;
          if (detail.relative_physical_stats === -1) triggerInfo.trigger = `Level ${detail.min_level}, Atk < Def`;
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

  processEvolutions(evoData.chain);
  console.log('Formatted Evolution Data:', formattedChain);

  return formattedChain;
}



export { formatPokemon, formatEvolutionChain };
