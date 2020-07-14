import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFlights, IFlight } from '../utils/flightsTypes';
import { Dispatch } from 'react';
import { getFlightsFromServer, getFlightFromServer } from '../api';
import { IDirection } from '../utils/interfaces';

/*
 * action creators
 */
const requestingFlights = (): Actions => ({
  type: ActionTypes.REQUESTING_FLIGHTS,
});
const receivedFlights = (
  flights: IFlights,
  direction: IDirection,
  date: string
): Actions => ({
  type: ActionTypes.RECEIVED_FLIGHTS,
  flights,
  direction,
  date,
});

export const loadFlights = (date: string, direction: IDirection) => {
  return async function (dispatch: Dispatch<Actions>) {
    dispatch(requestingFlights());

    const flights = await getFlightsFromServer(date);
    dispatch(receivedFlights(flights, direction, date));
  };
};

const requestingFlight = (): Actions => ({
  type: ActionTypes.REQUESTING_FLIGHT,
});
const receivedFlight = (flight: IFlight): Actions => ({
  type: ActionTypes.RECEIVED_FLIGHT,
  flight,
});

export const loadFlight = (date: string, id: string) => {
  return async function (dispatch: Dispatch<Actions>) {
    dispatch(requestingFlight());

    const flight = await getFlightFromServer(date, id);
    dispatch(receivedFlight(flight));
  };
};
