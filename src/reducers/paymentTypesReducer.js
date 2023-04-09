import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[PAYMENT_TYPES] set loading state',

   SET_PAYMENT_TYPES_LIST: '[PAYMENT_TYPES] set payment types list'
}



const initialState = {
   // List
   paymentTypesList: [],

   loadingList: true,
}



export const paymentTypesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_PAYMENT_TYPES_LIST:
         return {
            ...state,
            paymentTypesList: action.payload
         }

      default:
         return state;
   }
}