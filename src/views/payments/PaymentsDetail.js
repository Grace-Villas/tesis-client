import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setPayment, setLoading, startGetPayment, startAprovePayment, startDenyPayment } from '../../actions/payments';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';



// Helpers
import { currencyFormat } from '../../helpers/format';



const PaymentsDetail = () => {

   const dispatch = useDispatch();

   const { id } = useParams();

   const { payment, loadingDetail, loadingDelete } = useSelector(state => state.payments);

   useEffect(() => {
      if (payment === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/payments',
            text: 'Pagos'
         },
         {
            text: moment(payment?.date).format('DD-MM-YYYY')
         }
      ]));
   }, [dispatch, payment]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetPayment(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setPayment(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleAprovePayment = () => dispatch(startAprovePayment(id));;

   const handleDenyPayment = () => dispatch(startDenyPayment(id));;

   if (!loadingDetail && !payment) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/payments'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del pago</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{payment?.id}</span></h4>
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
                                    <td className='pe-1'>Status:</td>

                                    <td className='text-end fw-bolder'>{payment?.status?.name?.toLocaleUpperCase()}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Fecha:</td>

                                    <td className='text-end fw-bolder'>{moment(payment?.date).format('DD-MM-YYYY')}</td>
                                 </tr>
                                 
                                 <tr>
                                    <td className='pe-1'>Monto:</td>

                                    <td className='text-end fw-bolder'>{currencyFormat(payment?.amount)}</td>
                                 </tr>
                                 
                                 {
                                    payment?.reference && (
                                       <tr>
                                          <td className='pe-1'>Referencia:</td>

                                          <td className='text-end fw-bolder'>{payment?.reference}</td>
                                       </tr>
                                    )
                                 }
                                 
                                 {
                                    payment?.issuingName && (
                                       <tr>
                                          <td className='pe-1'>Emisor:</td>

                                          <td className='text-end fw-bolder'>{payment?.issuingName}</td>
                                       </tr>
                                    )
                                 }
                                 
                                 {
                                    payment?.issuingEmail && (
                                       <tr>
                                          <td className='pe-1'>Correo:</td>

                                          <td className='text-end fw-bolder'>{payment?.issuingEmail}</td>
                                       </tr>
                                    )
                                 }
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Método de pago:</td>

                                    <td className='text-end fw-bolder'>{payment?.paymentMethod?.paymentType?.name}</td>
                                 </tr>

                                 {
                                    payment?.paymentMethod?.user && (
                                       <tr>
                                          <td className='pe-1'>Usuario:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.user}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.bankName && (
                                       <tr>
                                          <td className='pe-1'>Banco:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.bankName}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.accountNumber && (
                                       <tr>
                                          <td className='pe-1'>Cuenta:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.accountNumber}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.holderName && (
                                       <tr>
                                          <td className='pe-1'>Cuentahabiente:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.holderName}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.holderDni && (
                                       <tr>
                                          <td className='pe-1'>Identificación:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.holderDni}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.email && (
                                       <tr>
                                          <td className='pe-1'>Correo:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.email}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    payment?.paymentMethod?.phone && (
                                       <tr>
                                          <td className='pe-1'>Teléfono:</td>

                                          <td className='text-end fw-bolder'>{payment?.paymentMethod?.phone}</td>
                                       </tr>
                                    )
                                 }
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

                                    <td className='text-end fw-bolder'>{payment?.company?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Teléfono:</td>

                                    <td className='text-end fw-bolder'>{payment?.company?.phone}</td>
                                 </tr>
                                 
                                 <tr>
                                    <td className='pe-1'>Correo:</td>

                                    <td className='text-end fw-bolder'>{payment?.company?.email}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 {
                                    payment?.comments && (
                                       <tr>
                                          <td className='pe-1'>Motivo:</td>

                                          <td className='text-end fw-bolder'>{payment?.comments}</td>
                                       </tr>
                                    )
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
                        to='/payments'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     {
                        payment?.status?.name === 'pendiente' && (
                           <>
                              <button
                                 className='btn btn-success w-100 mb-75 waves-effect waves-float waves-light'
                                 onClick={handleAprovePayment}
                                 disabled={loadingDelete || loadingDetail}
                              >Aprobar</button>

                              <button
                                 className='btn btn-danger w-100 waves-effect waves-float waves-light'
                                 onClick={handleDenyPayment}
                                 disabled={loadingDelete || loadingDetail}
                              >Rechazar</button>
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



export default PaymentsDetail;