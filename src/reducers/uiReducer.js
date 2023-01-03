export const types = {
   // Mobile menu
   SIDE_BAR: '[UI] set sidebar state',
}



const initialState = {
   // sidebar
   sidebar: false
}



export const uiReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SIDE_BAR:
         return {
            ...state,
            sidebar: action.payload
         }

      default:
         return state;
   }
}