import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/batchesReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setBatchesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateBatch = ({ userId, date, dispatches }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/batches',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { userId, date, dispatches }
         });

         const { id } = response.data;

         simpleSuccessToast(`El lote de despachos fue creado satisfactoriamente`);

         navigate(`/batches/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setBatchesError('userId', errors.find(err => err.param === 'userId')?.msg || null));
         dispatch(setBatchesError('date', errors.find(err => err.param === 'date')?.msg || null));

         const unhandledErrors = errors.filter(error => !['date', 'userId'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setBatches = (rows, count, pages) => ({
   type: types.SET_BATCHES,
   payload: { rows, count, pages }
});

export const startGetBatches = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/batches?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setBatches(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const setBatch = (dispatch) => ({
   type: types.SET_BATCH_DATA,
   payload: dispatch
});

export const startGetBatch = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/batches/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const dispatchData = response.data;

         dispatch(setBatch(dispatchData));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startDeleteBatch = (id, navigate) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el lote seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            await request({
               path: `/batches/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            simpleSuccessToast('El lote fue eliminado satisfactoriamente');
   
            navigate('/batches');
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const startTransitBatch = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea marcar como en tránsito el lote seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/batches/transit/${id}`,
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const dispatchData = response.data;

            simpleSuccessToast('El lote de despachos fue actualizado satisfactoriamente');
   
            dispatch(setBatch(dispatchData));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}



// Create dispatch

export const setDispatchesModalState = (state) => ({
   type: types.MODAL_STATE,
   payload: state
});

export const addDispatchToBatch = (dispatchId, clientName, cityName) => ({
   type: types.ADD_DISPATCH,
   payload: { dispatchId, clientName, cityName }
});

export const removeDispatchFromBatch = (dispatchId) => ({
   type: types.REMOVE_DISPATCH,
   payload: dispatchId
});

export const updateDispatchFromBatch = (dispatchId, key, value) => ({
   type: types.UPDATE_DISPATCH,
   payload: { dispatchId, key, value }
});

export const resetDispatches = () => ({
   type: types.RESET_DISPATCHES
});