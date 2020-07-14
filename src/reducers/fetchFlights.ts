import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFetchFlights } from '../utils/interfaces';

const initialState: IFetchFlights = {
  flights: { arrival: [], departure: [] },
  direction: null,
  fetching: false,
};

export default (state: IFetchFlights = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.REQUESTING_FLIGHTS:
      return { ...state, fetching: true };

    case ActionTypes.RECEIVED_FLIGHTS:
      const { flights, direction, date } = action;
      const preparedDate = date.split('-').reverse().join('-');
      const currentDay = new Date(preparedDate).getDate();
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
export const getFlights = (state: IFetchFlights) => state.flights;
export const getFetching = (state: IFetchFlights) => state.fetching;
export const getDirection = (state: IFetchFlights) => state.direction;
