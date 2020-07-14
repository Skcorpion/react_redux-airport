import { IFlights, IFlight } from '../utils/flightsTypes';

const API_URL = 'https://api.iev.aero/api/flights/';
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getFlightsFromServer = async (date: string) => {
  await delay(1000);
  return getData<IFlights>(`${API_URL}${date}`);
};

export const getFlightFromServer = async (date: string, id: string) => {
  return getData<IFlight>(`${API_URL}${date}/${id}`);
};
