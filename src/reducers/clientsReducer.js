import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[CLIENTS] set clients error',

   SET_LOADING: '[CLIENTS] set loading state',

   SET_CLIENTS: '[CLIENTS] set table data',

   SET_CLIENT_DATA: '[CLIENTS] set client data'
}



const initialState = {
   // Create
   nameError: null,
   addressError: null,
   emailError: null,
   phoneError: null,
   rutError: null,
   cityIdError: null,
   stateIdError: null,
   countryIdError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   client: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,
}



export const clientsReducer = (state = initialState, action) => {
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

      case types.SET_CLIENTS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_CLIENT_DATA:
         return {
            ...state,
            client: action.payload
         }

      default:
         return state;
   }
}