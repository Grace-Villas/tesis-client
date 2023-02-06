import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/countriesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setCountriesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateCountry = ({name, locale, phoneExtension}, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/countries',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: {
               name, locale, phoneExtension
            }
         });

         const { id, name: createdName } = response.data;

         const countryName = createdName.charAt(0).toLocaleUpperCase() + createdName.substring(1, createdName.length);

         simpleSuccessToast(`El país: ${countryName}, fue creado satisfactoriamente`);

         navigate(`/countries/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setCountriesError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setCountriesError('locale', errors.find(err => err.param === 'locale')?.msg || null));
         dispatch(setCountriesError('phoneExtension', errors.find(err => err.param === 'phoneExtension')?.msg || null));
      }

      dispatch(setLoading('create', false));
   }
}

export const setCountries = (rows, count, pages) => ({
   type: types.SET_COUNTRIES,
   payload: { rows, count, pages }
});

export const startGetCountries = (page, perPage) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/countries?${getPaginationQuery(page, perPage)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => {
            const splitted = row.name.split(' ');

            const formated = splitted.map(word => {
               const first = word.charAt(0).toLocaleUpperCase();
               const rest = word.substring(1, word.length);

               return first + rest;
            });

            const join = formated.join(' ');

            return {
               ...row,
               name: join
            }
         });

         dispatch(setCountries(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteCountry = (id, { page, perPage, navigate }) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el país seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/countries/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const countryName = name.charAt(0).toLocaleUpperCase() + name.substring(1, name.length);

            simpleSuccessToast(`El país: ${countryName}, fue eliminado satisfactoriamente`);
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      if (!navigate) {
         dispatch(startGetCountries(page, perPage));
      } else {
         navigate('/countries')
      }

      dispatch(setLoading('delete', false));
   }
}

export const setCountry = (country) => ({
   type: types.SET_COUNTRY_DATA,
   payload: country
});

export const startGetCountry = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/countries/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const country = response.data;

         const splitName = country.name.split(' ');

         const mappedName = splitName.map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1));

         country.formatedName = mappedName.join(' ');

         dispatch(setCountry(country));
      } catch (error) {
         console.log(error);

         // TODO: manejar error de permiso
      }
      
      dispatch(setLoading('detail', false));
   }
}