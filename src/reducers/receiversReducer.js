import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[RECEIVERS] set receivers error',

   SET_LOADING: '[RECEIVERS] set loading state',

   SET_RECEIVERS: '[RECEIVERS] set table data',

   SET_RECEIVER_DATA: '[RECEIVERS] set receiver data',

   SET_RECEIVERS_LIST: '[RECEIVERS] set receivers list'
}



const initialState = {
   // Create
   cityIdError: null,
   nameError: null,
   rutError: null,
   addressError: null,
   phoneError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   receiver: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   receiversList: [],

   loadingList: true,
}



export const receiversReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_ERROR:
         return {
            ...state,
            [`${action.payload.key}Error`]: action.payload.error
         }
      
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key);

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_RECEIVERS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_RECEIVER_DATA:
         return {
            ...state,
            receiver: action.payload
         }

      case types.SET_RECEIVERS_LIST:
         return {
            ...state,
            receiversList: action.payload
         }

      default:
         return state;
   }
}