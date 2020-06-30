import React, { FC, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../utils/interfaces';
import { getVisibleFlights, getFetching } from '../reducers';
import { loadData } from '../actions';
import { useLocation } from 'react-router-dom';
import { Departure, Arrival } from '../utils/flightsTypes';
import Flight from './Flight';

const VisibleFlights: FC<ConnectedProps<typeof connector>> = ({
  flights,
  fetching,
  loadData,
}) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\//, '').replace(/e?s\b/, '');
  const searchParams = new URLSearchParams(location.search);

  const currentDate = new Date().toLocaleDateString().split('.').join('-');
  const date = searchParams.get('date') || currentDate;
  const preparedDate = date.split('-').reverse().join('-');

  useEffect(() => {
    console.log('reload data from:', pathname, ', date:', preparedDate);

    loadData(preparedDate, pathname);
    // eslint-disable-next-line
  }, [pathname, preparedDate]);

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
        <tbody>
          {(flights as Array<Arrival | Departure>).map((flight) => (
            <Flight key={flight.ID} flight={flight} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="nothing-found">
      {fetching ? <span>Loading</span> : <span>No flights</span>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  flights: getVisibleFlights(state),
  fetching: getFetching(state),
});

const connector = connect(mapStateToProps, { loadData });
export default connector(VisibleFlights);
