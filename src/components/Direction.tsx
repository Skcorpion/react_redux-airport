import React, { FC } from 'react';
import DirectionLink from './DirectionLink';

const Direction: FC = () => {
  return (
    <div className="flights-tabs">
      <DirectionLink direction={'departure'}>departures</DirectionLink>
      <DirectionLink direction={'arrival'}>arrivals</DirectionLink>
    </div>
  );
};

export default Direction;
