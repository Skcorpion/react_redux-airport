import React, { FC } from 'react';
import DirectionLink from './DirectionLink';

const Direction: FC = () => {
  return (
    <div className="flights-tabs">
      <DirectionLink>departures</DirectionLink>
      <DirectionLink>arrivals</DirectionLink>
    </div>
  );
};

export default Direction;
