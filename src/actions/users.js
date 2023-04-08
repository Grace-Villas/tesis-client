import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
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

         const unhandledErrors = errors.filter(error => !['firstName', 'lastName', 'email', 'password'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setUsers = (rows, count, pages) => ({
   type: types.SET_USERS,
   payload: { rows, count, pages }
});

export const startGetUsers = (page, perPage, filters = {}) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/users?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
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

export const startDeleteUser = (id, { page, perPage, navigate }, filters = {}) => {
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
               dispatch(startGetUsers(page, perPage, filters));
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

         const unhandledErrors = errors.filter(error => !['firstName', 'lastName', 'email', 'password'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}



// UserRoles

export const startAllocateRoleToUser = (userId, roleId) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('info', '¿Está seguro?', '¿Desea asignar el rol al usuario actual?');

         if (isConfirmed) {
            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: '/roles/user-role',
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               },
               body: { userId, roleId }
            });

            const userRole = response.data;

            simpleSuccessToast(`El rol fue asignado satisfactoriamente`);

            dispatch(startGetUser(userRole.userId));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}

export const startDellocateRoleFromUser = (userRoleId) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea remover el rol del usuario actual?');

         if (isConfirmed) {
            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/roles/user-role/${userRoleId}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const userRole = response.data;

            simpleSuccessToast(`El rol fue removido satisfactoriamente`);

            dispatch(startGetUser(userRole.userId));
         }
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
   }
}