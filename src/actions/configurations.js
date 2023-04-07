import { arrayErrorToast, simpleSuccessToast } from '../helpers/alerts';
import { request } from '../helpers/request';
import { handleInvalidCurrency, handleInvalidEmail, handleInvalidPhone, handleRequired } from '../helpers/validations';
import { types } from '../reducers/configurationsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setConfigurations = (config) => ({
   type: types.SET_CONFIG,
   payload: config
});

export const startGetConfigurations = () => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/config',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const config = response.data;

         const configArray = [
            { key: 'companyName', value: 'Nombre de la compañía', handleInvalid: (value) => handleRequired(value, 'El nombre de la compañía es obligatorio') },
            { key: 'companyEmail', value: 'Correo de la compañía', handleInvalid: handleInvalidEmail },
            { key: 'companyContactEmail', value: 'Correo de contacto de la compañía', handleInvalid: handleInvalidEmail },
            { key: 'companyPhone', value: 'Teléfono de contacto de la compañía', handleInvalid: handleInvalidPhone },
            { key: 'palletDay', value: 'Costo de almacenamiento de paleta por día', handleInvalid: (value) => handleInvalidCurrency(value, 'costo de paleta por día') },
            { key: 'state', value: 'Estado de ubicación de la compañía', handleInvalid: (value) => handleRequired(value, 'El estado es obligatorio') },
            { key: 'city', value: 'Ciudad de ubicación de la compañía', handleInvalid: (value) => handleRequired(value, 'La ciudad es obligatoria') },
            { key: 'address', value: 'Dirección de la compañía', handleInvalid: (value) => handleRequired(value, 'La dirección es obligatoria') },
         ];

         const configs = configArray.map(conf => ({
            ...config[conf.key],
            key: conf.value,
            handleInvalid: conf.handleInvalid
         }));

         dispatch(setConfigurations(configs));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateConfig = (id, value) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         await request({
            path: `/config/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { value }
         });

         simpleSuccessToast('Configuraciones actualizadas satisfactoriamente');

         dispatch(startGetConfigurations());
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         if (errors.length > 0) {
            arrayErrorToast(errors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}