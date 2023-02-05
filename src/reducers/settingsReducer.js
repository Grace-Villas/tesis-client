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
   nameError: null,
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
         const first = action.payload.key.charAt(0).toLocaleUpperCase();
         const rest = action.payload.key.substring(1, action.payload.key.length);
         const key = first + rest;

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      default:
         return state;
   }
}