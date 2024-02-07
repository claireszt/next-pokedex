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

      const bgStyle = `rounded-md ${typeColorMap[type]} px-2 py-1 inline-block`

      return (
        <div className={`${bgStyle}`}>
            <p className="text-black text-[0.6rem] text-center font-bold">{type.toString().toUpperCase()}</p>
        </div>
      );
  }