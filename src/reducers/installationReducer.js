import { capitalize } from '../helpers/format';

export const types = {
   SET_LOADING: '[INSTALLATION] set loading state',

   SET_INSTALLATION_STATE: '[INSTALLATION] set installation state',

   SET_ERROR: '[INSTALLATION] set installation error',
}



const initialState = {
   // Check installation
   loadingInstall: true,

   isInstalled: null,

   // Install system
   firstNameError: null,
   lastNameError: null,
   emailError: null,
   passwordError: null,
   repeatPasswordError: null,

   loadingCreate: false
}



export const installationReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_LOADING: {
         const key = capitalize(action.payload.key);

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }

      case types.SET_INSTALLATION_STATE:
         return {
            ...state,
            isInstalled: action.payload
         }

   
      case types.SET_ERROR:
         return {
            ...state,
            [`${action.payload.key}Error`]: action.payload.error
         }

      default:
         return state;
   }
}