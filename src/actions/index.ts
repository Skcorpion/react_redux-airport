import { loadFlights, loadFlight, unmountFlight } from './fetchDataActions';
import { setFilteredQueryWithDelay } from './sortActions';

export {
  // -------- Fetch data actions --------
  loadFlights,
  loadFlight,
  unmountFlight,
  // -------- Sort actions --------
  setFilteredQueryWithDelay as setFilteredQuery,
};
