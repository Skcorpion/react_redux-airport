import { RootState, DirectionTypes } from '../utils/interfaces';
import { createSelector } from 'reselect';
import sortReducer, * as fromSort from './sortReducer';
import fetchData, * as fromFetchData from './fetchData';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  fetchData,
  sortReducer,
});

//selector
export const getFlights = (state: RootState) =>
  fromFetchData.getFlights(state.fetchData);
export const getFetching = (state: RootState) =>
  fromFetchData.getFetching(state.fetchData);
export const getDirection = (state: RootState) =>
  fromFetchData.getDirection(state.fetchData);

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
