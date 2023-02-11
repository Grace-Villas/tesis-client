import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[CITIES] set cities error',

   SET_LOADING: '[CITIES] set loading state',

   SET_CITIES: '[CITIES] set table data',

   SET_CITY_DATA: '[CITIES] set city data',

   SET_CITIES_LIST: '[CITIES] set cities list'
}



const initialState = {
   // Create
   nameError: null,
   stateIdError: null,
   countryIdError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   city: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   citiesList: [],

   loadingList: true,
}



export const citiesReducer = (state = initialState, action) => {
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

      case types.SET_CITIES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_CITY_DATA:
         return {
            ...state,
            city: action.payload
         }

      case types.SET_CITIES_LIST:
         return {
            ...state,
            citiesList: action.payload
         }

      default:
         return state;
   }
}