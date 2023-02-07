import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/citiesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setCitiesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateCity = ({ name, stateId }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/cities',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, stateId }
         });

         const { id, name: createdName } = response.data;

         const cityName = capitalizeAllWords(createdName);

         simpleSuccessToast(`La ciudad: ${cityName}, fue creada satisfactoriamente`);

         navigate(`/cities/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setCitiesError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setCitiesError('stateId', errors.find(err => err.param === 'stateId')?.msg || null));

         arrayErrorToast(errors.filter(error => !['name', 'stateId'].includes(error.param)).map(error => error.msg));
      }

      dispatch(setLoading('create', false));
   }
}

export const setCities = (rows, count, pages) => ({
   type: types.SET_CITIES,
   payload: { rows, count, pages }
});

export const startGetCities = (page, perPage) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/cities?${getPaginationQuery(page, perPage)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => {
            const cityName = capitalizeAllWords(row.name);
            const stateName = capitalizeAllWords(row.state.name);
            const countryName = capitalizeAllWords(row.state.country.name);

            return {
               ...row,
               name: cityName,
               state: {
                  ...row.state,
                  name: stateName,
                  country: {
                     ...row.state.country,
                     name: countryName
                  }
               }
            }
         });

         dispatch(setCities(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteCity = (id, { page, perPage, navigate }) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar la ciudad seleccionada?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/cities/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const cityName = capitalizeAllWords(name);

            simpleSuccessToast(`La ciudad: ${cityName}, fue eliminada satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetCities(page, perPage));
            } else {
               navigate('/cities');
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

export const setCity = (city) => ({
   type: types.SET_CITY_DATA,
   payload: city
});

export const startGetCity = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/cities/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const city = response.data;

         city.name = capitalizeAllWords(city.name);
         city.state.name = capitalizeAllWords(city.state.name);
         city.state.country.name = capitalizeAllWords(city.state.country.name);

         dispatch(setCity(city));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateCity = (id, { name, stateId }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/cities/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, stateId }
         });

         const city = response.data;

         const cityName = capitalizeAllWords(city.name);

         simpleSuccessToast(`La ciudad: ${cityName}, fue actualizada satisfactoriamente`);

         dispatch(setCity(city));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setCitiesError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setCitiesError('stateId', errors.find(err => err.param === 'stateId')?.msg || null));

         arrayErrorToast(errors.filter(error => !['name', 'stateId'].includes(error.param)).map(error => error.msg));
      }

      dispatch(setLoading('update', false));
   }
}