import { simpleSuccessToast } from '../helpers/alerts';
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
   }
}