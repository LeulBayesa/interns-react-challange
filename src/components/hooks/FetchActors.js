import { useState, useEffect } from 'react';

const FetchActors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://swapi.py4e.com/api/people/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setActors(data.results);
      } catch (err) {
        console.error('Fetching error:', err);
        setError({ message: err.message || 'An unexpected error occurred while fetching the actors'});
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  return { actors, loading, error };
};

export default FetchActors;
