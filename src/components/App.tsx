import React, { FC } from 'react';
import './App.css';
import Direction from './Direction';
import VisibleFlights from './VisibleFlights';
import DatePicker from './DatePicker';
import SearchField from './SearchField';

const App: FC = () => {
  return (
    <div>
      <SearchField />
      <Direction />
      <DatePicker />
      <VisibleFlights />
    </div>
  );
};

export default App;
