import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setLoading, setState, startDeleteState, startGetState } from '../../../actions/states';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import { usePermission } from '../../../hooks/usePermission';
import PermissionNeeded from '../../../components/ui/PermissionNeeded';



const StatesDetail = () => {

   usePermission({section: 'states', permission: 'list', onlyAdmin: true});

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { state, loadingDetail, loadingDelete } = useSelector(state => state.states);

   useEffect(() => {
      if (state === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/states',
            text: 'Estados'
         },
         {
            text: state?.name
         }
      ]));
   }, [dispatch, state]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetState(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setState(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteState(id, { navigate }));

   if (!loadingDetail && !state) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/states'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del estado</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{state?.id}</span></h4>
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

                                    <td className='text-end fw-bolder'>{state?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>País:</td>

                                    <td className='text-end fw-bolder'>{state?.country?.name}</td>
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
                        to='/states'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <PermissionNeeded
                        section='states'
                        permission='edit'
                        onlyAdmin
                     >
                        <Link
                           to={`/states/edit/${id}`}
                           className='btn btn-info w-100 mb-75 waves-effect waves-float waves-light'
                        >Editar</Link>
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='states'
                        permission='delete'
                        onlyAdmin
                     >
                        <button
                           className='btn btn-danger w-100 waves-effect waves-float waves-light'
                           onClick={handleDelete}
                           disabled={loadingDelete || loadingDetail}
                        >Eliminar</button>
                     </PermissionNeeded>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingDelete} />
      </>
   );
}



export default StatesDetail;