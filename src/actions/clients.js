import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/clientsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setClientsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateClient = ({ name, address, email, cityId, phone, rut }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/companies',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, address, email, cityId, phone, rut }
         });

         const { id, name: createdName } = response.data;

         const clientName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El cliente: ${clientName}, fue creado satisfactoriamente`);

         navigate(`/clients/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setClientsError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setClientsError('address', errors.find(err => err.param === 'address')?.msg || null));
         dispatch(setClientsError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setClientsError('cityId', errors.find(err => err.param === 'cityId')?.msg || null));
         dispatch(setClientsError('phone', errors.find(err => err.param === 'phone')?.msg || null));
         dispatch(setClientsError('rut', errors.find(err => err.param === 'rut')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'address', 'email', 'cityId', 'phone', 'rut'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setClients = (rows, count, pages) => ({
   type: types.SET_CLIENTS,
   payload: { rows, count, pages }
});

export const startGetClients = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/companies?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => {
            const clientName = capitalizeAllWords(row.name);
            const cityName = capitalizeAllWords(row.city.name);
            const stateName = capitalizeAllWords(row.city.state.name);
            const countryName = capitalizeAllWords(row.city.state.country.name);

            return {
               ...row,
               name: clientName,
               rut: row.rut.toLocaleUpperCase(),
               city: {
                  ...row.city,
                  name: cityName,
                  state: {
                     ...row.city.state,
                     name: stateName,
                     country: {
                        ...row.city.state.country,
                        name: countryName
                     }
                  }
               }
            }
         });

         dispatch(setClients(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteClient = (id, { page, perPage, navigate }, filters = {}) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el cliente seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/companies/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const clientName = capitalizeAllWords(name);

            simpleSuccessToast(`El cliente: ${clientName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetClients(page, perPage, filters));
            } else {
               navigate('/clients');
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

export const setClient = (client) => ({
   type: types.SET_CLIENT_DATA,
   payload: client
});

export const startGetClient = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/companies/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const client = response.data;

         client.name = capitalizeAllWords(client.name);
         client.city.name = capitalizeAllWords(client.city.name);
         client.city.state.name = capitalizeAllWords(client.city.state.name);
         client.city.state.country.name = capitalizeAllWords(client.city.state.country.name);

         client.rut = client.rut.toLocaleUpperCase();

         dispatch(setClient(client));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateClient = (id, { name, address, email, cityId, phone, rut }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/companies/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, address, email, cityId, phone, rut }
         });

         const client = response.data;

         client.name = capitalizeAllWords(client.name);
         client.city.name = capitalizeAllWords(client.city.name);
         client.city.state.name = capitalizeAllWords(client.city.state.name);
         client.city.state.country.name = capitalizeAllWords(client.city.state.country.name);

         client.rut = client.rut.toLocaleUpperCase();

         simpleSuccessToast(`El cliente: ${client.name}, fue actualizado satisfactoriamente`);

         dispatch(setClient(client));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setClientsError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setClientsError('address', errors.find(err => err.param === 'address')?.msg || null));
         dispatch(setClientsError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setClientsError('cityId', errors.find(err => err.param === 'cityId')?.msg || null));
         dispatch(setClientsError('phone', errors.find(err => err.param === 'phone')?.msg || null));
         dispatch(setClientsError('rut', errors.find(err => err.param === 'rut')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'address', 'email', 'cityId', 'phone', 'rut'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setClientsList = (rows) => ({
   type: types.SET_CLIENTS_LIST,
   payload: rows
});

export const startGetClientsList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/companies',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => ({
            text: row.name,
            value: row.id
         }));

         dispatch(setClientsList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}