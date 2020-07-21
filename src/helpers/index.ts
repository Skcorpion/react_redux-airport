import { toDateFormat, stringifyDate, getStringTime } from './dateFunctions';
import { statusFlight } from './statusFlight';
import { getFlightDetails } from './flightDetails';
import { Arrival, Departure } from '../utils/flightsTypes';

export {
  // -------- Date functions --------
  toDateFormat,
  stringifyDate,
  getStringTime,
  // -------- Flight status --------
  statusFlight,
  // -------- Flight details --------
  getFlightDetails,
};

export function isArrival(flight: Arrival | Departure): flight is Arrival {
  return (flight as Arrival).timeLandCalc !== undefined;
}
