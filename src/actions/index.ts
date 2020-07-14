import { loadFlights, loadFlight } from './fetchDataActions';
import { setFilteredQueryWithDelay } from './sortActions';

export {
  // -------- Fetch data actions --------
  loadFlights,
  loadFlight,
  // -------- Sort actions --------
  setFilteredQueryWithDelay as setFilteredQuery,
};
