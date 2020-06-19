import { IFlights } from '../utils/flightsTypes';

const API_URL = 'https://api.iev.aero/api/flights/';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getFlightsFromServer = async (date: string) => {
  return getData<IFlights>(`${API_URL}${date}`);
};
