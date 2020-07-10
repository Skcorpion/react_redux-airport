import { IFlights } from '../utils/flightsTypes';

const API_URL = 'https://api.iev.aero/api/flights/';
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getData = async <T>(url: string): Promise<T> => {
  await delay(1000);
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getFlightsFromServer = async (date: string) => {
  return getData<IFlights>(`${API_URL}${date}`);
};
