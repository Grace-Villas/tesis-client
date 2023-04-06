import { arrayErrorToast, simpleConfirmDialog, simpleSuccessToast } from '../helpers/alerts';
import { capitalizeAllWords, queryParamsFilter } from '../helpers/format';
import { getPaginationQuery } from '../helpers/pagination';
import { request } from '../helpers/request';
import { types } from '../reducers/rolesReducer';



// Actions
import { handleRowChange } from './permissions';



// Actions

export const setLoading = (key, state) => ({
   type: types.SET_LOADING,
   payload: { key, state }
});

export const setRolesError = (key, error) => ({
   type: types.SET_ERROR,
   payload: { key, error }
});

export const startCreateRole = ({ name, hexColor, isPublic, permissions }, navigate) => {
   return async dispatch => {
      dispatch(setLoading('create', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/roles',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: {
               name, hexColor, isPublic, permissions
            }
         });

         const { id, name: createdName } = response.data;

         const roleName = capitalizeAllWords(createdName);

         simpleSuccessToast(`El rol: ${roleName}, fue creado satisfactoriamente`);

         navigate(`/roles/${id}`);
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setRolesError('name', errors.find(err => err.param === 'name')?.msg || null));

         const errorList = errors.filter(error => error.param.includes('.'));

         errorList.forEach(error => {
            const { param, msg } = error;

            const indexString = param.match(/(\d+)/);

            const index = Number(indexString);

            dispatch(handleRowChange(msg, index, 'permissionIdError'));
         });

         const unhandledErrors = errors.filter(error => !['name', 'hexColor', 'permissions'].includes(error.param));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('create', false));
   }
}

export const setRoles = (rows, count, pages) => ({
   type: types.SET_ROLES,
   payload: { rows, count, pages }
});

export const startGetRoles = (page, perPage, filters) => {
   return async dispatch => {
      dispatch(setLoading('table', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/roles?${getPaginationQuery(page, perPage)}&${queryParamsFilter(filters)}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const { rows, count, pages } = response.data;

         const mappedRows = rows.map(row => ({
            ...row,
            name: capitalizeAllWords(row.name)
         }));

         dispatch(setRoles(mappedRows, count, pages));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('table', false));
   }
}

export const startDeleteRole = (id, { page, perPage, navigate }) => {
   return async dispatch => {
      try {
         const { isConfirmed } = await simpleConfirmDialog('warning', '¿Está seguro?', '¿Desea eliminar el rol seleccionado?');

         if (isConfirmed) {
            dispatch(setLoading('delete', true));

            const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

            const response = await request({
               path: `/roles/${id}`,
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'x-token': token
               }
            });

            const { name } = response.data;

            const roleName = capitalizeAllWords(name);

            simpleSuccessToast(`El rol: ${roleName}, fue eliminado satisfactoriamente`);

            if (!navigate) {
               dispatch(startGetRoles(page, perPage));
            } else {
               navigate('/roles');
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

export const setRole = (role) => ({
   type: types.SET_ROLE_DATA,
   payload: role
});

export const startGetRole = (id) => {
   return async dispatch => {
      dispatch(setLoading('detail', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/roles/${id}`,
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const role = response.data;

         role.name = capitalizeAllWords(role.name);

         role.rolePermissions = role.rolePermissions.map(rolePermission => ({
            ...rolePermission,
            permission: {
               ...rolePermission.permission,
               showName: capitalizeAllWords(rolePermission.permission.showName)
            }
         }))

         dispatch(setRole(role));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('detail', false));
   }
}

export const startUpdateRole = (id, { name, hexColor }) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/roles/${id}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { name, hexColor }
         });

         const role = response.data;

         const roleName = capitalizeAllWords(role.name);

         simpleSuccessToast(`El rol: ${roleName}, fue actualizado satisfactoriamente`);

         dispatch(startGetRole(role.id));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         dispatch(setRolesError('name', errors.find(err => err.param === 'name')?.msg || null));

         const unhandledErrors = errors.filter(({param}) => !['name', 'hexColor', 'permissions'].includes(param) || !param.includes('.'));

         if (unhandledErrors.length > 0) {
            arrayErrorToast(unhandledErrors.map(error => error.msg));
         }
      }

      dispatch(setLoading('update', false));
   }
}

export const setRolesList = (rows) => ({
   type: types.SET_ROLES_LIST,
   payload: rows
});

export const startGetRolesList = () => {
   return async dispatch => {
      dispatch(setLoading('list', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/roles',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rows = response.data;

         const mappedRows = rows.map(row => ({
            text: capitalizeAllWords(row.name),
            value: row.id
         }));

         dispatch(setRolesList(mappedRows));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }
      
      dispatch(setLoading('list', false));
   }
}



// RolePermissions

export const startCreateRolePermission = (roleId, permissionId, list, create, edit, del) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: '/role-permissions',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: { roleId, permissionId, list, create, edit, delete: del }
         });

         const rolePermission = response.data;

         simpleSuccessToast(`El permiso fue agregado satisfactoriamente`);

         dispatch(startGetRole(rolePermission.roleId));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('update', false));
   }
}

export const startUpdateRolePermission = (rolePermissionId, options = {}) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      console.log(rolePermissionId, options);

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/role-permissions/${rolePermissionId}`,
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            },
            body: options
         });

         const rolePermission = response.data;

         simpleSuccessToast(`El permiso fue actualizado satisfactoriamente`);

         dispatch(startGetRole(rolePermission.roleId));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('update', false));
   }
}

export const startDeleteRolePermission = (rolePermissionId) => {
   return async dispatch => {
      dispatch(setLoading('update', true));

      try {
         const token = localStorage.getItem('x-token') || sessionStorage.getItem('x-token');

         const response = await request({
            path: `/role-permissions/${rolePermissionId}`,
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
               'x-token': token
            }
         });

         const rolePermission = response.data;

         simpleSuccessToast(`El permiso fue eliminado satisfactoriamente`);

         dispatch(startGetRole(rolePermission.roleId));
      } catch (error) {
         console.log(error);

         const { errors } = error.response.data;

         arrayErrorToast(errors.map(error => error.msg));
      }

      dispatch(setLoading('update', false));
   }
}