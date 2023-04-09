import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setLoading, setUser, startDeleteUser, startDellocateRoleFromUser, startGetUser } from '../../actions/users';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import AddRoleModal from '../../components/roles/AddRoleModal';
import { contrastColor } from '../../helpers/colors';
import Icon from '../../components/ui/Icon';



const UsersDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { user, loadingDetail, loadingDelete } = useSelector(state => state.users);

   console.log(user);

   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (user === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/users',
            text: 'Usuarios'
         },
         {
            text: user?.fullName
         }
      ]));
   }, [dispatch, user]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetUser(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setUser(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleRoleModal = () => setIsOpen(true);

   const handleDelete = () => dispatch(startDeleteUser(id, { navigate }));

   const handleRemoveRole = (userRoleId) => dispatch(startDellocateRoleFromUser(userRoleId));

   if (!loadingDetail && !user) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/users'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del usuario</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{user?.id}</span></h4>
                        </div>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Nombre:</td>

                                    <td className='text-end fw-bolder'>{user?.firstName}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Apellido:</td>

                                    <td className='text-end fw-bolder'>{user?.lastName}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>correo:</td>

                                    <td className='text-end fw-bolder'>{user?.email}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6'>
                           <h6 className='text-center fw-bolder'>Roles</h6>

                           <div className='d-flex flex-wrap gap-50'>
                              {
                                 user?.userRoles?.map(role => (
                                    <span
                                       key={'user-role-' + role.id}
                                       className='px-50 py-25 rounded'
                                       style={{
                                          backgroundColor: role.role.hexColor,
                                          color: contrastColor(role.role.hexColor)
                                       }}
                                    >{role.role.name}</span>
                                 ))
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-center flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder text-center'>Roles del usuario</h4>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 {
                                    user?.userRoles?.map(role => (
                                       <tr key={'user-role-' + role.id}>
                                          <td className='text-center'>
                                             <span
                                                className='px-50 py-25 rounded'
                                                style={{
                                                   backgroundColor: role.role.hexColor,
                                                   color: contrastColor(role.role.hexColor)
                                                }}
                                             >{role.role.name}</span>
                                          </td>

                                          <td className='text-center'>
                                             <div className='d-flex justify-content-center gap-1'>
                                                <button
                                                   type='button'
                                                   className='btn btn-sm btn-relief-danger'
                                                   onClick={() => handleRemoveRole(role.id)}
                                                >
                                                   <Icon icon='Trash2' size={16} />
                                                </button>
                                             </div>
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

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/users'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <button
                        className='btn btn-warning w-100 mb-75 waves-effect waves-float waves-light'
                        onClick={handleRoleModal}
                        disabled={loadingDelete || loadingDetail}
                     >Asignar roles</button>

                     <Link
                        to={`/users/edit/${id}`}
                        className='btn btn-info w-100 mb-75 waves-effect waves-float waves-light'
                     >Editar</Link>

                     <button
                        className='btn btn-danger w-100 waves-effect waves-float waves-light'
                        onClick={handleDelete}
                        disabled={loadingDelete || loadingDetail}
                     >Eliminar</button>
                  </div>
               </div>
            </div>
         </div>

         <AddRoleModal
            userId={user?.id}
            isOpen={isOpen}
            handleOpen={setIsOpen}
         />

         <LoadingResponse state={loadingDelete} />
      </>
   );
}



export default UsersDetail;