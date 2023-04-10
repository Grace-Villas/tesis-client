import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[BATCHES] set batches error',

   SET_LOADING: '[BATCHES] set loading state',

   SET_BATCHES: '[BATCHES] set table data',

   SET_BATCH_DATA: '[BATCHES] set batch data',

   MODAL_STATE: '[BATCHES] modal state',

   ADD_DISPATCH: '[BATCHES] add dispatch to batch',
   REMOVE_DISPATCH: '[BATCHES] remove dispatch from batch',
   UPDATE_DISPATCH: '[BATCHES] update dispatch from batch',
   RESET_DISPATCHES: '[BATCHES] empty dispatches list'
}



const initialState = {
   // Create
   dispatchesModalState: false,
   dispatches: [],

   userIdError: null,
   dateError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   batch: null,

   loadingDetail: true
}



export const batchesReducer = (state = initialState, action) => {
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

      case types.SET_BATCHES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_BATCH_DATA:
         return {
            ...state,
            batch: action.payload
         }

      case types.MODAL_STATE:
         return {
            ...state,
            dispatchesModalState: action.payload
         }

      case types.ADD_DISPATCH:
         return {
            ...state,
            dispatches: [
               ...state.dispatches,
               {
                  dispatchId: action.payload.dispatchId,
                  clientName: action.payload.clientName,
                  cityName: action.payload.cityName,
                  error: null
               }
            ]
         }

      case types.REMOVE_DISPATCH:
         return {
            ...state,
            dispatches: state.dispatches.filter(p => p.dispatchId !== action.payload)
         }

      case types.UPDATE_DISPATCH:
         return {
            ...state,
            dispatches: state.dispatches.map(p => {
               if (p.dispatchId === action.payload.dispatchId) {
                  return {
                     ...p,
                     [action.payload.key]: action.payload.value
                  }
               }

               return p;
            })
         }

      case types.RESET_DISPATCHES:
         return {
            ...state,
            dispatches: []
         }

      default:
         return state;
   }
}