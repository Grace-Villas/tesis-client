import { arrayErrorToast } from '../helpers/alerts';
import { capitalizeAllWords } from '../helpers/format';
import { request } from '../helpers/request';
import { types } from '../reducers/permissionsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setPermissionsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const setPermissionsList = (rows) => ({
   type: types.SET_PERMISSIONS_LIST,
   payload: rows
});

export const startGetPermissionsList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/permissions',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => ({
            text: capitalizeAllWords(row.showName),
            value: row.id
         }));

         dispatch(setPermissionsList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}



// Form control

export const handleRowChange = (value, index, key) => ({
   type: types.HANDLE_ROW_CHANGE,
   payload: { value, index, key }
});

export const handleAddRow = (permissionId, list, create, edit, del) => ({
   type: types.ADD_ROW,
   payload: { permissionId, list, create, edit, del }
});

export const handleDeleteRow = (index) => ({
   type: types.DELETE_ROW,
   payload: index
});

export const handleResetRows = () => ({
   type: types.RESET_ROW_FIELDS
});