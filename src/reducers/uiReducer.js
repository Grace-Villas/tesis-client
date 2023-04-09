export const types = {
   // Mobile menu
   SIDE_BAR: '[UI] set sidebar state',

   // Breadcrumb
   SET_BREADCRUMB: '[UI] set breadcrumb data',

   // Theme
   SET_THEME: '[UI] set theme'
}



const initialState = {
   // sidebar
   sidebar: false,

   // breadcrumb
   breadcrumb: [],

   // Theme:
   theme: false
}



export const uiReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SIDE_BAR:
         return {
            ...state,
            sidebar: action.payload
         }

      case types.SET_BREADCRUMB:
         return {
            ...state,
            breadcrumb: action.payload
         }

      case types.SET_THEME:
         return {
            ...state,
            theme: action.payload
         }

      default:
         return state;
   }
}