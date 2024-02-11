import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="inline-flex items-center">
      <PaginationArrow
        direction="left"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex items-center space-x-2">
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
      </div>

      <PaginationArrow
        direction="right"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

const PaginationArrow = ({
  direction,
  onClick,
  isDisabled,
}) => {
  const arrowContainerClasses = `
    flex h-10 w-10 items-center justify-center rounded-md border
    ${isDisabled ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'}
    ${direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}
  `;

  const arrowIconClasses = 'w-6 h-6';

  const arrowIcon = direction === 'left' ? (
    <ArrowLeftIcon className={arrowIconClasses} />
  ) : (
    <ArrowRightIcon className={arrowIconClasses} />
  );

  return (
    <div className={arrowContainerClasses} onClick={onClick}>
      {arrowIcon}
    </div>
  );
};

export default Pagination;
