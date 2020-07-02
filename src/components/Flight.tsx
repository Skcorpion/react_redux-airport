import React, { FC } from 'react';
import { Arrival, Departure } from '../utils/flightsTypes';
import classNames from 'classnames';
import { statusFlight } from '../utils/statusFlight';

type Props = {
  flight: Arrival | Departure;
};

const Flight: FC<Props> = ({ flight }) => {
  function isArrival(flight: Arrival | Departure): flight is Arrival {
    return (flight as Arrival).timeLandCalc !== undefined;
  }

  const { term, status, airline, codeShareData, actual } = flight;
  let localTime = '',
    actualTime = '',
    destination = '';

  const toTimeString = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isArrival(flight)) {
    localTime = flight.timeToStand;
    destination = flight['airportFromID.city_en'];

    if (status === 'LN') {
      actualTime = toTimeString(actual);
    }
  } else {
    localTime = flight.timeDepExpectCalc;
    destination = flight['airportToID.city_en'];

    if (flight.timeTakeofFact && status === 'DP') {
      actualTime = toTimeString(flight.timeTakeofFact);
    }
  }

  const preparedLocalTime = toTimeString(localTime);

  return (
    <tr>
      <td
        className={classNames('flights-table__terminal-col', {
          blue: term === 'D',
        })}
      >
        <span>{term}</span>
      </td>
      <td>{preparedLocalTime}</td>
      <td>{destination}</td>
      <td>{`${statusFlight(status)} ${actualTime}`}</td>
      <td>{airline.en.name}</td>
      <td>{codeShareData[0].codeShare}</td>
    </tr>
  );
};

export default Flight;
