import React, { FC } from 'react';
import { Arrival, Departure } from '../utils/flightsTypes';

type Props = {
  flight: Arrival | Departure;
};

const Flight: FC<Props> = ({ flight }) => {
  function isArrival(flight: Arrival | Departure): flight is Arrival {
    return (flight as Arrival).timeLandCalc !== undefined;
  }
  let localTime = '',
    destination = '';

  let { term, status, airline, codeShareData, actual } = flight;

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
      actual = toTimeString(flight.actual);
      status = 'Landed';
    } else {
      actual = '';
    }
  } else {
    localTime = flight.timeDepExpectCalc;
    destination = flight['airportToID.city_en'];

    if (flight.timeTakeofFact) {
      actual = toTimeString(flight.timeTakeofFact);
    } else {
      actual = '';
    }

    status = status === 'DP' ? 'Departed at' : status;
  }

  status = status === 'CX' ? 'Cancelled' : status;
  status = status === 'BD' ? 'Boarding' : status;
  status = status === 'CK' ? 'Check-in' : status;
  status = status === 'ON' ? 'On time' : status;
  status = status === 'FR' ? 'In flight' : status;
  const preparedLocalTime = toTimeString(localTime);

  return (
    <tr>
      <td>{term}</td>
      <td>{preparedLocalTime}</td>
      <td>{destination}</td>
      <td>{`${status} ${actual}`}</td>
      <td>{airline.en.name}</td>
      <td>{codeShareData[0].codeShare}</td>
    </tr>
  );
};

export default Flight;
