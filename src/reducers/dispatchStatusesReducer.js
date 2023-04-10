import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[DISPATCH_STATUSES] set loading state',

   SET_DISPATCH_STATUSES_LIST: '[DISPATCH_STATUSES] set dispatch statuses list'
}



const initialState = {
   // List
   dispatchStatusesList: [],

   loadingList: true,
}



export const dispatchStatusesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_DISPATCH_STATUSES_LIST:
         return {
            ...state,
            dispatchStatusesList: action.payload
         }

      default:
         return state;
   }
}