import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../utils/interfaces';
import { loadFlight } from '../../actions';
import { getFlight } from '../../reducers';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import './FlightDetails.scss';
import { isArrival } from '../VisibleFlights/Flight';
import { statusFlight } from '../../utils/statusFlight';

type Params = { direction: string; flightId: string };

const FlightDetails: FC<ConnectedProps<typeof connector>> = ({
  flight,
  loadFlight,
}) => {
  const location = useLocation();
  const params: Params = useParams();
  const pathname = params.direction;
  const flightId = params.flightId;
  const searchParams = new URLSearchParams(location.search);

  const date = searchParams.get('dt') || '';

  useEffect(() => {
    console.log('Load data from:', flightId, ', date:', date);

    loadFlight(date, flightId);
    // eslint-disable-next-line
  }, [date, flightId]);

  if (flight) {
    const { term, status, codeShareData, actual } = flight;
    let localTime = '',
      actualTime = '',
      destination = '',
      stand: string | undefined = undefined,
      gate: string | undefined = undefined;

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
      stand = flight.checkinNo;
      gate = flight.gateNo;

      if (flight.timeTakeofFact && status === 'DP') {
        actualTime = `at ${toTimeString(flight.timeTakeofFact)}`;
      }
    }
    const preparedDate = date.split('-').slice(0, 2).join('.');
    const preparedFullDate = date.split('-').join('.');
    const preparedLocalTime = toTimeString(localTime);
    const flightNumber = codeShareData[0].codeShare;
    const flightStatus = `${statusFlight(status)}${
      actualTime ? ` ${actualTime}, ${preparedFullDate}` : ''
    }`;

    const flightInfoHeaders = {
      Date: preparedDate,
      Time: preparedLocalTime,
      Terminal: term,
      Flight: flightNumber,
      Gate: gate,
      Stand: stand,
    };
    const flightInfoList: {
      header: string;
      value: string | undefined;
    }[] = Object.entries(flightInfoHeaders)
      .map(([key, value]) => ({
        header: key,
        value: value,
      }))
      .filter(({ value }) => value);

    return (
      <div className="flight__container">
        <div className="flight__back-button">
          <NavLink to={`/${pathname}?date=${date}`}>Back</NavLink>
        </div>
        <div className="flight__info-details">
          <div className="flight__flight-number">
            <b>{flightNumber}</b> flies {isArrival(flight) ? 'from' : 'in'}
          </div>
          <div className="flight__city-name">{destination}</div>
          <div className="flight__title">Flight information:</div>
          <div className="flight__details">
            <ul>
              {flightInfoList.map(({ header, value }) => (
                <li key={header}>
                  <p className="flight__details-label">{header}</p>
                  <p className="flight__details-value">
                    <b>{value}</b>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flight__status">{flightStatus}</div>
        </div>
      </div>
    );
  }
  return <p>Loading...</p>;
};

const mapStateToProps = (state: RootState) => ({
  flight: getFlight(state),
});
const connector = connect(mapStateToProps, { loadFlight });
export default connector(FlightDetails);
