import React, { FC } from 'react';
import DirectionLink from './DirectionLink';

const Direction: FC = () => {
  return (
    <p>
      <DirectionLink direction={'departure'}>departures</DirectionLink>
      <DirectionLink direction={'arrival'}>arrivals</DirectionLink>
    </p>
  );
};

export default Direction;
