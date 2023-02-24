import { arrayErrorToast, installationConfirmDialog } from '../helpers/alerts';
import { request } from '../helpers/request';
import { types } from '../reducers/installationReducer';

// External actions
import { startGetData } from './auth';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setInstallationState = (state) => ({
   type: types.SET_INSTALLATION_STATE,
   payload: state
});

export const startChecktInstallation = () => {
   return async dispatch => {
      dispatch(setLoading('install', true));

      try {
         const response = await request({
            path: '/installation',
            headers: {
               'Content-Type': 'application/json'
            }
         });

         const { isInstalled } = response.data;

         dispatch(setInstallationState(isInstalled));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('install', false));
   }
}

export const setInstallationError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startInstallSystem = (firstName, lastName, email, password) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const response = await request({
            path: '/installation',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: { firstName, lastName, email, password }
         });

         const { token } = response.data;
         
         dispatch(setLoading('create', false));

         sessionStorage.setItem('x-token', token);

         const confirmMsg = 'Las credenciales de autenticación serán suministradas al correo electrónico indicado en el registro.';

         const {
            isConfirmed, isDismissed
         } = await installationConfirmDialog('success', '¡Instalación completada satisfactoriamente!', confirmMsg);

         if (isConfirmed || isDismissed) {
            dispatch(startGetData());
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setInstallationError('firstName', errors.find(err => err.param === 'firstName')?.msg || null));
         dispatch(setInstallationError('lastName', errors.find(err => err.param === 'lastName')?.msg || null));
         dispatch(setInstallationError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setInstallationError('password', errors.find(err => err.param === 'password')?.msg || null));

         const unhandledErrors = errors.filter(error => !['firstName', 'lastName', 'email', 'password'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }
      
      dispatch(setLoading('create', false));
   }
}