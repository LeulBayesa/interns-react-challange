import React, { useState } from "react";
import ActorList from "../components/actors/ActorList";
import ActorDetail from "../components/actors/ActorDetail";
import FetchActors from "../components/hooks/FetchActors";
import { IoClose } from "react-icons/io5";
import Star from "../assets/StartWar.jpg";

const Home = () => {
  const { actors, loading, error } = FetchActors();
  const [selectedActor, setSelectedActor] = useState(null);

  const closeModal = () => {
    setSelectedActor(null);
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${Star})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto p-4 overflow-y-auto max-h-screen">
        <h1 className="text-4xl font-bold text-center text-white mb-8 capitalize">
          Unveil the stories of your favorite actors
        </h1>
        <ActorList actors={actors} onDetailClick={setSelectedActor} />
        {selectedActor && (
          <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 p-4 rounded-lg shadow-lg relative w-11/12 max-w-xl mx-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <IoClose />
              </button>
              <h2 id="modal-title" className="sr-only">
                Actor Details
              </h2>
              <ActorDetail actor={selectedActor} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
