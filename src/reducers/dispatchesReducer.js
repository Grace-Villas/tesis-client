import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[DISPATCHES] set cities error',

   SET_LOADING: '[DISPATCHES] set loading state',

   SET_DISPATCHES: '[DISPATCHES] set table data',

   SET_DISPATCH_DATA: '[DISPATCHES] set dispatch data',

   MODAL_STATE: '[DISPATCHES] modal state',

   ADD_PRODUCT: '[DISPATCHES] add product to dispatch',
   REMOVE_PRODUCT: '[DISPATCHES] remove product from dispatch',
   UPDATE_PRODUCT: '[DISPATCHES] update product from dispatch',
   RESET_PRODUCTS: '[DISPATCHES] empty product list'
}



const initialState = {
   // Create
   productsModalState: false,
   products: [],

   receiverIdError: null,
   dateError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   dispatch: null,

   loadingDetail: true
}



export const dispatchesReducer = (state = initialState, action) => {
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

      case types.SET_DISPATCHES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_DISPATCH_DATA:
         return {
            ...state,
            dispatch: action.payload
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