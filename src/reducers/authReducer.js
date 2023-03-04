export const types = {
   LOADING_DATA: '[AUTH] set loading data state',
   LOADING_LOGIN: '[AUTH] set loading login state',

   SET_ERROR: '[AUTH] set login error',

   LOGIN: '[AUTH] set auth data',
   LOGOUT: '[AUTH] unset auth data',

   SET_ATTRIBUTE: '[AUTH] set attribute'
}



const initialState = {
   // spinner de autenticación persistente
   loadingData: true,
   // spinner del login
   loadingAuth: false,

   // Errores del login
   emailError: null,
   passwordError: null,
   passwordRepeatError: null,

   // Data de autenticación
   id: null,
   email: null,
   firstName: null,
   lastName: null,
   fullName: null,
   isAdmin: null,
   uuid: null,
   roles: [],

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
            loadingAuth: action.payload
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
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            fullName: action.payload.fullName,
            isAdmin: action.payload.isAdmin,
            uuid: action.payload.uuid,
            userRoles: action.payload.userRoles,
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

      case types.SET_ATTRIBUTE:
         return {
            ...state,
            [action.payload.key]: action.payload.value
         }

      default:
         return state;
   }
}