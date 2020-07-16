import React from 'react';
import DirectionLink from '../Direction/DirectionLink';
import SearchField from '../SearchField/SearchField';
import './HomePage.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="container home__container">
        <SearchField>
          <div className="home__direction-tabs direction-tabs">
            <DirectionLink direction="departures">all departures</DirectionLink>
            <DirectionLink direction="arrivals">all arrivals</DirectionLink>
          </div>
        </SearchField>
      </div>
    </div>
  );
};

export default Home;
