import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFetchData } from '../utils/interfaces';

const initialState: IFetchData = {
  flights: { arrival: [], departure: [] },
  direction: '',
  fetching: false,
};

export default (state: IFetchData = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.REQUESTING_DATA:
      return { ...state, fetching: true };

    case ActionTypes.RECEIVED_DATA:
      const { flights, direction, date } = action;
      const arrival = direction === 'arrival';
      return {
        ...state,
        flights: {
          [arrival ? 'arrival' : 'departure']: [
            ...flights.body[arrival ? 'arrival' : 'departure'],
          ].filter((flight) => {
            const currentDay = new Date(date).getDate();
            const flightDay = new Date(flight.actual).getDate();

            return currentDay === flightDay;
          }),
        },
        direction: arrival ? 'arrival' : 'departure',
        fetching: false,
      };

    default:
      return state;
  }
};

//selector
export const getFlights = (state: IFetchData) => state.flights;
export const getDirection = (state: IFetchData) => state.direction;
