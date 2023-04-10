import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[PAYMENT_STATUSES] set loading state',

   SET_PAYMENT_STATUSES_LIST: '[PAYMENT_STATUSES] set payment statuses list'
}



const initialState = {
   // List
   paymentStatusesList: [],

   loadingList: true,
}



export const paymentStatusesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_PAYMENT_STATUSES_LIST:
         return {
            ...state,
            paymentStatusesList: action.payload
         }

      default:
         return state;
   }
}