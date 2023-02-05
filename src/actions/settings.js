import { types } from '../reducers/settingsReducer';
import { request } from '../helpers/request';
import { simpleSuccessToast } from '../helpers/alerts';



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

         simpleSuccessToast('Cuenta actualizada satisfactoriamente');
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setSettingsError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setSettingsError('email', errors.find(err => err.param === 'email')?.msg || null));
      }
      
      dispatch(setLoading('account', false));
   }
}

export const startUpdatePassword = (oldPassword, newPassword) => {
   return async dispatch => {
      dispatch(setLoading('security', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/auth/password',
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { oldPassword, newPassword }
         });
         simpleSuccessToast('Contraseña actualizada satisfactoriamente');
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setSettingsError('oldPassword', errors.find(err => err.param === 'oldPassword')?.msg || null));
         dispatch(setSettingsError('newPassword', errors.find(err => err.param === 'newPassword')?.msg || null));
      }
      
      dispatch(setLoading('security', false));
   }
}



// Loading
export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});