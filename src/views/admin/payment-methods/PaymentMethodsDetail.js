import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setPaymentMethod, setLoading, startDeletePaymentMethod, startGetPaymentMethod } from '../../../actions/payment-methods';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import PermissionNeeded from '../../../components/ui/PermissionNeeded';



const PaymentMethodsDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { paymentMethod, loadingDetail, loadingDelete } = useSelector(state => state.paymentMethods);

   useEffect(() => {
      if (paymentMethod === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/payment-methods',
            text: 'Métodos de pago'
         },
         {
            text: paymentMethod?.paymentType?.name
         }
      ]));
   }, [dispatch, paymentMethod]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetPaymentMethod(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setPaymentMethod(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeletePaymentMethod(id, { navigate }));

   if (!loadingDetail && !paymentMethod) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/payment-methods'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del método de pago</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{paymentMethod?.id}</span></h4>
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
                                    <td className='pe-1'>Tipo de pago:</td>

                                    <td className='text-end fw-bolder'>{paymentMethod?.paymentType.name}</td>
                                 </tr>

                                 {
                                    paymentMethod?.user && (
                                       <tr>
                                          <td className='pe-1'>Usuario:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.user}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.bankName && (
                                       <tr>
                                          <td className='pe-1'>Banco:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.bankName}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.accountNumber && (
                                       <tr>
                                          <td className='pe-1'>Cuenta:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.accountNumber}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.holderName && (
                                       <tr>
                                          <td className='pe-1'>Cuentahabiente:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.holderName}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.holderDni && (
                                       <tr>
                                          <td className='pe-1'>Identificación:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.holderDni}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.email && (
                                       <tr>
                                          <td className='pe-1'>Correo:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.email}</td>
                                       </tr>
                                    )
                                 }

                                 {
                                    paymentMethod?.phone && (
                                       <tr>
                                          <td className='pe-1'>Teléfono:</td>

                                          <td className='text-end fw-bolder'>{paymentMethod?.phone}</td>
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
                        to='/payment-methods'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <PermissionNeeded
                        section='payment-methods'
                        permission='edit'
                        onlyAdmin
                     >
                        <Link
                           to={`/payment-methods/edit/${id}`}
                           className='btn btn-info w-100 mt-75 waves-effect waves-float waves-light'
                        >Editar</Link>
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='payment-methods'
                        permission='delete'
                        onlyAdmin
                     >
                        <button
                           className='btn btn-danger w-100 mt-75 waves-effect waves-float waves-light'
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



export default PaymentMethodsDetail;