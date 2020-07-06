import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFetchData } from '../utils/interfaces';

const initialState: IFetchData = {
  flights: { arrival: [], departure: [] },
  direction: null,
  fetching: false,
};

export default (state: IFetchData = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.REQUESTING_DATA:
      return { ...state, fetching: true };

    case ActionTypes.RECEIVED_DATA:
      const { flights, direction, date } = action;
      const currentDay = new Date(date).getDate();
      return {
        ...state,
        flights: {
          arrival: [...flights.body.arrival]
            .filter((flight) => {
              const flightDay = new Date(flight.timeToStand).getDate();

              return currentDay === flightDay;
            })
            .sort((a, b) => {
              return Date.parse(a.timeToStand) - Date.parse(b.timeToStand);
            }),
          departure: [...flights.body.departure]
            .filter((flight) => {
              const flightDay = new Date(flight.timeDepExpectCalc).getDate();

              return currentDay === flightDay;
            })
            .sort((a, b) => {
              return (
                Date.parse(a.timeDepExpectCalc) -
                Date.parse(b.timeDepExpectCalc)
              );
            }),
        },
        direction,
        fetching: false,
      };

    default:
      return state;
  }
};

//selector
export const getFlights = (state: IFetchData) => state.flights;
export const getFetching = (state: IFetchData) => state.fetching;
export const getDirection = (state: IFetchData) => state.direction;
