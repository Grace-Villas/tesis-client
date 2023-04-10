import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setDispatch, setLoading, startDeleteDispatch, startDeliverDispatch, startDenyDispatch, startGetDispatch } from '../../actions/dispatches';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';



// Helpers
import { currencyFormat } from '../../helpers/format';



const DispatchesDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { dispatch: dispatchData, loadingDetail, loadingDelete } = useSelector(state => state.dispatches);

   useEffect(() => {
      if (dispatchData === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/dispatches',
            text: 'Despachos'
         },
         {
            text: moment(dispatchData?.date).format('DD-MM-YYYY')
         }
      ]));
   }, [dispatch, dispatchData]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetDispatch(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setDispatch(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDeliverDispatch = () => dispatch(startDeliverDispatch(id));

   const handleDenyDispatch = () => dispatch(startDenyDispatch(id));

   const handleDeleteDispatch = () => dispatch(startDeleteDispatch(id, { navigate }));

   if (!loadingDetail && !dispatchData) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/dispatches'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del despacho</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{dispatchData?.id}</span></h4>
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
                                    <td className='pe-1'>Estatus:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.status?.name?.toLocaleUpperCase()}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Fecha:</td>

                                    <td className='text-end fw-bolder'>{moment(dispatchData?.date).format('DD-MM-YYYY')}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Destinatario:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.receiver?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Teléfono:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.receiver?.phone}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Dirección:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.receiver?.address}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Ciudad:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.receiver?.city?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Estado:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.receiver?.city?.state?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Costo:</td>

                                    <td className='text-end fw-bolder'>{currencyFormat(dispatchData?.receiver?.city?.deliveryPrice)}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>

                     <div className='row mt-1'>
                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Cliente:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.company?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Teléfono:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.company?.phone}</td>
                                 </tr>
                                 
                                 <tr>
                                    <td className='pe-1'>Correo:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.company?.email}</td>
                                 </tr>
                                 
                                 <tr>
                                    <td className='pe-1'>Aplicante:</td>

                                    <td className='text-end fw-bolder'>{dispatchData?.applicant?.fullName}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 {
                                    dispatchData?.comments && (
                                       <tr>
                                          <td className='pe-1'>Motivo:</td>

                                          <td className='text-end fw-bolder'>{dispatchData?.comments}</td>
                                       </tr>
                                    )
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Productos del despacho</h4>
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

                                       <th className='text-center' style={{width: 150}}>Cantidad</th>
                                    </tr>
                                 </thead>
                                 
                                 <tbody>
                                    {
                                       dispatchData?.products?.map(p => (
                                          <tr key={'reception-product-' + p.id}>
                                             <td>{p.product.product.name}</td>

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
                        to='/dispatches'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     {
                        dispatchData?.status?.name === 'pendiente' && (
                           <button
                              className='btn btn-danger w-100 mt-75 waves-effect waves-float waves-light'
                              onClick={handleDeleteDispatch}
                              disabled={loadingDelete || loadingDetail}
                           >Cancelar</button>
                        )
                     }

                     {
                        dispatchData?.status?.name === 'embarcado' && (
                           <button
                              className='btn btn-success w-100 mt-75 waves-effect waves-float waves-light'
                              onClick={handleDeliverDispatch}
                              disabled={loadingDelete || loadingDetail}
                           >Entregar</button>
                        )
                     }

                     {
                        dispatchData?.status?.name !== 'entregado' && (
                           <button
                              className='btn btn-danger w-100 mt-75 waves-effect waves-float waves-light'
                              onClick={handleDenyDispatch}
                              disabled={loadingDelete || loadingDetail}
                           >Rechazar</button>
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



export default DispatchesDetail;