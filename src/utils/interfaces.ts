import { Body } from './flightsTypes';

export interface ISort {
  filteredQuery: string;
}

export interface IFetchData {
  flights: Body;
  direction: string;
  fetching: boolean;
}

export interface RootState {
  sortReducer: ISort;
  fetchData: IFetchData;
}
