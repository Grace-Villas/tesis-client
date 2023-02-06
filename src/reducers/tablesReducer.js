export const types = {
   // Mobile menu
   SET_PER_PAGE: '[TABLES] set rows per page',
}



const initialState = {
   // sidebar
   perPage: ''
}



export const tablesReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_PER_PAGE:
         return {
            ...state,
            perPage: action.payload
         }

      default:
         return state;
   }
}