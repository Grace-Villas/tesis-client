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

export const setTheme = (state) => ({
   type: types.SET_THEME,
   payload: state
});

export const startSetTheme = (state) => {
   return dispatch => {
      localStorage.setItem('theme', state);

      dispatch(setTheme(state));
   }
}