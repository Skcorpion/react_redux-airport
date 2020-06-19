import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFlights } from '../utils/flightsTypes';
import { Dispatch } from 'react';
import { getFlightsFromServer } from '../api';

/*
 * action creators
 */
const requestingData = (): Actions => ({
  type: ActionTypes.REQUESTING_DATA,
});
const receivedData = (
  flights: IFlights,
  direction: string,
  date: string
): Actions => ({
  type: ActionTypes.RECEIVED_DATA,
  flights,
  direction,
  date,
});

export const loadData = (date: string, direction: string) => {
  return async function (dispatch: Dispatch<Actions>) {
    dispatch(requestingData());

    const flights = await getFlightsFromServer(date);
    dispatch(receivedData(flights, direction, date));
  };
};
