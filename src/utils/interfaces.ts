import { Body } from './flightsTypes';

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

export interface IFetchData {
  flights: Body;
  direction: IDirection;
  fetching: boolean;
}

export interface RootState {
  sortReducer: ISort;
  fetchData: IFetchData;
}
