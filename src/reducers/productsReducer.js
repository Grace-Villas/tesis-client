import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[PRODUCTS] set products error',

   SET_LOADING: '[PRODUCTS] set loading state',

   SET_PRODUCTS: '[PRODUCTS] set table data',

   SET_PRODUCT_DATA: '[PRODUCTS] set product data',

   SET_PRODUCTS_LIST: '[PRODUCTS] set products list'
}



const initialState = {
   // Create
   nameError: null,
   qtyPerPalletError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   product: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   productsList: [],

   loadingList: true,
}



export const productsReducer = (state = initialState, action) => {
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

      case types.SET_PRODUCTS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_PRODUCT_DATA:
         return {
            ...state,
            product: action.payload
         }

      case types.SET_PRODUCTS_LIST:
         return {
            ...state,
            productsList: action.payload
         }

      default:
         return state;
   }
}