export const types = {
   SET_ERROR: '[COUNTRIES] set countries error',

   SET_LOADING: '[COUNTRIES] set loading state',

   SET_COUNTRIES: '[COUNTRIES] set table data',

   SET_COUNTRY_DATA: '[COOUNTRIES] set country data'
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

   detailError: null,

   loadingDetail: true,

   // Delete
   loadingDelete: false,
}



export const countriesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_ERROR:
         return {
            ...state,
            [`${action.payload.key}Error`]: action.payload.error
         }
      
      case types.SET_LOADING: {
         const first = action.payload.key.charAt(0).toLocaleUpperCase();
         const rest = action.payload.key.substring(1, action.payload.key.length);
         const key = first + rest;

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

      default:
         return state;
   }
}