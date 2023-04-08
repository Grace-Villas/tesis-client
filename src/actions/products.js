import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/productsReducer';



// Actions

// Modelo: Product

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setProductsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateProduct = ({ name, qtyPerPallet }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/products',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, qtyPerPallet }
         });

         const { id, name: createdName } = response.data;

         const productName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El producto: ${productName}, fue creado satisfactoriamente`);

         navigate(`/products/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setProductsError('name', errors.find(err => err.param === 'name')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'qtyPerPallet'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setProducts = (rows, count, pages) => ({
   type: types.SET_PRODUCTS,
   payload: { rows, count, pages }
});

export const startGetProducts = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/products?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setProducts(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteProduct = (id, { page, perPage, navigate }, filters = {}) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el producto seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/products/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const productName = capitalizeAllWords(name);

            simpleSuccessToast(`El producto: ${productName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetProducts(page, perPage, filters));
            } else {
               navigate('/products');
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

export const setProduct = (product) => ({
   type: types.SET_PRODUCT_DATA,
   payload: product
});

export const startGetProduct = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/products/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const product = response.data;

         dispatch(setProduct(product));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateProduct = (id, { name, qtyPerPallet }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/products/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, qtyPerPallet }
         });

         const product = response.data;

         const productName = capitalizeAllWords(product.name);

         simpleSuccessToast(`El producto: ${productName}, fue actualizado satisfactoriamente`);

         dispatch(setProduct(product));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setProductsError('name', errors.find(err => err.param === 'name')?.msg || null));
         dispatch(setProductsError('qtyPerPallet', errors.find(err => err.param === 'qtyPerPallet')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'qtyPerPallet'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setProductsList = (rows) => ({
   type: types.SET_PRODUCTS_LIST,
   payload: rows
});

export const startGetProductsList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/products',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         dispatch(setProductsList(rows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}



// Aux

export const startCreateProductAux = ({ name, qtyPerPallet }, handleCleanModal) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/products',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, qtyPerPallet }
         });

         const { name: createdName } = response.data;

         const productName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El producto: ${productName}, fue creado satisfactoriamente`);

         dispatch(startGetProductsList());

         handleCleanModal();
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setProductsError('name', errors.find(err => err.param === 'name')?.msg || null));

         const unhandledErrors = errors.filter(error => !['name', 'qtyPerPallet'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}