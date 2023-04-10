import { arrayErrorToast, simpleConfirmDialog, simpleInputDialog, simpleSuccessToast } from '../helpers/alerts';
import { queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/paymentsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setPaymentsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreatePayment = ({ paymentMethodId, amount, date, reference, issuingName, issuingEmail }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/payments',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { paymentMethodId, amount, date, reference, issuingName, issuingEmail }
         });

         const { id } = response.data;

         simpleSuccessToast(`El pago fue creado satisfactoriamente`);

         navigate(`/payments/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setPaymentsError('paymentMethodId', errors.find(err => err.param === 'paymentMethodId')?.msg || null));
         dispatch(setPaymentsError('amount', errors.find(err => err.param === 'amount')?.msg || null));
         dispatch(setPaymentsError('date', errors.find(err => err.param === 'date')?.msg || null));
         dispatch(setPaymentsError('reference', errors.find(err => err.param === 'reference')?.msg || null));
         dispatch(setPaymentsError('issuingName', errors.find(err => err.param === 'issuingName')?.msg || null));
         dispatch(setPaymentsError('issuingEmail', errors.find(err => err.param === 'issuingEmail')?.msg || null));

         const unhandledErrors = errors.filter(error => ![
            'paymentMethodId', 'amount', 'date', 'reference', 'issuingName', 'issuingEmail'
         ].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setPayments = (rows, count, pages) => ({
   type: types.SET_PAYMENTS,
   payload: { rows, count, pages }
});

export const startGetPayments = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/payments?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setPayments(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const setPayment = (payment) => ({
   type: types.SET_PAYMENT_DATA,
   payload: payment
});

export const startGetPayment = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/payments/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const payment = response.data;

         dispatch(setPayment(payment));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startAprovePayment = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea aprovar el pago seleccionado? Una vez aprovado no se puede revertir');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/payments/aprove/${id}`,
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const payment = response.data;

            simpleSuccessToast('El método de pago fue aprovado satisfactoriamente');
            
            dispatch(setPayment(payment));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const startDenyPayment = (id) => {
   return async dispatch => {
      try {
         const { isConfirmed, value } = await simpleInputDialog('warning', '¿Está seguro?', '¿Desea rechazar el pago seleccionado? Una vez rechazado no se puede revertir', 'Motivo de rechazo', 'textarea', 'Ingrese el motivo por el cuál está rechazando el pago');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/payments/deny/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               },
               body: { comments: value }
            });

            const payment = response.data;

            simpleSuccessToast('El método de pago fue rechazado satisfactoriamente');
            
            dispatch(setPayment(payment));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}