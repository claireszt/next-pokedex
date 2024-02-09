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

    // Determine the size class based on the size prop
    let sizeClass = '';
    if (size === 'sm') {
      sizeClass = 'text-[0.6rem] py-0.5 px-1.5';
    } else if (size === 'md') {
      sizeClass = 'text-sm py-1 px-2';
    } else if (size === 'lg') {
      sizeClass = 'text-lg py-2 px-3';
    } else {
      sizeClass = 'text-sm py-1 px-2'; // Default to medium size
    }

    const bgStyle = `rounded-md ${typeColorMap[type]} ${sizeClass} inline-block`;

    return (
      <div className={`${bgStyle}`}>
          <p className="text-black text-center font-bold">{type.toString().toUpperCase()}</p>
      </div>
    );
}
