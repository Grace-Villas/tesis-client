import { types } from '../reducers/tablesReducer';



// Actions

export const setPerPage = (perPage) => ({
   type: types.SET_PER_PAGE,
   payload: perPage
});