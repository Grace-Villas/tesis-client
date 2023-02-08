import { capitalize } from '../helpers/format';

export const types = {
   SET_ERROR: '[USERS] set users error',

   SET_LOADING: '[USERS] set loading state',

   SET_USERS: '[USERS] set table data',

   SET_USER_DATA: '[USERS] set user data'
}



const initialState = {
   // Create
   firstNameError: null,
   lastNameError: null,
   emailError: null,
   passwordError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   user: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false
}



export const usersReducer = (state = initialState, action) => {
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

      case types.SET_USERS:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_USER_DATA:
         return {
            ...state,
            user: action.payload
         }

      default:
         return state;
   }
}