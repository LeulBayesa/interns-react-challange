import React from 'react';
import bgElement from "../../assets/Elementss.jpg";

const ActorCard = ({ actor, onDetailClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 border border-gray-200 w-full mx-auto" 
    style={{
      backgroundImage: `url(${bgElement})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <h2 className="text-xl font-semibold mb-2">{actor.name}</h2>
      <p className="text-gray-600 mb-2">Height: {actor.height} cm</p>
      <p className="text-gray-600 mb-4">Birth Year: {actor.birth_year}</p>
      <button
        onClick={() => onDetailClick(actor)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Detail
      </button>
    </div>
  );
};

export default ActorCard;