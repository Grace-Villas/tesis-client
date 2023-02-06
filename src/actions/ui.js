import { types } from '../reducers/uiReducer';



// Actions

export const toggleSidebar = (state) => ({
   type: types.SIDE_BAR,
   payload: state
});

export const setBreadcrumb = (breadcrumb) => ({
   type: types.SET_BREADCRUMB,
   payload: breadcrumb
});