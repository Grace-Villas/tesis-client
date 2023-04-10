import { arrayErrorToast, simpleConfirmDialog, simpleInputDialog, simpleSuccessToast } from '../helpers/alerts';
import { queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/dispatchesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setDispatchesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateDispatch = ({ receiverId, date, products }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/dispatches',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { receiverId, date, products }
         });

         const { id } = response.data;

         simpleSuccessToast(`El despacho de productos fue creado satisfactoriamente`);

         navigate(`/dispatches/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setDispatchesError('receiverId', errors.find(err => err.param === 'receiverId')?.msg || null));
         dispatch(setDispatchesError('date', errors.find(err => err.param === 'date')?.msg || null));

         const unhandledErrors = errors.filter(error => !['date', 'companyId'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setDispatches = (rows, count, pages) => ({
   type: types.SET_DISPATCHES,
   payload: { rows, count, pages }
});

export const startGetDispatches = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/dispatches?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setDispatches(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const setDispatch = (dispatch) => ({
   type: types.SET_DISPATCH_DATA,
   payload: dispatch
});

export const startGetDispatch = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/dispatches/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const dispatchData = response.data;

         // dispatchData.name = capitalizeAllWords(dispatchData.name);
         // dispatchData.state.name = capitalizeAllWords(dispatchData.state.name);
         // dispatchData.state.country.name = capitalizeAllWords(dispatchData.state.country.name);

         dispatch(setDispatch(dispatchData));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startDeleteDispatch = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea cancelar el despacho seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/dispatches/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const dispatchData = response.data;

            simpleSuccessToast('El despacho fue cancelado satisfactoriamente');
   
            dispatch(setDispatch(dispatchData));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const startDeliverDispatch = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea marcar como entregado el despacho seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/dispatches/${id}`,
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const dispatchData = response.data;

            simpleSuccessToast('El despacho fue actualizado satisfactoriamente');
   
            dispatch(setDispatch(dispatchData));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const startDenyDispatch = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed, value } = await simpleInputDialog('warning', '¿Está seguro?', '¿Desea rechazar el despacho seleccionado? Una vez rechazado no se puede revertir', 'Motivo de rechazo', 'textarea', 'Ingrese el motivo por el cuál está rechazando el despacho');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/dispatches/deny/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               },
               body: { comments: value }
            });

            const payment = response.data;

            simpleSuccessToast('El despacho fue rechazado satisfactoriamente');
            
            dispatch(setDispatch(payment));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const setDispatchesList = (rows) => ({
   type: types.SET_DISPATCHES_LIST,
   payload: rows
});

export const startGetDispatchesList = (filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/dispatches?${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         dispatch(setDispatchesList(rows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}



// Create dispatch

export const setProductsModalState = (state) => ({
   type: types.MODAL_STATE,
   payload: state
});

export const addProductToDispatch = (productId, qty, name) => ({
   type: types.ADD_PRODUCT,
   payload: { productId, qty, name }
});

export const removeProductFromDispatch = (productId) => ({
   type: types.REMOVE_PRODUCT,
   payload: productId
});

export const updateProductFromDispatch = (productId, key, value) => ({
   type: types.UPDATE_PRODUCT,
   payload: { productId, key, value }
});

export const resetProducts = () => ({
   type: types.RESET_PRODUCTS
});