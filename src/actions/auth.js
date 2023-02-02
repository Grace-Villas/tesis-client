import { isEmail } from 'validator';
import { request } from '../helpers/request';
import { types } from '../reducers/authReducer';



// Actions

export const setAuth = ({id, email, name, isAdmin, uuid, permissions}) => ({
   type: types.LOGIN,
   payload: { id, email, name, isAdmin, uuid, permissions }
});

export const startLogin = (email, password, remember = false) => {
   return async dispatch => {
      dispatch(setLoadingLogin(true));

      let error = false;

      if (email.trim().length === 0) {
         dispatch(setLoginError('email', 'El correo es obligatorio'));
         error = true;
      } else if (!isEmail(email)) {
         dispatch(setLoginError('email', 'El correo es inválido'));
         error = true;
      } else {
         dispatch(setLoginError('email', null));
      }

      if (password.trim().length === 0) {
         dispatch(setLoginError('password', 'La contraseña es obligatoria'));
         error = true;
      } else {
         dispatch(setLoginError('password', null));
      }

      if (!error) {
         try {
            const response = await request({
               path: '/auth/login',
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: {
                  email, password
               }
            });
   
            const { token, user } = response.data;
   
            if (remember) {
               localStorage.setItem('x-token', token);
            } else {
               sessionStorage.setItem('x-token', token);
            }
   
            dispatch(setAuth(user));
         } catch (error) {
            console.log(error);
            
            dispatch(setLoginError('email', 'El correo o la contraseña son incorrectos'));
         }
      }

      dispatch(setLoadingLogin(false));
   }
}

export const setLoadingLogin = (state) => ({
   type: types.LOADING_LOGIN,
   payload: state
});

export const setLoginError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error}
});

export const logout = () => ({
   type: types.LOGOUT
});

export const startLogout = () => {
   return async dispatch => {
      localStorage.removeItem('x-token');
      sessionStorage.removeItem('x-token');

      dispatch(logout());
   }
}



// Autenticación persistente

export const startGetData = () => {
   return async (dispatch) => {
      dispatch(setLoadingData(true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/auth/renew',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { user } = response.data;

         dispatch(setAuth(user));
      } catch (error) {
         console.log(error);

         localStorage.removeItem('x-token');
         sessionStorage.removeItem('x-token');
         
         dispatch(startLogout());
      }

      dispatch(setLoadingData(false));
   }
}

export const setLoadingData = (state) => ({
   type: types.LOADING_DATA,
   payload: state
});

export const startKeepLogged = () => {
   return async (dispatch, getState) => {
      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const { name } = getState().auth;

         (token && !name) ? dispatch(startGetData()) : dispatch(setLoadingData(false));
      } catch (error) {
         console.log(error);
      }
   }
}



// Actualizando atributos de autenticación

export const setAuthAttribute = (key, value) => ({
   type: types.SET_ATTRIBUTE,
   payload: { key, value }
});