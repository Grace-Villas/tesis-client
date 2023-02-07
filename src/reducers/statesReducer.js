export const types = {
   SET_ERROR: '[STATES] set countries error',

   SET_LOADING: '[STATES] set loading state',

   SET_STATES: '[STATES] set table data',

   SET_STATE_DATA: '[STATES] set state data'
}



const initialState = {
   // Create
   nameError: null,
   countryIdError: null,
   
   loadingCreate: false,

   // List
   rows: [],
   count: null,
   pages: null,

   loadingTable: true,

   // Detail
   state: null,

   loadingDetail: true,

   // Update
   loadingUpdate: false,

   // Delete
   loadingDelete: false,
}



export const statesReducer = (state = initialState, action) => {
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

      case types.SET_STATES:
         return {
            ...state,
            rows: action.payload.rows,
            count: action.payload.count,
            pages: action.payload.pages,
         }

      case types.SET_STATE_DATA:
         return {
            ...state,
            state: action.payload
         }

      default:
         return state;
   }
}