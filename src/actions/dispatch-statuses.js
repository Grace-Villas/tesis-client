import { arrayErrorToast } from '../helpers/alerts';
import { capitalizeAllWords } from '../helpers/format';
import { request } from '../helpers/request';
import { types } from '../reducers/dispatchStatusesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setDispatchStatuses = (rows) => ({
   type: types.SET_DISPATCH_STATUSES_LIST,
   payload: rows
});

export const startGetDispatchStatuses = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dispatch-statuses',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => ({
            text: capitalizeAllWords(row.name),
            value: row.id
         }));

         dispatch(setDispatchStatuses(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}