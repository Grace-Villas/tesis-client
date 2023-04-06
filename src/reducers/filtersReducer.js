export const types = {
   SET_FILTER: '[FILTERS] set filter value',

   RESET_FILTERS: '[FILTERS] reset filters value'
}



const initialState = {
   search: '',
   name: '',
   email: '',
   stateId: '',
   cityId: '',
   hasDeliveries: '',
   isPublic: ''
}



export const filtersReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_FILTER:
         return {
            ...state,
            [action.payload.key]: action.payload.value
         }

      case types.RESET_FILTERS:
         return {
            ...initialState
         }

      default:
         return state;
   }
}