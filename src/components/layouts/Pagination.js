import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="flex items-center space-x-1">
        {pageNumbers.map((number) => (
          <li
            key={number}
            data-testid={`page-number-${number}`}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-center transition-colors duration-300 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="m-4 flex flex-col items-center">
      {totalPages > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <button
            data-testid="prev-button" //Unique identifier for testing
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            data-testid="next-button" //Unique identifier for testing
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          >
            &gt;
          </button>
        </div>
      )}
      {totalPages > 0 && (
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-400">items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
