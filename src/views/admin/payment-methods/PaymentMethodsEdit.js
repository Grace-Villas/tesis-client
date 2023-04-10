import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setLoading, setPaymentMethodsError, setPaymentMethod, startGetPaymentMethod, startUpdatePaymentMethod } from '../../../actions/payment-methods';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';



// Helpers
import { handleInvalidEmail, handleInvalidName, handleInvalidNumber, handleInvalidPhone, handleInvalidRut, handleRequired } from '../../../helpers/validations';
import RequiredField from '../../../components/payment-methods/RequiredField';
import { setPaymentTypesList, startGetPaymentTypesList } from '../../../actions/payment-types';



const PaymentMethodsEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const {
      bankNameError, holderNameError, holderDniError, accountNumberError, emailError, phoneError, userError,
      loadingUpdate, loadingDetail, paymentMethod
   } = useSelector(state => state.paymentMethods);

   const [bankName, setBankName] = useState('');
   const [holderName, setHolderName] = useState('');
   const [holderDni, setHolderDni] = useState('');
   const [accountNumber, setAccountNumber] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [user, setUser] = useState('');

   useEffect(() => {
      dispatch(startGetPaymentTypesList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetPaymentMethod(id));
   }, [dispatch, id]);

   useEffect(() => {
      setBankName(paymentMethod?.bankName || '');
      setHolderName(paymentMethod?.holderName || '');
      setHolderDni(paymentMethod?.holderDni || '');
      setAccountNumber(paymentMethod?.accountNumber || '');
      setEmail(paymentMethod?.email || '');
      setPhone(paymentMethod?.phone || '');
      setUser(paymentMethod?.user || '');
   }, [
      paymentMethod?.bankName, paymentMethod?.holderName, paymentMethod?.holderDni, paymentMethod?.accountNumber, paymentMethod?.email,
      paymentMethod?.phone, paymentMethod?.user
   ]);

   useEffect(() => {
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
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setBankName('');
         setHolderName('');
         setHolderDni('');
         setAccountNumber('');
         setEmail('');
         setPhone('');
         setUser('');
         
         dispatch(setPaymentMethodsError('name', null));
         dispatch(setPaymentMethodsError('stateId', null));

         dispatch(setPaymentMethod(null));
         dispatch(setPaymentTypesList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handleBankName = (value) => {
      const error = handleRequired(value, 'El nombre del banco es obligatorio');
      dispatch(setPaymentMethodsError('bankName', error));

      setBankName(value);
   }

   const handleHolderName = (value) => {
      const error = handleInvalidName(value, 'nombre del cuentahabiente');
      dispatch(setPaymentMethodsError('holderName', error));

      setHolderName(value);
   }

   const handleHolderDni = (value) => {
      const error = handleInvalidRut(value, 'número de identificación del cuentahabiente');
      dispatch(setPaymentMethodsError('holderDni', error));

      setHolderDni(value);
   }

   const handleAccountNumber = (value) => {
      const error = handleInvalidNumber(value);
      dispatch(setPaymentMethodsError('accountNumber', error));

      setAccountNumber(value);
   }

   const handleEmail = (value) => {
      const error = handleInvalidEmail(value);
      dispatch(setPaymentMethodsError('email', error));

      setEmail(value);
   }

   const handlePhone = (value) => {
      const error = handleInvalidPhone(value);
      dispatch(setPaymentMethodsError('phone', error));

      setPhone(value);
   }

   const handleUser = (value) => {
      const error = handleRequired(value, 'El usuario es obligatorio');
      dispatch(setPaymentMethodsError('user', error));

      setUser(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      let bankNameE = null;
      let holderNameE = null;
      let holderDniE = null;
      let accountNumberE = null;
      let emailE = null;
      let phoneE = null;
      let userE = null;

      const type = paymentMethod?.paymentType;

      if (type.hasBankName) {
         bankNameE = handleRequired(bankName, 'El nombre del banco es obligatorio');
         dispatch(setPaymentMethodsError('bankName', bankNameE));
      }

      if (type.hasHolderName) {
         holderNameE = handleInvalidName(holderName, 'nombre del cuentahabiente');
         dispatch(setPaymentMethodsError('holderName', holderNameE));
      }

      if (type.hasHolderDni) {
         holderDniE = handleInvalidRut(holderDni, 'número de identificación del cuentahabiente');
         dispatch(setPaymentMethodsError('holderDni', holderDniE));
      }

      if (type.hasAccountNumber) {
         accountNumberE = handleInvalidNumber(accountNumber);
         dispatch(setPaymentMethodsError('accountNumber', accountNumberE));
      }

      if (type.hasEmail) {
         emailE = handleInvalidEmail(email);
         dispatch(setPaymentMethodsError('email', emailE));
      }

      if (type.hasPhone) {
         phoneE = handleInvalidPhone(phone);
         dispatch(setPaymentMethodsError('phone', phoneE));
      }

      if (type.hasUser) {
         userE = handleRequired(user, 'El usuario es obligatorio');
         dispatch(setPaymentMethodsError('user', userE));
      }
      
      if (!bankNameE && !holderNameE && !holderDniE && !accountNumberE && !emailE && !phoneE && !userE) {
         const data = { bankName, holderName, holderDni, accountNumber, email, phone, user }
         dispatch(startUpdatePaymentMethod(paymentMethod.id, data));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setBankName(paymentMethod?.bankName || '');
      setHolderName(paymentMethod?.holderName || '');
      setHolderDni(paymentMethod?.holderDni || '');
      setAccountNumber(paymentMethod?.accountNumber || '');
      setEmail(paymentMethod?.email || '');
      setPhone(paymentMethod?.phone || '');
      setUser(paymentMethod?.user || '');
      
      dispatch(setPaymentMethodsError('bankName', null));
      dispatch(setPaymentMethodsError('holderName', null));
      dispatch(setPaymentMethodsError('holderDni', null));
      dispatch(setPaymentMethodsError('accountNumber', null));
      dispatch(setPaymentMethodsError('email', null));
      dispatch(setPaymentMethodsError('phone', null));
      dispatch(setPaymentMethodsError('user', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title={`Editar método de pago: ${paymentMethod?.paymentType?.name}`}
                  id={paymentMethod?.id}
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                     <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='accountNumber'
                        >
                           <Input
                              value={accountNumber}
                              setValue={handleAccountNumber}
                              title={'Número de cuenta'}
                              placeholder='Ingrese el número de cuenta'
                              containerClass='col-md-12 col-12 mb-1'
                              error={accountNumberError}
                           />
                        </RequiredField>

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='user'
                        >
                           <Input
                              value={user}
                              setValue={handleUser}
                              title={'Usuario'}
                              placeholder='Ingrese la identificación del cuentahabiente'
                              containerClass='col-md-6 col-12 mb-1'
                              error={userError}
                           />
                        </RequiredField>

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='bankName'
                        >
                           <Input
                              value={bankName}
                              setValue={handleBankName}
                              title={'Banco'}
                              placeholder='Ingrese el nombre del banco'
                              containerClass='col-md-6 col-12 mb-1'
                              error={bankNameError}
                           />
                        </RequiredField>

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='holderName'
                        >
                           <Input
                              value={holderName}
                              setValue={handleHolderName}
                              title={'Cuentahabiente'}
                              placeholder='Ingrese el nombre del cuentahabiente'
                              containerClass='col-md-6 col-12 mb-1'
                              error={holderNameError}
                           />
                        </RequiredField>

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='holderDni'
                        >
                           <Input
                              value={holderDni}
                              setValue={handleHolderDni}
                              title={'Identificación del cuentahabiente'}
                              placeholder='Ingrese la identificación del cuentahabiente'
                              containerClass='col-md-6 col-12 mb-1'
                              error={holderDniError}
                           />
                        </RequiredField>

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='email'
                        >
                           <Input
                              value={email}
                              setValue={handleEmail}
                              title={'Correo'}
                              placeholder='Ingrese el correo'
                              containerClass='col-md-6 col-12 mb-1'
                              error={emailError}
                           />
                        </RequiredField>
                        

                        <RequiredField
                           paymentTypeId={Number(paymentMethod?.paymentTypeId)}
                           fieldName='phone'
                        >
                           <Input
                              value={phone}
                              setValue={handlePhone}
                              title={'Teléfono'}
                              placeholder='Ingrese la identificación del cuentahabiente'
                              containerClass='col-md-6 col-12 mb-1'
                              error={phoneError}
                           />
                        </RequiredField>
                     </div>
                  </div>
               </Form>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/payment-methods'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingUpdate} />
      </>
   );
}



export default PaymentMethodsEdit;