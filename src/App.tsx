import React, { FC } from 'react';
import './App.css';
import Direction from './components/Direction';
import VisibleFlights from './components/VisibleFlights';
import DatePicker from './components/DatePicker';

const App: FC = () => {
  return (
    <div>
      <Direction />
      <DatePicker />
      <VisibleFlights />
    </div>
  );
};

export default App;
