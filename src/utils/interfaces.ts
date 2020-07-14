import { Body, Departure, Arrival } from './flightsTypes';

export enum DirectionTypes {
  ARRIVAL = 'arrival',
  DEPARTURE = 'departure',
}

export type IDirection =
  | typeof DirectionTypes.ARRIVAL
  | typeof DirectionTypes.DEPARTURE
  | null;

export interface ISort {
  filteredQuery: string;
}

export interface IFetchFlights {
  flights: Body;
  direction: IDirection;
  fetching: boolean;
}

export interface IFetchFlight {
  flight: Arrival | Departure | null;
  fetching: boolean;
}

export interface RootState {
  sortReducer: ISort;
  fetchFlights: IFetchFlights;
  fetchFlight: IFetchFlight;
}
