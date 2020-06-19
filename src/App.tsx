import React, { FC } from 'react';
import './App.css';
import Direction from './components/Direction';
import VisibleFlights from './components/VisibleFlights';

const App: FC = () => {
  return (
    <div>
      <Direction />
      <VisibleFlights />
    </div>
  );
};

export default App;
