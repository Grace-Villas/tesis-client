import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[PERMISSIONS] set loading state',

   SET_ERROR: '[PERMISSIONS] set permissions error',

   SET_PERMISSIONS_LIST: '[PERMISSIONS] set permissions list',

   ADD_ROW: '[PERMISSIONS] add row',
   HANDLE_ROW_CHANGE: '[PERMISSIONS] change row values',
   DELETE_ROW: '[PERMISSIONS] delete row',

   RESET_ROW_FIELDS: '[PERMISSIONS] reset permissions rows'
}



const initialState = {
   // List
   permissionsList: [],

   loadingList: true,

   // Handlers para crear rol
   permissionsError: null,
   permissionIdError: null,

   rowFields: []
}



export const permissionsReducer = (state = initialState, action) => {
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

      case types.SET_PERMISSIONS_LIST:
         return {
            ...state,
            permissionsList: action.payload
         }

      case types.ADD_ROW: {
         const { permissionId, list, create, update, del } = action.payload;

         const newState = [
            ...state.rowFields,
            { permissionId, permissionIdError: null, list, create, update, delete: del }
         ];

         return {
            ...state,
            rowFields: newState
         }
      }

      case types.HANDLE_ROW_CHANGE: {
         const { value, index, key } = action.payload;

         const currentState = [...state.rowFields];

         currentState[index][key] = value;

         return {
            ...state,
            rowFields: currentState
         }
      }

      case types.DELETE_ROW: {
         const newState = state.rowFields.filter((_, index) => index !== action.payload);
         
         return {
            ...state,
            rowFields: newState
         }
      }

      case types.RESET_ROW_FIELDS:
         return {
            ...state,
            rowFields: []
         }

      default:
         return state;
   }
}