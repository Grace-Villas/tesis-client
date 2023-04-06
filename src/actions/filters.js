import { types } from '../reducers/filtersReducer';



// Actions

export const setFilter = (key, value) => ({
   type: types.SET_FILTER,
   payload: { key, value }
});

export const resetFilters = () => ({
   type: types.RESET_FILTERS
});