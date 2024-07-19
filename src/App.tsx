import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import ShowDetail from './components/ShowDetail';

const App: React.FC = () => {
  return (
    <div>
      <h1>TV Shows</h1>
      <Search />
      <Routes>
        <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>
    </div>
  );
};

export default App;
