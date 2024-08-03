import React, { useState } from 'react';
import ActorCard from './ActorCard';
import Pagination from '../layouts/Pagination';
import { FaSearch } from 'react-icons/fa';

const ActorList = ({ actors, onDetailClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

// filter serach term 
  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActors.length / itemsPerPage);

  const indexOfLastActor = currentPage * itemsPerPage;
  const indexOfFirstActor = indexOfLastActor - itemsPerPage;
  const currentActors = filteredActors.slice(indexOfFirstActor, indexOfLastActor);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="relative mb-4 mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <input
          type="text"
          placeholder="Search for your favorite actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Actor Cards */}
      {currentActors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentActors.map((actor) => (
              <ActorCard
                key={actor.url}
                actor={actor}
                onDetailClick={onDetailClick}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-300 mt-4">No actors found matching your search criteria.</p>
      )}
    </div>
  );
};

export default ActorList;
