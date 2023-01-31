export const types = {
   LOADING_DATA: '[AUTH] set loading data state',
   LOADING_LOGIN: '[AUTH] set loading login state',

   SET_ERROR: '[AUTH] set login error',

   LOGIN: '[AUTH] set auth data',
   LOGOUT: '[AUTH] unset auth data',
}



const initialState = {
   // spinner de autenticación persistente
   loadingData: true,
   // spinner del login
   loadingLogin: false,

   // Errores del login
   emailError: null,
   passwordError: null,

   // Data de autenticación
   id: null,
   email: null,
   name: null,
   isAdmin: null,
   uuid: null,

   permissions: null
}



export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.LOADING_DATA:
         return {
            ...state,
            loadingData: action.payload
         }

      case types.LOADING_LOGIN:
         return {
            ...state,
            loadingLogin: action.payload
         }

      case types.SET_ERROR:
         return {
            ...state,
            [`${action.payload.key}Error`]: action.payload.error
         }

      case types.LOGIN:
         return {
            ...state,
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
            isAdmin: action.payload.isAdmin,
            uuid: action.payload.uuid,
            permissions: action.payload.permissions,
         }

      case types.LOGOUT:
         return {
            ...state,
            id: null,
            email: null,
            name: null,
            isAdmin: null,
            uuid: null,
            permissions: null,
         }

      default:
         return state;
   }
}