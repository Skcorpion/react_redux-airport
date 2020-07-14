import { RootState, DirectionTypes } from '../utils/interfaces';
import { createSelector } from 'reselect';
import sortReducer, * as fromSort from './sortReducer';
import fetchFlights, * as fromFetchFlights from './fetchFlights';
import fetchFlight, * as fromFetchFlight from './fetchFlight';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  fetchFlights,
  sortReducer,
  fetchFlight,
});

//selector
export const getFlights = (state: RootState) =>
  fromFetchFlights.getFlights(state.fetchFlights);
export const getFetching = (state: RootState) =>
  fromFetchFlights.getFetching(state.fetchFlights);
export const getDirection = (state: RootState) =>
  fromFetchFlights.getDirection(state.fetchFlights);

export const getFlight = (state: RootState) =>
  fromFetchFlight.getFlight(state.fetchFlight);
export const getFlightFetching = (state: RootState) =>
  fromFetchFlight.getFetching(state.fetchFlight);

export const getFilteredQuery = (state: RootState) =>
  fromSort.getFilteredQuery(state.sortReducer);

export const getVisibleFlights = createSelector(
  [getFlights, getDirection, getFilteredQuery],
  (flights, direction, filteredQuery) => {
    const pattern = new RegExp(filteredQuery, 'i');

    if (direction === DirectionTypes.DEPARTURE) {
      return [
        ...flights.departure.filter(
          (flight) =>
            pattern.test(flight.codeShareData[0].codeShare) ||
            pattern.test(flight['airportToID.city_en']) ||
            pattern.test(flight.airline.en.name)
        ),
      ];
    } else if (direction === DirectionTypes.ARRIVAL) {
      return [
        ...flights.arrival.filter(
          (flight) =>
            pattern.test(flight.codeShareData[0].codeShare) ||
            pattern.test(flight['airportFromID.city_en']) ||
            pattern.test(flight.airline.en.name)
        ),
      ];
    }

    return [];
  }
);
