import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import {
   handleAddRow, handleDeleteRow, handleRowChange,
   setPermissionsError, setPermissionsList, startGetPermissionsList
} from '../../actions/permissions';



// Components
import Icon from '../ui/Icon';
import Select from '../form/Select';
import Switch from '../form/Switch';



const PermissionsPicker = () => {

   const dispatch = useDispatch();

   const { permissionsList, loadingList, rowFields, permissionsError, permissionIdError } = useSelector(state => state.permissions);

   const [permissionId, setPermissionId] = useState('');
   const [list, setList] = useState(true);
   const [create, setCreate] = useState(true);
   const [edit, setEdit] = useState(true);
   const [del, setDel] = useState(true);

   const [filteredPermissions, setFilteredPermissions] = useState([]);

   useEffect(() => {
      const permissionsId = rowFields.map(row => Number(row.permissionId));
      
      setFilteredPermissions(permissionsList.filter(permission => !permissionsId.includes(permission.value)));
   }, [rowFields, permissionsList]);

   useEffect(() => {
      dispatch(startGetPermissionsList());
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setPermissionId('');
         setList(true);
         setCreate(true);
         setEdit(true);
         setDel(true);

         dispatch(setPermissionsList([]));
      }
   }, [dispatch]);

   const handlePermissionId = (value) => {
      dispatch(setPermissionsError('permissionId', null));
      setPermissionId(value);
   }

   const handlePermissionChange = (value, index, key) => dispatch(handleRowChange(value, index, key));

   const handleAdd = () => {
      if (permissionId === '') {
         dispatch(setPermissionsError('permissionId', 'Debe seleccionar un permiso'));
         return;
      }

      dispatch(handleAddRow(permissionId, list, create, edit, del));
      dispatch(setPermissionsError('permissions', null));
      setPermissionId('');
      setList(true);
      setCreate(true);
      setEdit(true);
      setDel(true);
   }

   const handleDelete = (index) => dispatch(handleDeleteRow(index));

   return (
      <>
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

         <h5 className='mx-auto mb-1 mt-2 fw-bolder'>Listado de permisos agregados</h5>

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
                     rowFields.length > 0 && (
                        rowFields.map((row, i) => {

                           const currentRow = permissionsList.find(per => per.value === Number(row.permissionId));

                           return (
                              <tr key={'permission-' + i}>
                                 <td className='py-1'>
                                    <div className='d-flex flex-column'>
                                       <p className='mb-0'>{currentRow?.text}</p>

                                       {
                                          currentRow?.permissionIdError && (
                                             <div
                                                className='text-danger mb-0 mt-25'
                                                style={{fontSize: '0.857rem'}}
                                             >{currentRow?.permissionIdError}</div>
                                          )
                                       }
                                    </div>
                                 </td>
      
                                 <td className='p-1 border-start'>
                                    <Switch
                                       containerClass='align-items-center'
                                       name={'list-' + i}
                                       value={row.list}
                                       setValue={(value) => handlePermissionChange(value, i, 'list')}
                                    />
                                 </td>
      
                                 <td className='p-1'>
                                    <Switch
                                       containerClass='align-items-center'
                                       name={'create-' + i}
                                       value={row.create}
                                       setValue={(value) => handlePermissionChange(value, i, 'create')}
                                    />
                                 </td>
      
                                 <td className='p-1'>
                                    <Switch
                                       containerClass='align-items-center'
                                       name={'edit-' + i}
                                       value={row.edit}
                                       setValue={(value) => handlePermissionChange(value, i, 'edit')}
                                    />
                                 </td>
      
                                 <td className='p-1 border-end'>
                                    <Switch
                                       containerClass='align-items-center'
                                       name={'delete-' + i}
                                       value={row.delete}
                                       setValue={(value) => handlePermissionChange(value, i, 'delete')}
                                    />
                                 </td>
      
                                 <td className='py-1'>
                                    <button
                                       type='button'
                                       className='btn btn-sm btn-outline-danger text-nowrap p-50 waves-effect d-flex align-items-center mx-auto'
                                       onClick={() => handleDelete(i)}
                                    >
                                       <Icon icon='X' size={14} />
      
                                       <span style={{lineHeight: '80%'}}>Eliminar</span>
                                    </button>
                                 </td>
                              </tr>
                           );
                        })
                     )
                  }

                  {
                     rowFields.length === 0 && (
                        <tr>
                           <td colSpan={6}>
                              <p className='mb-0 py-4 text-center fs-5'>Agregue un permiso con el botón <b>"agregar"</b></p>
                           </td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
      </>
   );
}



export default PermissionsPicker;