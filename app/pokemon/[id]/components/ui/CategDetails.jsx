export function CategDetail({ info, color, size, additional }) {
    let textSizeClass = 'text-sm';
  
    // Apply different text sizes based on the size prop
    if (size === 'sm') {
      textSizeClass = 'text-xs sm:text-sm';
    } else if (size === 'md') {
      textSizeClass = 'text-sm';
    } else if (size === 'lg') {
      textSizeClass = 'text-lg';
    }
  
    return <p className={`rounded-lg bg-gray-100 p-2 text-center ${textSizeClass} font-bold ${additional}`}>{info}</p>;
  }
  
