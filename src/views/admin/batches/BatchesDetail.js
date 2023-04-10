import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setBatch, setLoading, startDeleteBatch, startGetBatch, startTransitBatch } from '../../../actions/batches';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import Icon from '../../../components/ui/Icon';



const BatchesDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { batch, loadingDetail, loadingDelete } = useSelector(state => state.batches);

   useEffect(() => {
      if (batch === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/batches',
            text: 'Lotes'
         },
         {
            text: moment(batch?.date).format('DD-MM-YYYY')
         }
      ]));
   }, [dispatch, batch]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetBatch(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setBatch(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleTransitBatch = () => dispatch(startTransitBatch(id));

   const handleDeleteBatch = () => dispatch(startDeleteBatch(id, { navigate }));

   if (!loadingDetail && !batch) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/batches'
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
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{batch?.id}</span></h4>
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

                                    <td className='text-end fw-bolder'>{batch?.status?.name?.toLocaleUpperCase()}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Fecha:</td>

                                    <td className='text-end fw-bolder'>{moment(batch?.date).format('DD-MM-YYYY')}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Encargado:</td>

                                    <td className='text-end fw-bolder'>{batch?.carrier?.fullName}</td>
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
                        <h4 className='mb-0 fw-bolder'>Despachos del lote</h4>
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
                                       <th className='text-center'>Destinatario</th>

                                       <th className='text-center'>Ciudad</th>

                                       <th className='text-center'>Estado</th>

                                       <th className='text-center' style={{width: 150}}>Acciones</th>
                                    </tr>
                                 </thead>
                                 
                                 <tbody>
                                    {
                                       batch?.dispatches?.map(row => (
                                          <tr key={'batch-dispatch-' + row.id}>
                                             <td className='text-center'>{row.receiver.name}</td>

                                             <td className='text-center'>{row.receiver.city.name}</td>

                                             <td className='text-center'>{row.receiver.city.state.name}</td>

                                             <td className='text-center'>
                                                <div className='d-flex justify-content-center gap-1'>
                                                   <Link to={`/dispatches/${row.id}`} className='btn btn-sm btn-relief-primary'>
                                                      <Icon icon='Info' size={16} />
                                                   </Link>
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
               </div>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/batches'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     {
                        batch?.status?.name === 'pendiente' && (
                           <>
                              <button
                                 className='btn btn-danger w-100 mt-75 waves-effect waves-float waves-light'
                                 onClick={handleDeleteBatch}
                                 disabled={loadingDelete || loadingDetail}
                              >Eliminar</button>

                              <button
                                 className='btn btn-primary w-100 mt-75 waves-effect waves-float waves-light'
                                 onClick={handleTransitBatch}
                                 disabled={loadingDelete || loadingDetail}
                              >En tránsito</button>
                           </>
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



export default BatchesDetail;