import { arrayErrorToast, simpleSuccessToast } from '../helpers/alerts';
import { queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/receptionsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setReceptionsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateReception = ({ companyId, date, products }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/receptions',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { companyId, date, products }
         });

         const { id } = response.data;

         simpleSuccessToast(`La recepción de productos fue creada satisfactoriamente`);

         navigate(`/receptions/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setReceptionsError('companyId', errors.find(err => err.param === 'companyId')?.msg || null));
         dispatch(setReceptionsError('date', errors.find(err => err.param === 'date')?.msg || null));

         const unhandledErrors = errors.filter(error => !['date', 'companyId'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setReceptions = (rows, count, pages) => ({
   type: types.SET_RECEPTIONS,
   payload: { rows, count, pages }
});

export const startGetReceptions = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/receptions?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setReceptions(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const setReception = (reception) => ({
   type: types.SET_RECEPTION_DATA,
   payload: reception
});

export const startGetReception = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/receptions/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const reception = response.data;

         // reception.name = capitalizeAllWords(reception.name);
         // reception.state.name = capitalizeAllWords(reception.state.name);
         // reception.state.country.name = capitalizeAllWords(reception.state.country.name);

         dispatch(setReception(reception));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}



// Create reception

export const setProductsModalState = (state) => ({
   type: types.MODAL_STATE,
   payload: state
});

export const addProductToReception = (productId, qty, name) => ({
   type: types.ADD_PRODUCT,
   payload: { productId, qty, name }
});

export const removeProductFromReception = (productId) => ({
   type: types.REMOVE_PRODUCT,
   payload: productId
});

export const updateProductFromReception = (productId, key, value) => ({
   type: types.UPDATE_PRODUCT,
   payload: { productId, key, value }
});

export const resetProducts = () => ({
   type: types.RESET_PRODUCTS
});