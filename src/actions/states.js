import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { queryParamsFilter } from '../helpers/format';
import { capitalizeAllWords } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/statesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setStatesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateState = ({ name, countryId }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/states',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, countryId }
         });

         const { id, name: createdName } = response.data;

         const stateName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El estado: ${stateName}, fue creado satisfactoriamente`);

         navigate(`/states/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setStatesError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setStatesError('countryId', errors.find(err => err.param === 'countryId')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'countryId'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setStates = (rows, count, pages) => ({
   type: types.SET_STATES,
   payload: { rows, count, pages }
});

export const startGetStates = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/states?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => {
            const stateName = capitalizeAllWords(row.name);
            const countryName = capitalizeAllWords(row.country.name);

            return {
               ...row,
               name: stateName,
               country: {
                  ...row.country,
                  name: countryName
               }
            }
         });

         dispatch(setStates(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteState = (id, { page, perPage, navigate }, filters = {}) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el estado seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/states/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const stateName = capitalizeAllWords(name);

            simpleSuccessToast(`El estado: ${stateName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetStates(page, perPage, filters));
            } else {
               navigate('/states');
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

export const setState = (state) => ({
   type: types.SET_STATE_DATA,
   payload: state
});

export const startGetState = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/states/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const state = response.data;

         state.name = capitalizeAllWords(state.name);
         state.country.name = capitalizeAllWords(state.country.name);

         dispatch(setState(state));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateState = (id, { name, countryId }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/states/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, countryId }
         });

         const state = response.data;

         const stateName = capitalizeAllWords(state.name);

         simpleSuccessToast(`El estado: ${stateName}, fue actualizado satisfactoriamente`);

         dispatch(setState(state));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setStatesError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setStatesError('countryId', errors.find(err => err.param === 'countryId')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'countryId'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setStatesList = (rows) => ({
   type: types.SET_STATES_LIST,
   payload: rows
});

export const startGetStatesList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/states',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => ({
            text: capitalizeAllWords(row.name),
            value: row.id,
            countryId: row.countryId
         }));

         dispatch(setStatesList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}