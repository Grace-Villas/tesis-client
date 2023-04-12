
export const types = {
   SET_DATA: '[DASHBOARD] set data'
}



const initialState = {
   dollarPrice: null,
   batchesCount: null,
   dispatchesCount: null,
   clientsCount: null,
   receptionsCount: null,
   palletsCount: null,
   deliveredCount: null
}



export const dashboardReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_DATA: {
         const { key, value } = action.payload;

         return {
            ...state,
            [key]: value
         }
      }

      default:
         return state;
   }
}