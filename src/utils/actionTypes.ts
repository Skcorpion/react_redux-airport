import { IFlights, IFlight } from './flightsTypes';
import { IDirection } from './interfaces';

/*
 * action types
 */
export enum ActionTypes {
  REQUESTING_FLIGHTS = 'REQUESTING_FLIGHTS',
  REQUESTING_FLIGHT = 'REQUESTING_FLIGHT',
  RECEIVED_FLIGHTS = 'RECEIVED_FLIGHTS',
  RECEIVED_FLIGHT = 'RECEIVED_FLIGHT',
  UNMOUNT_FLIGHT = 'UNMOUNT_FLIGHT',
  SET_FILTERED_QUERY = 'SET_FILTERED_QUERY',
}
/*
 * actions
 */
interface RequestingFlightsAction {
  type: typeof ActionTypes.REQUESTING_FLIGHTS;
}
interface RequestingFlightAction {
  type: typeof ActionTypes.REQUESTING_FLIGHT;
}
interface ReceivedFlightsAction {
  type: typeof ActionTypes.RECEIVED_FLIGHTS;
  flights: IFlights;
  direction: IDirection;
  date: string;
}
interface ReceivedFlightAction {
  type: typeof ActionTypes.RECEIVED_FLIGHT;
  flight: IFlight;
}
interface UnmountFlightAction {
  type: typeof ActionTypes.UNMOUNT_FLIGHT;
}
interface SetFilteredQueryAction {
  type: typeof ActionTypes.SET_FILTERED_QUERY;
  filteredQuery: string;
}

export type Actions =
  | RequestingFlightsAction
  | RequestingFlightAction
  | ReceivedFlightsAction
  | ReceivedFlightAction
  | UnmountFlightAction
  | SetFilteredQueryAction;
