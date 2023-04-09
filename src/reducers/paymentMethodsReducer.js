import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[PAYMENT_METHODS] set cities error',

   SET_LOADING: '[PAYMENT_METHODS] set loading state',

   SET_PAYMENT_METHODS: '[PAYMENT_METHODS] set table data',

   SET_PAYMENT_METHOD_DATA: '[PAYMENT_METHODS] set payment method data',

   SET_PAYMENT_METHODS_LIST: '[PAYMENT_METHODS] set cities list'
}



const initialState = {
   // Create
   paymentTypeIdError: null,
   bankNameError: null,
   holderNameError: null,
   holderDniError: null,
   accountNumberError: null,
   emailError: null,
   phoneError: null,
   userError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   paymentMethod: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   paymentMethodList: [],

   loadingList: true,
}



export const paymentMethodsReducer = (state = initialState, action) => {
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

      case types.SET_PAYMENT_METHODS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_PAYMENT_METHOD_DATA:
         return {
            ...state,
            paymentMethod: action.payload
         }

      case types.SET_PAYMENT_METHODS_LIST:
         return {
            ...state,
            paymentMethodList: action.payload
         }

      default:
         return state;
   }
}