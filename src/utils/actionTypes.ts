import { IFlights } from './flightsTypes';
import { IDirection } from './interfaces';

/*
 * action types
 */
export enum ActionTypes {
  REQUESTING_DATA = 'REQUESTING_DATA',
  RECEIVED_DATA = 'RECEIVED_DATA',
  SET_FILTERED_QUERY = 'SET_FILTERED_QUERY',
}
/*
 * actions
 */
interface RequestingDataAction {
  type: typeof ActionTypes.REQUESTING_DATA;
}
interface ReceivedDataAction {
  type: typeof ActionTypes.RECEIVED_DATA;
  flights: IFlights;
  direction: IDirection;
  date: string;
}
interface SetFilteredQueryAction {
  type: typeof ActionTypes.SET_FILTERED_QUERY;
  filteredQuery: string;
}

export type Actions =
  | RequestingDataAction
  | ReceivedDataAction
  | SetFilteredQueryAction;
