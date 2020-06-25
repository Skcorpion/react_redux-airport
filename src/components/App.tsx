import React, { FC } from 'react';
import './App.css';
import Direction from './Direction';
import VisibleFlights from './VisibleFlights';
import FlightDate from './FlightDate';
import SearchField from './SearchField';

const App: FC = () => {
  return (
    <div>
      <SearchField />
      <Direction />
      <FlightDate />
      <VisibleFlights />
    </div>
  );
};

export default App;
