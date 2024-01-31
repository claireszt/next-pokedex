export function TypePill({ type, size }) {
    const typeColorMap = {
        normal: 'bg-normal', 
        fire: 'bg-fire',
        water: 'bg-water',
        electric: 'bg-electric',
        grass: 'bg-grass',
        ice: 'bg-ice',
        fighting: 'bg-fighting',
        poison: 'bg-poison',
        ground: 'bg-ground',
        flying: 'bg-flying',
        psychic: 'bg-psychic',
        bug: 'bg-bug',
        rock: 'bg-rock',
        ghost: 'bg-ghost',
        dragon: 'bg-dragon',
        dark: 'bg-dark',
        steel: 'bg-steel',
        fairy: 'bg-fairy',
      };

      const bgStyle = `rounded-full ${typeColorMap[type]} px-1 inline-block w-16`;

      return (
          <>
              <div className={`${bgStyle}`}>
                  <p className="text-white text-sm text-center">{type.toString()}</p>
              </div>
          </>
      );
  }