import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setClient, setLoading, startDeleteClient, startGetClient } from '../../../actions/clients';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import ClientsNav from '../../../components/clients/ClientsNav';



// Routers
import ClientsDetailRouter from '../../../routers/views/ClientsDetailRouter';



// Custom hooks
import { usePermission } from '../../../hooks/usePermission';
import PermissionNeeded from '../../../components/ui/PermissionNeeded';



const ClientsDetail = () => {

   usePermission({section: 'companies', permission: 'list', onlyAdmin: true});

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { client, loadingDetail, loadingDelete } = useSelector(state => state.clients);

   useEffect(() => {
      if (client === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/clients',
            text: 'Clientes'
         },
         {
            text: client?.name
         }
      ]));
   }, [dispatch, client]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetClient(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setClient(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteClient(client?.id, { navigate }));

   if (!loadingDetail && !client) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/clients'
         />
      );
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-12'>
               <ClientsNav />
            </div>

            <ClientsDetailRouter />

            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/clients'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <PermissionNeeded
                        section='companies'
                        permission='edit'
                        onlyAdmin
                     >
                        <Link
                           to={`/clients/edit/${client?.id}`}
                           className='btn btn-info w-100 mb-75 waves-effect waves-float waves-light'
                        >Editar</Link>
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='companies'
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



export default ClientsDetail;