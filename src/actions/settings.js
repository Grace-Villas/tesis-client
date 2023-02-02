import { types } from '../reducers/settingsReducer';
import { request } from '../helpers/request';
import { accountSuccessToast } from '../helpers/alerts';



// shared actions
import { setAuthAttribute } from './auth';



// Actions

export const setSettingsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error}
});

export const startUpdateAccount = (name, email) => {
   return async (dispatch, getState) => {
      dispatch(setLoading('account', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');
         
         const { id } = getState().auth;

         const response = await request({
            path: `/auth/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, email }
         });

         const user = response.data;

         dispatch(setAuthAttribute('name', user.name));
         dispatch(setAuthAttribute('email', user.email));

         accountSuccessToast();
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setSettingsError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setSettingsError('email', errors.find(err => err.param === 'email')?.msg || null));
      }
      
      dispatch(setLoading('account', false));
   }
}



// Loading
export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});