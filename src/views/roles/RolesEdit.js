import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import {
   setRolesError, setLoading,
   setRole, startGetRole, startUpdateRole,
   startUpdateRolePermission, startDeleteRolePermission, startCreateRolePermission
} from '../../actions/roles';
import { setPermissionsError, startGetPermissionsList } from '../../actions/permissions';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Icon from '../../components/ui/Icon';
import Input from '../../components/form/Input';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Select from '../../components/form/Select';
import Switch from '../../components/form/Switch';
import Form from '../../components/form/Form';



// Helpers
import { handleInvalidName } from '../../helpers/validations';



const RolesEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { nameError, permissionsError, loadingUpdate, loadingDetail, role } = useSelector(state => state.roles);

   const { permissionsList, permissionIdError, loadingList } = useSelector(state => state.permissions);

   const [name, setName] = useState('');
   const [hexColor, setHexColor] = useState('#FFFFFF');

   const [filteredPermissions, setFilteredPermissions] = useState([]);

   const [permissionId, setPermissionId] = useState('');
   const [list, setList] = useState(true);
   const [create, setCreate] = useState(true);
   const [edit, setEdit] = useState(true);
   const [del, setDel] = useState(true);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetRole(id));
   }, [dispatch, id]);

   useEffect(() => {
      setName(role?.name || '');
      setHexColor(role?.hexColor || '#FFFFFF');
   }, [role?.name, role?.hexColor]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/roles',
            text: 'Roles'
         },
         {
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setHexColor('');
         
         dispatch(setRolesError('name', null));

         dispatch(setRole(null));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   useEffect(() => {
      const permissionsId = role?.rolePermissions?.map(rolePermissions => rolePermissions.permissionId) || [];
      
      setFilteredPermissions(permissionsList.filter(permission => !permissionsId.includes(permission.value)));
   }, [role?.rolePermissions, permissionsList]);

   useEffect(() => {
      dispatch(startGetPermissionsList());
   }, [dispatch]);

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setRolesError('name', nameE));

      setName(value);
   }

   const handlePermissionChange = (rolePermissionId, option) => dispatch(startUpdateRolePermission(rolePermissionId, option));

   const handlePermissionDelete = (rolePermissionId) => dispatch(startDeleteRolePermission(rolePermissionId));

   const handlePermissionId = (value) => {
      dispatch(setPermissionsError('permissionId', null));
      setPermissionId(value);
   }

   const handleAdd = () => {
      if (permissionId === '') {
         dispatch(setPermissionsError('permissionId', 'Debe seleccionar un permiso'));
         return;
      }

      dispatch(startCreateRolePermission(role?.id, permissionId, list, create, edit, del));
      dispatch(setPermissionsError('permissions', null));
      setPermissionId('');
      setList(true);
      setCreate(true);
      setEdit(true);
      setDel(true);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setRolesError('name', nameE));

      if (!nameE) {
         dispatch(startUpdateRole(role.id, {name, hexColor}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(role?.name);
      setHexColor(role?.hexColor);
      
      dispatch(setRolesError('name', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar rol'
                  id={role?.id}
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >

                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del país'
                           containerClass='col-md-8 col-12 mb-1'
                           error={nameError}
                        />

                        <Input
                           value={hexColor}
                           type='color'
                           setValue={setHexColor}
                           title={'Color de fondo'}
                           containerClass='col-md-4 col-6 mb-1'
                        />
                     </div>
                  </div>

                  <h5 className='mx-auto mb-1 mt-2 fw-bolder'>Listado de permisos</h5>

                  {
                     permissionsError && (
                        <span className='text-center text-danger'><small>{permissionsError}</small></span>
                     )
                  }

                  <div className='table-responsive mb-50'>
                     <table className={`table ${permissionsError && 'border border-danger'}`}>
                        <thead>
                           <tr>
                              <th className='py-50 align-middle'>Permiso</th>

                              <th className='p-1 py-50 text-center align-middle' style={{width: 90}}>Listar</th>

                              <th className='p-1 py-50 text-center align-middle' style={{width: 90}}>Crear</th>

                              <th className='p-1 py-50 text-center align-middle' style={{width: 90}}>Editar</th>

                              <th className='p-1 py-50 text-center align-middle' style={{width: 90}}>Eliminar</th>

                              <th className='py-50' style={{width: 154}}></th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              role?.rolePermissions?.map(rolePermission => (
                                 <tr key={'permission-' + rolePermission.id}>
                                    <td className='py-1'>{rolePermission.permission.showName}</td>
         
                                    <td className='p-1 border-start'>
                                       <Switch
                                          containerClass='align-items-center'
                                          name={'list-' + rolePermission.id}
                                          value={rolePermission.list}
                                          setValue={() => handlePermissionChange(rolePermission.id, { list: !rolePermission.list })}
                                       />
                                    </td>
         
                                    <td className='p-1'>
                                       <Switch
                                          containerClass='align-items-center'
                                          name={'create-' + rolePermission.id}
                                          value={rolePermission.create}
                                          setValue={() => handlePermissionChange(rolePermission.id, { create: !rolePermission.create })}
                                       />
                                    </td>
         
                                    <td className='p-1'>
                                       <Switch
                                          containerClass='align-items-center'
                                          name={'edit-' + rolePermission.id}
                                          value={rolePermission.edit}
                                          setValue={() => handlePermissionChange(rolePermission.id, { edit: !rolePermission.edit })}
                                       />
                                    </td>
         
                                    <td className='p-1 border-end'>
                                       <Switch
                                          containerClass='align-items-center'
                                          name={'delete-' + rolePermission.id}
                                          value={rolePermission.delete}
                                          setValue={() => handlePermissionChange(rolePermission.id, { delete: !rolePermission.delete })}
                                       />
                                    </td>
         
                                    <td className='py-1'>
                                       <button
                                          type='button'
                                          className='btn btn-sm btn-outline-danger text-nowrap p-50 waves-effect d-flex align-items-center mx-auto'
                                          onClick={() => handlePermissionDelete(rolePermission.id)}
                                       >
                                          <Icon icon='X' size={14} />
         
                                          <span style={{lineHeight: '80%'}}>Eliminar</span>
                                       </button>
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>

                  <h5 className='mx-auto mb-1 mt-2 fw-bolder'>Agregar permisos</h5>

                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Select
                           value={permissionId}
                           setValue={(value) => handlePermissionId(value)}
                           title='Permiso'
                           name='permissionId'
                           placeholder='Seleccione un permiso'
                           containerClass='col-md-4 col-12 mb-1'
                           options={filteredPermissions}
                           error={permissionIdError}
                           disabled={loadingList}
                        />

                        <Switch
                           name='list'
                           value={list}
                           setValue={() => setList(!list)}
                           title='¿Listar?'
                           containerClass='col-md col-6 mb-1 align-items-center'
                           wrapperClass='my-auto'
                        />

                        <Switch
                           name='create'
                           value={create}
                           setValue={() => setCreate(!create)}
                           title='¿Crear?'
                           containerClass='col-md col-6 mb-1 align-items-center'
                           wrapperClass='my-auto'
                        />

                        <Switch
                           name='edit'
                           value={edit}
                           setValue={() => setEdit(!edit)}
                           title='¿Editar?'
                           containerClass='col-md col-6 mb-1 align-items-center'
                           wrapperClass='my-auto'
                        />

                        <Switch
                           name='delete'
                           value={del}
                           setValue={() => setDel(!del)}
                           title='¿Eliminar?'
                           containerClass='col-md col-6 mb-1 align-items-center'
                           wrapperClass='my-auto'
                        />

                        <div className='col-md-2 col-12 mb-1 d-flex justify-content-end'>
                           <div className='d-flex flex-column flex-grow-1'>
                              <label className='form-label text-white'>.</label>
                           
                              <div className='d-flex align-items-center flex-grow-1 ms-md-auto'>
                                 <button
                                    type='button'
                                    className='btn btn-sm btn-success text-nowrap p-50 waves-effect d-flex align-items-center justify-content-center w-100'
                                    onClick={handleAdd}
                                 >
                                    <Icon icon='Plus' size={14} />

                                    <span style={{lineHeight: '80%'}}>Agregar</span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Form>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/roles'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingUpdate} />
      </>
   );
}



export default RolesEdit;