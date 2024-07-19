import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows } from '../features/shows/showsSlice';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const shows = useSelector((state: RootState) => state.shows.shows);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value) {
      dispatch(fetchShows(e.target.value));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for TV Show"
      />
      {query && (
        <div style={{ position: 'absolute' }}>
          {shows.map((show) => (
            <div key={show.id}>
              <Link to={`/shows/${show.id}`}>{show.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;