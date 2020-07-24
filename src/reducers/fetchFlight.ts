import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFetchFlight } from '../utils/interfaces';

const initialState: IFetchFlight = {
  flight: null,
  fetching: false,
};

export default (state: IFetchFlight = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.REQUESTING_FLIGHT:
      return { ...state, fetching: true };

    case ActionTypes.RECEIVED_FLIGHT:
      const { flight } = action;
      return {
        ...state,
        flight: { ...flight.body },
        fetching: false,
      };

    case ActionTypes.UNMOUNT_FLIGHT:
      return {
        ...state,
        flight: null,
      };

    default:
      return state;
  }
};

//selector
export const getFlight = (state: IFetchFlight) => state.flight;
export const getFetching = (state: IFetchFlight) => state.fetching;
