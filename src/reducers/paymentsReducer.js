import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[PAYMENTS] set cities error',

   SET_LOADING: '[PAYMENTS] set loading state',

   SET_PAYMENTS: '[PAYMENTS] set table data',

   SET_PAYMENT_DATA: '[PAYMENTS] set payment method data'
}



const initialState = {
   // Create
   paymentMethodIdError: null,
   amountError: null,
   dateError: null,
   referenceError: null,
   issuingNameError: null,
   issuingEmailError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   payment: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false
}



export const paymentsReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_ERROR:
         return {
            ...state,
            [`${action.payload.key}Error`]: action.payload.error
         }
      
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_PAYMENTS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_PAYMENT_DATA:
         return {
            ...state,
            payment: action.payload
         }

      default:
         return state;
   }
}