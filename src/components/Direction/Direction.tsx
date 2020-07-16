import React, { FC } from 'react';
import DirectionLink from './DirectionLink';
import './Direction.scss';

const Direction: FC = () => {
  return (
    <div className="flights__direction-tabs direction-tabs">
      <DirectionLink direction="departures">departures</DirectionLink>
      <DirectionLink direction="arrivals">arrivals</DirectionLink>
    </div>
  );
};

export default Direction;
