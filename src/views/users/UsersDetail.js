import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setLoading, setUser, startDeleteUser, startGetUser } from '../../actions/users';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';



const UsersDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { user, loadingDetail, loadingDelete } = useSelector(state => state.users);

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

   const handleDelete = () => dispatch(startDeleteUser(id, { navigate }));

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
                        <div className='col-xl-7 p-0 mx-xl-auto'>
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

         <LoadingResponse state={loadingDelete} />
      </>
   );
}



export default UsersDetail;