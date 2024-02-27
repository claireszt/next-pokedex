function SortingFilter({ selectedSort, onSortChange }) {
  const sorting = [
        { label: 'Pokedex #', value: '#' },
        { label: 'A-Z', value: 'abc' },
      ];

return (
  <div className="w-auto">
    <label htmlFor="sorting" className="text-gray-700 text-sm font-bold mb-2">
      Sort by
    </label>
    <select
      id="sorting"
      className="block p-2 border rounded-md bg-gray-100"
      value={selectedSort}
      onChange={(e) => onSortChange(parseInt(e.target.value))}
    >
      {sorting.map((sort) => (
        <option key={sort.value} value={sort.value}>
          {sort.label}
        </option>
      ))}
    </select>
  </div>
);
}

export default SortingFilter;

// import React from 'react';

// function SortingFilter({ selectedSort, onSortChange }) {
//   const sorting = [
//     { label: 'A-Z', value: 'abc' },
//     { label: 'Pokedex #', value: '#' }
//   ];

//   return (
//     <div>
//       <label className="block text-gray-700 text-sm font-bold mb-2">Sort by</label>
//       <div className="flex flex-wrap">
//         {sorting.map((sort) => (
//           <div key={sort.value} className="m-1">
//             <input
//               type="radio"
//               id={sort.value}
//               name="sort"
//               value={sort.value}
//               checked={sort.value === selectedSort}
//               onChange={(e) => onSortChange(e.target.value)}
//               className="hidden"
//             />
//             <label htmlFor={sort.value} className={`cursor-pointer border border-gray-400 bg-white px-4 py-2 rounded-md hover:bg-gray-200 ${sort.value === selectedSort ? 'text-blue-600 bg-blue-100 border-blue-600' : 'text-gray-700'}`}>
//               {sort.label}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SortingFilter;
