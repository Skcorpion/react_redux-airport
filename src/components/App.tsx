import React, { FC } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import FlightsTable from './FlightsTable/FlightsTable';
import FlightDetails from './FlightDetails/FlightDetails';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper-container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:direction" component={FlightsTable} />
          <Route exact path="/:direction/:flightId" component={FlightDetails} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
