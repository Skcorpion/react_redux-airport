import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../utils/interfaces';
import { loadFlight } from '../../actions';
import { getFlight } from '../../reducers';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import './FlightDetails.scss';
import { isArrival, getFlightDetails } from '../../helpers';
import { statusFlight, getStringTime } from '../../helpers';

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
    loadFlight(date, flightId);
    // eslint-disable-next-line
  }, [date, flightId]);

  if (flight) {
    const { term, status, codeShareData } = flight;
    const flightDetails = { ...getFlightDetails(flight) };
    const { localTime, actualTime, destination, stand, gate } = flightDetails;

    const preparedDate = date.split('-').slice(0, 2).join('.');
    const preparedFullDate = date.split('-').join('.');
    const preparedLocalTime = getStringTime(localTime);
    const flightNumber = codeShareData[0].codeShare;
    const flightStatus = `${statusFlight(status)}${
      actualTime
        ? `${status === 'DP' ? ' at' : ''} ${actualTime}, ${preparedFullDate}`
        : ''
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
      <div className="container flight__container">
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
