import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[STATES] set countries error',

   SET_LOADING: '[STATES] set loading state',

   SET_STATES: '[STATES] set table data',

   SET_STATE_DATA: '[STATES] set state data',

   SET_STATES_LIST: '[STATES] set countries list'
}



const initialState = {
   // Create
   nameError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   state: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   statesList: [],

   loadingList: true,
}



export const statesReducer = (state = initialState, action) => {
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

      case types.SET_STATES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_STATE_DATA:
         return {
            ...state,
            state: action.payload
         }

      case types.SET_STATES_LIST:
         return {
            ...state,
            statesList: action.payload
         }

      default:
         return state;
   }
}