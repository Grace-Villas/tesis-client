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

export const setInstallationValue = (key, value) => ({
   type: types.SET_VALUE,
   payload: { key, value }
});

export const setInstallationError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startInstallSystem = (data, setStep) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const response = await request({
            path: '/installation',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: {
               ...data,
               country: 'venezuela', locale: 'es-VE', phoneExtension: '+58'
            }
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

         const step2 = ['firstName', 'lastName', 'email', 'password'];
         const step3 = ['companyName', 'companyEmail', 'companyContactEmail', 'companyPhone', 'palletDay', 'state', 'city', 'address'];

         errors.forEach(error => {
            if (step3.includes(error.param)) {
               setStep(3);
            }
         });

         dispatch(setInstallationError('companyName', errors.find(err => err.param === 'companyName')?.msg || null));
         dispatch(setInstallationError('companyEmail', errors.find(err => err.param === 'companyEmail')?.msg || null));
         dispatch(setInstallationError('companyContactEmail', errors.find(err => err.param === 'companyContactEmail')?.msg || null));
         dispatch(setInstallationError('companyPhone', errors.find(err => err.param === 'companyPhone')?.msg || null));
         dispatch(setInstallationError('palletDay', errors.find(err => err.param === 'palletDay')?.msg || null));
         dispatch(setInstallationError('state', errors.find(err => err.param === 'state')?.msg || null));
         dispatch(setInstallationError('city', errors.find(err => err.param === 'city')?.msg || null));
         dispatch(setInstallationError('address', errors.find(err => err.param === 'address')?.msg || null));

         dispatch(setInstallationError('firstName', errors.find(err => err.param === 'firstName')?.msg || null));
         dispatch(setInstallationError('lastName', errors.find(err => err.param === 'lastName')?.msg || null));
         dispatch(setInstallationError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setInstallationError('password', errors.find(err => err.param === 'password')?.msg || null));

         const unhandledErrors = errors.filter(error => ![...step2, ...step3].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }
      
      dispatch(setLoading('create', false));
   }
}