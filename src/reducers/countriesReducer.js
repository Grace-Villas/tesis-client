import { capitalize } from "../helpers/format";

export const types = {
   SET_ERROR: '[COUNTRIES] set countries error',

   SET_LOADING: '[COUNTRIES] set loading state',

   SET_COUNTRIES: '[COUNTRIES] set table data',

   SET_COUNTRY_DATA: '[COUNTRIES] set country data',

   SET_COUNTRIES_LIST: '[COUNTRIES] set countries list'
}



const initialState = {
   // Create
   nameError: null,
   localeError: null,
   phoneExtensionError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   country: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   countriesList: [],

   loadingList: true,
}



export const countriesReducer = (state = initialState, action) => {
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

      case types.SET_COUNTRIES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_COUNTRY_DATA:
         return {
            ...state,
            country: action.payload
         }

      case types.SET_COUNTRIES_LIST:
         return {
            ...state,
            countriesList: action.payload
         }

      default:
         return state;
   }
}