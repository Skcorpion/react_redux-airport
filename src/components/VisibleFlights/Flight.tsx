import React, { FC } from 'react';
import { Arrival, Departure } from '../../utils/flightsTypes';
import classNames from 'classnames';
import FlightDetailsLink from './FlightDetailsLink';
import { getStringTime, statusFlight, getFlightDetails } from '../../helpers';

type Props = {
  flight: Arrival | Departure;
};

const Flight: FC<Props> = React.memo(({ flight }) => {
  const { term, status, codeShareData, airline } = flight;
  const flightDetails = { ...getFlightDetails(flight) };
  const { localTime, actualTime, destination } = flightDetails;
  const preparedLocalTime = getStringTime(localTime);

  return (
    <>
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
      <td className="flights-table__airline-col">
        <img src={airline.en.logoSmallName} alt={airline.en.name} />
        <span>{airline.en.name}</span>
      </td>
      <td className="flights-table__flight-col">
        {codeShareData[0].codeShare}
      </td>
      <td className="flights-table__details-field">
        <FlightDetailsLink flightId={flight.ID} />
      </td>
    </>
  );
});

export default Flight;
