import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setLoading, setReception, startGetReception } from '../../actions/receptions';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import { usePermission } from '../../hooks/usePermission';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const StatesDetail = () => {

   usePermission({section: 'receptions', permission: 'list'});

   const dispatch = useDispatch();

   const { id } = useParams();

   const { reception, loadingDetail } = useSelector(state => state.receptions);

   useEffect(() => {
      if (reception === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/receptions',
            text: 'Recepciones'
         },
         {
            text: reception?.date
         }
      ]));
   }, [dispatch, reception]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetReception(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setReception(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   if (!loadingDetail && !reception) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/receptions'
         />
      );
   }

   return (
      <div className='row invoice-preview mt-2'>
         <div className='col-xl-9 col-md-8 col-12 position-relative'>
            <div className='card invoice-preview-card mb-1'>
               <div className='card-body invoice-padding pb-0'>
                  <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                     <h4 className='mb-0 fw-bolder'>Detalles de la recepción</h4>

                     <div className='mt-md-0 mt-2'>
                        <h4 className='invoice-title mb-0'><span className='invoice-number'>#{reception?.id}</span></h4>
                     </div>
                  </div>
               </div>

               <hr className='invoice-spacing' />

               <div className='card-body invoice-padding pt-0'>
                  <div className='row'>
                     <div className='col-xl-6 mx-auto'>
                        <table className='w-100'>
                           <tbody>
                              <tr>
                                 <td className='pe-1'>Fecha de consignación:</td>

                                 <td className='text-end fw-bolder'>{moment(reception?.date).format('DD-MM-YYYY')}</td>
                              </tr>

                              <PermissionNeeded onlyAdmin>
                                 <tr>
                                    <td className='pe-1'>Fecha de creación:</td>

                                    <td className='text-end fw-bolder'>{moment(reception?.createdAt).format('DD-MM-YYYY HH:mm a')}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Consignado por:</td>

                                    <td className='text-end fw-bolder'>{reception?.consignee?.fullName}</td>
                                 </tr>
                              </PermissionNeeded>
                           </tbody>
                        </table>
                     </div>

                     <PermissionNeeded onlyAdmin>
                        <div className='col-xl-6'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Empresa:</td>

                                    <td className='text-end fw-bolder'>{reception?.company?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Fecha de creación:</td>

                                    <td className='text-end fw-bolder'>{moment(reception?.createdAt).format('DD-MM-YYYY HH:mm a')}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Consignado por:</td>

                                    <td className='text-end fw-bolder'>{reception?.consignee?.fullName}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </PermissionNeeded>
                  </div>
               </div>
            </div>

            <div className='card invoice-preview-card mb-2'>
               <div className='card-body invoice-padding pb-0'>
                  <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                     <h4 className='mb-0 fw-bolder'>Productos de la recepción</h4>
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
                                    <th>Producto</th>

                                    <th className='text-center' style={{width: 200}}>Cantidad de paletas</th>
                                 </tr>
                              </thead>
                              
                              <tbody>
                                 {
                                    reception?.products?.map(p => (
                                       <tr key={'reception-product-' + p.id}>
                                          <td>{p.product.name}</td>

                                          <td className='text-center'>{p.qty}</td>
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
                     to='/receptions'
                     className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                  >Volver a listado</Link>
               </div>
            </div>
         </div>
      </div>
   );
}



export default StatesDetail;