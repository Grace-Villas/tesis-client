import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[RECEPTIONS] set cities error',

   SET_LOADING: '[RECEPTIONS] set loading state',

   SET_RECEPTIONS: '[RECEPTIONS] set table data',

   SET_RECEPTION_DATA: '[RECEPTIONS] set reception data',

   MODAL_STATE: '[RECEPTIONS] modal state',

   ADD_PRODUCT: '[RECEPTIONS] add product to reception',
   REMOVE_PRODUCT: '[RECEPTIONS] remove product from reception',
   UPDATE_PRODUCT: '[RECEPTIONS] update product from reception',
   RESET_PRODUCTS: '[RECEPTIONS] empty product list'
}



const initialState = {
   // Create
   productsModalState: false,
   products: [],

   companyIdError: null,
   dateError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   reception: null,

   loadingDetail: true
}



export const receptionsReducer = (state = initialState, action) => {
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

      case types.SET_RECEPTIONS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_RECEPTION_DATA:
         return {
            ...state,
            reception: action.payload
         }

      case types.MODAL_STATE:
         return {
            ...state,
            productsModalState: action.payload
         }

      case types.ADD_PRODUCT:
         return {
            ...state,
            products: [
               ...state.products,
               {
                  productId: action.payload.productId,
                  qty: action.payload.qty,
                  name: action.payload.name,
                  error: null
               }
            ]
         }

      case types.REMOVE_PRODUCT:
         return {
            ...state,
            products: state.products.filter(p => p.productId !== action.payload)
         }

      case types.UPDATE_PRODUCT:
         return {
            ...state,
            products: state.products.map(p => {
               if (p.productId === action.payload.productId) {
                  return {
                     ...p,
                     [action.payload.key]: action.payload.value
                  }
               }

               return p;
            })
         }

      case types.RESET_PRODUCTS:
         return {
            ...state,
            products: []
         }

      default:
         return state;
   }
}