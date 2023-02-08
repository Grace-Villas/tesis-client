import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/usersReducer';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setUsersError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateUser = ({ firstName, lastName, password, email }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/users',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { firstName, lastName, password, email }
         });

         const { id, fullName } = response.data;

         const userName = capitalizeAllWords(fullName);

         simpleSuccessToast(`El usuario: ${userName}, fue registrado satisfactoriamente`);

         navigate(`/users/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setUsersError('firstName', errors.find(err => err.param === 'firstName')?.msg || null));
         dispatch(setUsersError('lastName', errors.find(err => err.param === 'lastName')?.msg || null));
         dispatch(setUsersError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setUsersError('password', errors.find(err => err.param === 'password')?.msg || null));

         const errorsArray = errors.filter(error => !['firstName', 'lastName', 'email', 'password'].includes(error.param))
            .map(error => error.msg);

         arrayErrorToast(errorsArray);
      }

      dispatch(setLoading('create', false));
   }
}

export const setUsers = (rows, count, pages) => ({
   type: types.SET_USERS,
   payload: { rows, count, pages }
});

export const startGetUsers = (page, perPage) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/users?${getPaginationQuery(page, perPage)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => ({
            ...row,
            lastName: capitalizeAllWords(row.lastName),
            firstName: capitalizeAllWords(row.firstName),
            fullName: capitalizeAllWords(row.fullName),
         }));

         dispatch(setUsers(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteUser = (id, { page, perPage, navigate }) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el usuario seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/users/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { fullName } = response.data;

            const userName = capitalizeAllWords(fullName);

            simpleSuccessToast(`El usuario: ${userName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetUsers(page, perPage));
            } else {
               navigate('/users');
            }
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('delete', false));
   }
}

export const setUser = (user) => ({
   type: types.SET_USER_DATA,
   payload: user
});

export const startGetUser = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/users/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const user = response.data;

         user.firstName = capitalizeAllWords(user.firstName);
         user.lastName = capitalizeAllWords(user.lastName);
         user.fullName = capitalizeAllWords(user.fullName);

         dispatch(setUser(user));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateUser = (id, { firstName, lastName, email, password }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/users/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { firstName, lastName, email, password }
         });

         const user = response.data;

         const userName = capitalizeAllWords(user.fullName);

         simpleSuccessToast(`El usuario: ${userName}, fue actualizado satisfactoriamente`);

         dispatch(setUser(user));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setUsersError('firstName', errors.find(err => err.param === 'firstName')?.msg || null));
         dispatch(setUsersError('lastName', errors.find(err => err.param === 'lastName')?.msg || null));
         dispatch(setUsersError('email', errors.find(err => err.param === 'email')?.msg || null));
         dispatch(setUsersError('password', errors.find(err => err.param === 'password')?.msg || null));

         const errorsArray = errors.filter(error => !['firstName', 'lastName', 'email', 'password'].includes(error.param))
            .map(error => error.msg);

         arrayErrorToast(errorsArray);
      }

      dispatch(setLoading('update', false));
   }
}