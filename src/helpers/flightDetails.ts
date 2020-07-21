import { Departure, Arrival } from '../utils/flightsTypes';
import { isArrival, getStringTime } from '.';

export function getFlightDetails(flight: Arrival | Departure) {
  const { status, actual } = flight;
  let localTime = '',
    actualTime = '',
    destination = '',
    stand: string | undefined = undefined,
    gate: string | undefined = undefined;

  if (isArrival(flight)) {
    localTime = flight.timeToStand;
    destination = flight['airportFromID.city_en'];

    if (status === 'LN') {
      actualTime = getStringTime(actual);
    }
  } else {
    localTime = flight.timeDepExpectCalc;
    destination = flight['airportToID.city_en'];
    stand = flight.checkinNo;
    gate = flight.gateNo;

    if (flight.timeTakeofFact && status === 'DP') {
      actualTime = getStringTime(flight.timeTakeofFact);
    }
  }

  return {
    localTime,
    actualTime,
    destination,
    stand,
    gate,
  };
}
