import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { setPaymentsError, startCreatePayment } from '../../actions/payments';
import { setBreadcrumb } from '../../actions/ui';
import { setPaymentMethodsList, startGetPaymentMethodsList } from '../../actions/payment-methods';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Select from '../../components/form/Select';



// Helpers
import { handleInvalidEmail, handleInvalidNumber, handleRequired, handleInvalidCurrency } from '../../helpers/validations';



const PaymentMethodsCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const {
      paymentMethodIdError, amountError, dateError, referenceError, issuingNameError, issuingEmailError,
      loadingCreate
   } = useSelector(state => state.payments);

   const { paymentMethodsList, loadingList: loadingPaymentMethodsList } = useSelector(state => state.paymentMethods);

   const [paymentMethodId, setPaymentMethodId] = useState('');
   const [amount, setAmount] = useState('');
   const [date, setDate] = useState('');
   const [reference, setReference] = useState('');
   const [issuingName, setIssuingName] = useState('');
   const [issuingEmail, setIssuingEmail] = useState('');

   useEffect(() => {
      dispatch(startGetPaymentMethodsList());
   }, [dispatch]);

   useEffect(() => {
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
            text: 'Reportar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (paymentMethodId) {
         dispatch(setPaymentsError('paymentMethodId', null));
         dispatch(setPaymentsError('amount', null));
         dispatch(setPaymentsError('date', null));
         dispatch(setPaymentsError('reference', null));
         dispatch(setPaymentsError('issuingName', null));
         dispatch(setPaymentsError('issuingEmail', null));
      }
   }, [paymentMethodId, dispatch]);

   useEffect(() => {
      return () => {
         setPaymentMethodId('');
         setAmount('');
         setDate('');
         setReference('');
         setIssuingName('');
         setIssuingEmail('');

         dispatch(setPaymentsError('paymentMethodId', null));
         dispatch(setPaymentsError('amount', null));
         dispatch(setPaymentsError('date', null));
         dispatch(setPaymentsError('reference', null));
         dispatch(setPaymentsError('issuingName', null));
         dispatch(setPaymentsError('issuingEmail', null));

         dispatch(setPaymentMethodsList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handlePaymentMethodId = (value) => {
      const error = handleRequired(value, 'El método de pago es obligatorio');
      dispatch(setPaymentsError('paymentMethodId', error));

      setPaymentMethodId(value);

      dispatch(setPaymentsError('amount', null));
      dispatch(setPaymentsError('date', null));
      dispatch(setPaymentsError('reference', null));
      dispatch(setPaymentsError('issuingName', null));
      dispatch(setPaymentsError('issuingEmail', null));
   }
   
   const handleAmount = (value) => {
      const error = handleInvalidCurrency(value, 'monto');
      dispatch(setPaymentsError('amount', error));

      setAmount(value);
   }
   
   const handleDate = (value) => {
      const error = handleRequired(value, 'La fecha de pago es obligatoria');
      dispatch(setPaymentsError('date', error));

      setDate(value);
   }
   
   const handleReference = (value) => {
      const error = handleInvalidNumber(value, 'número de referencia');
      dispatch(setPaymentsError('reference', error));

      setReference(value);
   }
   
   const handleIssuingName = (value) => {
      const error = handleRequired(value, 'El nombre del remitente es obligatorio');
      dispatch(setPaymentsError('issuingName', error));

      setIssuingName(value);
   }
   
   const handleIssuingEmail = (value) => {
      const error = handleInvalidEmail(value);
      dispatch(setPaymentsError('issuingEmail', error));

      setIssuingEmail(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const paymentMethodIdE = handleRequired(paymentMethodId, 'El método de pago es obligatorio');
      dispatch(setPaymentsError('paymentMethodId', paymentMethodIdE));
      
      const amountE = handleInvalidCurrency(amount, 'monto');
      dispatch(setPaymentsError('amount', amountE));

      const dateE = handleRequired(date, 'La fecha de pago es obligatoria');
      dispatch(setPaymentsError('date', dateE));

      let referenceE = null;
      let issuingNameE = null;
      let issuingEmailE = null;

      if (paymentMethodId !== '') {
         const method = paymentMethodsList.find(p => p.id === Number(paymentMethodId));

         if (method.paymentType.name === 'Zelle') {
            issuingNameE = handleRequired(issuingName, 'El nombre del remitente es obligatorio');
            dispatch(setPaymentsError('issuingName', issuingNameE));
      
            issuingEmailE = handleInvalidEmail(issuingEmail);
            dispatch(setPaymentsError('issuingEmail', issuingEmailE));
         } else {
            referenceE = handleInvalidNumber(reference, 'número de referencia');
            dispatch(setPaymentsError('reference', referenceE));
         }
      }
      
      if (!paymentMethodIdE && !amountE && !dateE && !referenceE && !issuingNameE && !issuingEmailE) {
         const data = { paymentMethodId, amount, date, reference, issuingName, issuingEmail }
         dispatch(startCreatePayment(data, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setPaymentMethodId('');
      setAmount('');
      setDate('');
      setReference('');
      setIssuingName('');
      setIssuingEmail('');
      
      dispatch(setPaymentsError('paymentMethodId', null));
      dispatch(setPaymentsError('amount', null));
      dispatch(setPaymentsError('date', null));
      dispatch(setPaymentsError('reference', null));
      dispatch(setPaymentsError('issuingName', null));
      dispatch(setPaymentsError('issuingEmail', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Reportar pago'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Select
                           value={paymentMethodId}
                           setValue={handlePaymentMethodId}
                           title='Método de pago'
                           name='paymentMethod'
                           placeholder='Seleccione un método de pago'
                           options={paymentMethodsList}
                           containerClass='col-md-12 col-12 mb-1'
                           error={paymentMethodIdError}
                           disabled={loadingPaymentMethodsList}
                        />
                        
                        <Input
                           value={amount}
                           setValue={handleAmount}
                           title={'Monto de pago (en dólares)'}
                           placeholder='Ingrese el monto de pago'
                           containerClass='col-md-6 col-12 mb-1'
                           error={amountError}
                        />
                        
                        <Input
                           type='date'
                           value={date}
                           setValue={handleDate}
                           title={'Fecha del pago'}
                           placeholder='Ingrese el monto de pago'
                           containerClass='col-md-6 col-12 mb-1'
                           error={dateError}
                           max={moment().format('YYYY-MM-DD')}
                        />

                        {
                           paymentMethodId !== '' && paymentMethodsList.find(p => p.id === Number(paymentMethodId))?.paymentType?.name !== 'Zelle' && (
                              <Input
                                 value={reference}
                                 setValue={handleReference}
                                 title={'Número de referencia del pago'}
                                 placeholder='Ingrese el número de referencia del pago'
                                 containerClass='col-md-12 col-12 mb-1'
                                 error={referenceError}
                              />
                           )
                        }

                        {
                           paymentMethodId !== '' && paymentMethodsList.find(p => p.id === Number(paymentMethodId))?.paymentType?.name === 'Zelle' && (
                              <>
                                 <Input
                                    value={issuingName}
                                    setValue={handleIssuingName}
                                    title={'Nombre del emisor del pago'}
                                    placeholder='Ingrese el nombre del emisor del pago'
                                    containerClass='col-md-6 col-12 mb-1'
                                    error={issuingNameError}
                                 />

                                 <Input
                                    value={issuingEmail}
                                    setValue={handleIssuingEmail}
                                    title={'Correo del emisor del pago'}
                                    placeholder='Ingrese el correo del emisor del pago'
                                    containerClass='col-md-6 col-12 mb-1'
                                    error={issuingEmailError}
                                 />
                              </>
                           )
                        }
                     </div>
                  </div>
               </Form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/payments'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingCreate} />
      </>
   );
}



export default PaymentMethodsCreate;