import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setRole, setLoading, startDeleteRole, startGetRole } from '../../actions/roles';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';



// Helpers
import { contrastColor } from '../../helpers/colors';



// Custom hooks
import { usePermission } from '../../hooks/usePermission';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const RolesDetail = () => {

   usePermission({section: 'roles', permission: 'list'});

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { role, loadingDetail, loadingDelete } = useSelector(state => state.roles);

   useEffect(() => {
      if (role === null) return;

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
            text: role?.name
         }
      ]));
   }, [dispatch, role]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetRole(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setRole(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteRole(id, { navigate }));

   if (!loadingDetail && !role) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/roles'
         />
      );
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Detalles del role</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{role?.id}</span></h4>
                        </div>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-xl-6 p-0 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Nombre:</td>

                                    <td className='text-end fw-bolder'>{role?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Color:</td>

                                    <td className='text-end fw-bolder'>
                                       <span
                                          className='p-25 rounded'
                                          style={{
                                             color: contrastColor(role?.hexColor),
                                             backgroundColor: role?.hexColor
                                          }}
                                       >{role?.hexColor}</span>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Permisos</h4>
                     </div>
                  </div>

                  <hr className='invoice-spacing mb-0' />

                  <div className='card-body invoice-padding pt-0 px-0'>
                     <div className='row'>
                        <div className='col'>
                           <div className='table-responsive'>
                              <table className='invoice-list-table table dataTable no-footer dtr-column'>
                                 <thead>
                                    <tr>
                                       <th className='text-center'>Nombre</th>

                                       <th className='text-center'>Listar</th>

                                       <th className='text-center'>Crear</th>

                                       <th className='text-center'>Editar</th>

                                       <th className='text-center'>Eliminar</th>
                                    </tr>
                                 </thead>
                                 
                                 <tbody>
                                    {
                                       role?.rolePermissions?.map(row => (
                                          <tr key={'permission-' + row.id}>
                                             <td className='text-center'>{row.permission.showName}</td>

                                             <td className={`text-center ${row.list ? 'text-success' : 'text-danger'}`}>
                                                {row.list ? 'Sí' : 'No'}
                                             </td>

                                             <td className={`text-center ${row.list ? 'text-success' : 'text-danger'}`}>
                                                {row.create ? 'Sí' : 'No'}
                                             </td>

                                             <td className={`text-center ${row.list ? 'text-success' : 'text-danger'}`}>
                                                {row.edit ? 'Sí' : 'No'}
                                             </td>

                                             <td className={`text-center ${row.list ? 'text-success' : 'text-danger'}`}>
                                                {row.delete ? 'Sí' : 'No'}
                                             </td>
                                          </tr>
                                       ))
                                    }
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/roles'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     {
                        !role?.isPublic && (
                           <PermissionNeeded
                              section='roles'
                              permission='edit'
                           >
                              <Link
                                 to={`/roles/edit/${id}`}
                                 className='btn btn-info w-100 mt-75 waves-effect waves-float waves-light'
                              >Editar</Link>
                           </PermissionNeeded>
                        )
                     }

                     {
                        !role?.isPublic && (
                           <PermissionNeeded
                              section='roles'
                              permission='delete'
                           >
                              <button
                                 className='btn btn-danger w-100 mt-75 waves-effect waves-float waves-light'
                                 onClick={handleDelete}
                                 disabled={loadingDelete || loadingDetail}
                              >Eliminar</button>
                           </PermissionNeeded>
                        )
                     }
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingDelete} />
      </>
   );
}



export default RolesDetail;