import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[ROLES] set roles error',

   SET_LOADING: '[ROLES] set loading state',

   SET_ROLES: '[ROLES] set table data',

   SET_ROLE_DATA: '[ROLES] set role data',

   SET_ROLES_LIST: '[ROLES] set roles list'
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
   role: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,

   // List
   rolesList: [],

   loadingList: true,
}



export const rolesReducer = (state = initialState, action) => {
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

      case types.SET_ROLES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_ROLE_DATA:
         return {
            ...state,
            role: action.payload
         }

      case types.SET_ROLES_LIST:
         return {
            ...state,
            rolesList: action.payload
         }

      default:
         return state;
   }
}