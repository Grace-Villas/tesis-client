import { capitalize } from "../helpers/format";

export const types = {
   SET_ERROR: '[AUTH] set settings error',

   SET_LOADING: '[AUTH] set loading state'
}



const initialState = {
   // Seguridad
   oldPasswordError: null,
   newPasswordError: null,
   repeatNewPasswordError: null,

   loadingSecurity: false,

   // Cuenta
   firstNameError: null,
   lastNameError: null,
   emailError: null,

   loadingAccount: false
}



export const settingsReducer = (state = initialState, action) => {
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

      default:
         return state;
   }
}