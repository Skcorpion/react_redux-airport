import { ISort } from '../utils/interfaces';
import { Actions, ActionTypes } from '../utils/actionTypes';

const initialState = {
  filteredQuery: ''
};

export default (state: ISort = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_FILTERED_QUERY:
      return { ...state, filteredQuery: action.filteredQuery };

    default:
      return state;
  }
};

//selectors
export const getFilteredQuery = (state: ISort) => state.filteredQuery;