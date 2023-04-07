import { capitalize } from '../helpers/format';

export const types = {
   SET_CONFIG: '[CONFIGURATIONS] set config data',

   SET_LOADING: '[CONFIGURATIONS] set loading state',
}



const initialState = {
   configurations: [],

   loadingDetail: true,

   // Update
   loadingUpdate: false,
}



export const configurationsReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_CONFIG:
         return {
            ...state,
            configurations: action.payload
         }

      case types.SET_LOADING: {
         const key = capitalize(action.payload.key)

         return {
            ...state,
            [`loading${key}`]: action.payload.state
         }
      }
      
      default:
         return state;
   }
}