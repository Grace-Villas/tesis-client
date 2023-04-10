import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[BATCH_STATUSES] set loading state',

   SET_BATCH_STATUSES_LIST: '[BATCH_STATUSES] set batch statuses list'
}



const initialState = {
   // List
   batchStatusesList: [],

   loadingList: true,
}



export const batchStatusesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_BATCH_STATUSES_LIST:
         return {
            ...state,
            batchStatusesList: action.payload
         }

      default:
         return state;
   }
}