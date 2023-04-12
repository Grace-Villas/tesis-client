import { arrayErrorToast } from '../helpers/alerts';
import { request } from '../helpers/request';
import { types } from '../reducers/dashboardReducer';



// Actions

export const setData = (key, value) => ({
   type: types.SET_DATA,
   payload: { key, value }
});

export const startGetDollarPrice = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/dollar-price',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { dollar } = response.data;

         dispatch(setData('dollarPrice', dollar));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetClientsCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/companies-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('clientsCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetDispatchesCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/dispatches-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('dispatchesCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetReceptionsCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/receptions-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('receptionsCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetBatchesCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/batches-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('batchesCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetDeliveredProductsCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/delivered-products-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('deliveredCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startGetPalletsCount = () => {
   return async dispatch => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dashboard/pallet-count',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { count } = response.data;

         dispatch(setData('palletsCount', count));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}