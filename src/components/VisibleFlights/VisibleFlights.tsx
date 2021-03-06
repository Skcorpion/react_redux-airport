import React, { FC, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState, DirectionTypes } from '../../utils/interfaces';
import { getVisibleFlights, getFetching } from '../../reducers';
import { loadFlights } from '../../actions';
import { useLocation, useParams } from 'react-router-dom';
import { Departure, Arrival } from '../../utils/flightsTypes';
import Flight from './Flight';
import './VisibleFlights.scss';
import { stringifyDate } from '../../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const VisibleFlights: FC<ConnectedProps<typeof connector>> = ({
  flights,
  fetching,
  loadFlights,
}) => {
  const location = useLocation();
  const params: { direction: string } = useParams();
  const pathname =
    params.direction === 'arrivals'
      ? DirectionTypes.ARRIVAL
      : params.direction === 'departures'
      ? DirectionTypes.DEPARTURE
      : null;
  const searchParams = new URLSearchParams(location.search);

  const currentDate = stringifyDate(new Date());
  const date = searchParams.get('date') || currentDate;

  useEffect(() => {
    loadFlights(date, pathname);
    // eslint-disable-next-line
  }, [pathname, date]);

  const listOfHeads = [
    'Terminal',
    'Local time',
    'Destination',
    'Status',
    'Airline',
    'Flight',
  ];
  const thList = listOfHeads.map((head, i) => <th key={i}>{head}</th>);
  if (flights.length !== 0) {
    return (
      <table className="flights-table">
        <thead>
          <tr>{thList}</tr>
        </thead>
        <TransitionGroup component={'tbody'}>
          {(flights as Array<Arrival | Departure>).map((flight) => (
            <CSSTransition
              key={flight.ID}
              classNames="list"
              timeout={{ enter: 200, exit: 500 }}
            >
              <tr>
                <Flight flight={flight} />
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </table>
    );
  }
  return (
    <div className="nothing-found">
      {fetching ? <span>Loading...</span> : <span>No flights</span>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  flights: getVisibleFlights(state),
  fetching: getFetching(state),
});

const connector = connect(mapStateToProps, { loadFlights });
export default connector(VisibleFlights);
