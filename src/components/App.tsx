import React, { FC } from 'react';
import './App.scss';
import Direction from './Direction/Direction';
import VisibleFlights from './VisibleFlights/VisibleFlights';
import FlightDate from './FlightDate/FlightDate';
import SearchField from './SearchField/SearchField';

const App: FC = () => {
  return (
    <div className="container flights__container">
      <SearchField />
      <Direction />
      <FlightDate />
      <VisibleFlights />
    </div>
  );
};

export default App;
