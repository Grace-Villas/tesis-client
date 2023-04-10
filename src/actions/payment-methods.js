import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/paymentMethodsReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setPaymentMethodsError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreatePaymentMethod = ({ paymentTypeId, bankName, holderName, holderDni, accountNumber, email, phone, user }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/payment-methods',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { paymentTypeId, bankName, holderName, holderDni, accountNumber, email, phone, user }
         });

         const { id } = response.data;

         simpleSuccessToast(`El método de pago fue creado satisfactoriamente`);

         navigate(`/payment-methods/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setPaymentMethodsError('paymentTypeId', errors.find(err => err.param === 'paymentTypeId')?.msg || null));
         dispatch(setPaymentMethodsError('bankName', errors.find(err => err.param === 'bankName')?.msg || null));
         dispatch(setPaymentMethodsError('holderName', errors.find(err => err.param === 'holderName')?.msg || null));
         dispatch(setPaymentMethodsError('holderDni', errors.find(err => err.param === 'holderDni')?.msg || null));
         dispatch(setPaymentMethodsError('accountNumber', errors.find(err => err.param === 'accountNumber')?.msg || null));
         dispatch(setPaymentMethodsError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setPaymentMethodsError('phone', errors.find(err => err.param === 'phone')?.msg || null));
         dispatch(setPaymentMethodsError('user', errors.find(err => err.param === 'user')?.msg || null));

         const unhandledErrors = errors.filter(error => ![
            'paymentTypeId', 'bankName', 'holderName', 'holderDni', 'accountNumber', 'email', 'phone', 'user'
         ].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setPaymentMethods = (rows, count, pages) => ({
   type: types.SET_PAYMENT_METHODS,
   payload: { rows, count, pages }
});

export const startGetPaymentMethods = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/payment-methods?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         dispatch(setPaymentMethods(rows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeletePaymentMethod = (id, { page, perPage, navigate }, filters = {}) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el método de pago seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            await request({
               path: `/payment-methods/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            simpleSuccessToast('El método de pago fue eliminado satisfactoriamente');

            if (!navigate) {
               dispatch(startGetPaymentMethods(page, perPage, filters));
            } else {
               navigate('/payment-methods');
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

export const setPaymentMethod = (paymentMethod) => ({
   type: types.SET_PAYMENT_METHOD_DATA,
   payload: paymentMethod
});

export const startGetPaymentMethod = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/payment-methods/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const paymentMethod = response.data;

         dispatch(setPaymentMethod(paymentMethod));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdatePaymentMethod = (id, { bankName, holderName, holderDni, accountNumber, email, phone, user }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/payment-methods/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { bankName, holderName, holderDni, accountNumber, email, phone, user }
         });

         const paymentMethod = response.data;

         simpleSuccessToast('El método de pago fue actualizado satisfactoriamente');

         dispatch(setPaymentMethod(paymentMethod));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setPaymentMethodsError('bankName', errors.find(err => err.param === 'bankName')?.msg || null));
         dispatch(setPaymentMethodsError('holderName', errors.find(err => err.param === 'holderName')?.msg || null));
         dispatch(setPaymentMethodsError('holderDni', errors.find(err => err.param === 'holderDni')?.msg || null));
         dispatch(setPaymentMethodsError('accountNumber', errors.find(err => err.param === 'accountNumber')?.msg || null));
         dispatch(setPaymentMethodsError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setPaymentMethodsError('phone', errors.find(err => err.param === 'phone')?.msg || null));
         dispatch(setPaymentMethodsError('user', errors.find(err => err.param === 'user')?.msg || null));

         const unhandledErrors = errors.filter(error => ![
            'bankName', 'holderName', 'holderDni', 'accountNumber', 'email', 'phone', 'user'
         ].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setPaymentMethodsList = (rows) => ({
   type: types.SET_PAYMENT_METHODS_LIST,
   payload: rows
});

export const startGetPaymentMethodsList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/payment-methods',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => {
            let text = capitalizeAllWords(row.paymentType.name);

            if (row.bankName) {
               text += ` - ${row.bankName}`;
            }

            if (row.holderName) {
               text += ` - ${row.holderName}`;
            }
            
            if (row.accountNumber) {
               text += ` - ${row.accountNumber}`;
            }
            
            if (row.email) {
               text += ` - ${row.email}`;
            }
            
            if (row.phone) {
               text += ` - ${row.phone}`;
            }

            return {
               ...row,
               text,
               value: row.id
            }
         });

         dispatch(setPaymentMethodsList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}