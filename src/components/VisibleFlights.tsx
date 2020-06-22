import React, { FC, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../utils/interfaces';
import { getVisibleFlights } from '../reducers';
import { loadData } from '../actions';
import { useLocation } from 'react-router-dom';
import { Departure, Arrival } from '../utils/flightsTypes';
import Flight from './Flight';

const VisibleFlights: FC<ConnectedProps<typeof connector>> = ({
  flights,
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
  return (
    <table>
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
};

const mapStateToProps = (state: RootState) => ({
  flights: getVisibleFlights(state),
});

const connector = connect(mapStateToProps, { loadData });
export default connector(VisibleFlights);
