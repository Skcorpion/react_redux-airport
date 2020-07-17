import React, { FC } from 'react';
import { Arrival, Departure } from '../../utils/flightsTypes';
import classNames from 'classnames';
import { statusFlight } from '../../utils/statusFlight';
import FlightDetailsLink from './FlightDetailsLink';
// import { useLocation } from 'react-router-dom';

type Props = {
  flight: Arrival | Departure;
  fetching: boolean;
};

export function isArrival(flight: Arrival | Departure): flight is Arrival {
  return (flight as Arrival).timeLandCalc !== undefined;
}

const Flight: FC<Props> = ({ flight, fetching }) => {
  const { term, status, airline, codeShareData, actual } = flight;
  let localTime = '',
    actualTime = '',
    destination = '';

  const toTimeString = (date: string) => {
    return new Date(date).toLocaleTimeString('en-GB', {
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

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('query') || '';
  // let leaveTo = false;
  // if (query) {
  //   const pattern = new RegExp(query, 'i');
  //   leaveTo =
  //     pattern.test(codeShareData[0].codeShare) ||
  //     pattern.test(destination) ||
  //     pattern.test(airline.en.name)
  //       ? false
  //       : true;
  // }

  return (
    <tr
    // className={classNames({
    //   'list-leave-active list-leave-to': fetching || leaveTo,
    // })}
    >
      <td
        className={classNames('flights-table__terminal-col', {
          blue: term === 'D',
        })}
      >
        <span>{term}</span>
      </td>
      <td className="flights-table__local-time">{preparedLocalTime}</td>
      <td className="flights-table__destination-col">{destination}</td>
      <td className="flights-table__status-col">{`${statusFlight(
        status
      )} ${actualTime}`}</td>
      <td className="flights-table__airline-col">{airline.en.name}</td>
      <td className="flights-table__flight-col">
        {codeShareData[0].codeShare}
      </td>
      <td className="flights-table__details-field">
        <FlightDetailsLink flightId={flight.ID} />
      </td>
    </tr>
  );
};

export default Flight;
