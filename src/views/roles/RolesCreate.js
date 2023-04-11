import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setRolesError, startCreateRole } from '../../actions/roles';
import { handleResetRows, handleRowChange, setPermissionsError } from '../../actions/permissions';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import PermissionsPicker from '../../components/roles/PermissionsPicker';



// Helpers
import { handleInvalidName } from '../../helpers/validations';



const RolesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { nameError, loadingCreate } = useSelector(state => state.roles);
   const { rowFields: rawPermissions } = useSelector(state => state.permissions);

   const [name, setName] = useState('');
   const [hexColor, setHexColor] = useState('#FFFFFF');

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
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setHexColor('#FFFFFF');

         dispatch(setRolesError('name', null));
         dispatch(setPermissionsError('permissionId', null))
         dispatch(handleResetRows());
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setRolesError('name', nameE));

      setName(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setRolesError('name', nameE));

      const permissionsE = rawPermissions.length > 0 ? null : 'Debe agregar al menos un permiso';
      dispatch(setPermissionsError('permissions', permissionsE));

      let permissionE = false;
      rawPermissions.forEach((permission, index) => {

         if (!permission.list && !permission.create && !permission.edit && !permission.delete) {
            permissionE = true;

            dispatch(handleRowChange('Debe asignarle al menos un acceso al permiso', index, 'permissionIdError'));
         }
      });

      if (!nameE && !permissionsE && !permissionE) {
         const permissions = rawPermissions.map(per => ({
            id: per.permissionId,
            list: per.list,
            create: per.create,
            edit: per.edit,
            delete: per.delete
         }));

         dispatch(startCreateRole({name, hexColor, permissions}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      setHexColor('#FFFFFF');

      dispatch(setRolesError('name', null));
      dispatch(setPermissionsError('permissionId', null))
      dispatch(handleResetRows());
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title={'Crear rol'}
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del rol'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Input
                           value={hexColor}
                           type='color'
                           setValue={setHexColor}
                           title={'Color de fondo'}
                           containerClass='col-md-6 col-12 mb-1'
                        />
                     </div>
                  </div>

                  <PermissionsPicker />
               </Form>
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

         <LoadingResponse state={loadingCreate} />
      </>
   );
}



export default RolesCreate;