import { ActionTypes, Actions } from '../utils/actionTypes';
import { Dispatch } from 'react';
import { delay } from '../api';

/*
 * action creators
 */
const setFilteredQuery = (filteredQuery: string): Actions => ({
  type: ActionTypes.SET_FILTERED_QUERY,
  filteredQuery,
});

export const setFilteredQueryWithDelay = (filteredQuery: string) => {
  return async function (dispatch: Dispatch<Actions>) {
    await delay(1000);
    dispatch(setFilteredQuery(filteredQuery));
  };
};
