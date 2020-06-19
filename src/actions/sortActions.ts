import { ActionTypes, Actions } from '../utils/actionTypes';

/*
 * action creators
 */
export const setFilteredQuery = (filteredQuery: string): Actions => ({
  type: ActionTypes.SET_FILTERED_QUERY,
  filteredQuery,
});