import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/receiversReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setReceiversError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateReceiver = ({ cityId, name, rut, address, phone }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/receivers',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { cityId, name, rut, address, phone }
         });

         const { id, name: createdName } = response.data;

         const receiverName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El destinatario: ${receiverName}, fue creado satisfactoriamente`);

         navigate(`/receivers/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setReceiversError('cityId', errors.find(err => err.param === 'cityId')?.msg || null));
         dispatch(setReceiversError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setReceiversError('rut', errors.find(err => err.param === 'rut')?.msg || null));
         dispatch(setReceiversError('address', errors.find(err => err.param === 'address')?.msg || null));
         dispatch(setReceiversError('phone', errors.find(err => err.param === 'phone')?.msg || null));

         const unhandledErrors = errors.filter(error => !['cityId', 'name', 'rut', 'address', 'phone'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setReceivers = (rows, count, pages) => ({
   type: types.SET_RECEIVERS,
   payload: { rows, count, pages }
});

export const startGetReceivers = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/receivers?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => {
            const receiverName = capitalizeAllWords(row.name);
            const cityName = capitalizeAllWords(row.city.name);
            const stateName = capitalizeAllWords(row.city.state.name);

            return {
               ...row,
               name: receiverName,
               city: {
                  ...row.city,
                  name: cityName,
                  state: {
                     ...row.state,
                     name: stateName
                  }
               }
            }
         });

         dispatch(setReceivers(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteReceiver = (id, { page, perPage, navigate }, filters = {}) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el destinatario seleccionada?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/receivers/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const receiverName = capitalizeAllWords(name);

            simpleSuccessToast(`El destinatario: ${receiverName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetReceivers(page, perPage, filters));
            } else {
               navigate('/receivers');
            }
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const setReceiver = (city) => ({
   type: types.SET_RECEIVER_DATA,
   payload: city
});

export const startGetReceiver = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/receivers/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const receiver = response.data;

         receiver.name = capitalizeAllWords(receiver.name);
         receiver.city.name = capitalizeAllWords(receiver.city.name);
         receiver.city.state.name = capitalizeAllWords(receiver.city.state.name);

         dispatch(setReceiver(receiver));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateReceiver = (id, { cityId, name, rut, address, phone }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/receivers/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { cityId, name, rut, address, phone }
         });

         const city = response.data;

         const receiverName = capitalizeAllWords(city.name);

         simpleSuccessToast(`La ciudad: ${receiverName}, fue actualizada satisfactoriamente`);

         dispatch(setReceiver(city));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setReceiversError('cityId', errors.find(err => err.param === 'cityId')?.msg || null));
         dispatch(setReceiversError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setReceiversError('rut', errors.find(err => err.param === 'rut')?.msg || null));
         dispatch(setReceiversError('address', errors.find(err => err.param === 'address')?.msg || null));
         dispatch(setReceiversError('phone', errors.find(err => err.param === 'phone')?.msg || null));

         const unhandledErrors = errors.filter(error => !['cityId', 'name', 'rut', 'address', 'phone'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setReceiversList = (rows) => ({
   type: types.SET_RECEIVERS_LIST,
   payload: rows
});

export const startGetReceiversList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/receivers',
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

         dispatch(setReceiversList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}