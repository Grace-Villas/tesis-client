import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setPaymentMethodsError, startCreatePaymentMethod } from '../../../actions/payment-methods';
import { setBreadcrumb } from '../../../actions/ui';
import { setPaymentTypesList, startGetPaymentTypesList } from '../../../actions/payment-types';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';



// Helpers
import { handleInvalidEmail, handleInvalidName, handleInvalidNumber, handleInvalidPhone, handleInvalidRut, handleRequired } from '../../../helpers/validations';
import RequiredField from '../../../components/payment-methods/RequiredField';
import { usePermission } from '../../../hooks/usePermission';
import InputPhone from '../../../components/form/InputPhone';



const PaymentMethodsCreate = () => {

   usePermission({section: 'payment-methods', permission: 'create', onlyAdmin: true});

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const {
      paymentTypeIdError, bankNameError, holderNameError, holderDniError, accountNumberError, emailError, phoneError, userError,
      loadingCreate
   } = useSelector(state => state.paymentMethods);

   const { paymentTypesList, loadingList: loadingPaymentTypesList } = useSelector(state => state.paymentTypes);
   
   const [paymentTypeId, setPaymentTypeId] = useState('');
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
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (paymentTypeId) {
         dispatch(setPaymentMethodsError('paymentTypeId', null));
         dispatch(setPaymentMethodsError('bankName', null));
         dispatch(setPaymentMethodsError('holderName', null));
         dispatch(setPaymentMethodsError('holderDni', null));
         dispatch(setPaymentMethodsError('accountNumber', null));
         dispatch(setPaymentMethodsError('email', null));
         dispatch(setPaymentMethodsError('phone', null));
         dispatch(setPaymentMethodsError('user', null));
      }
   }, [paymentTypeId, dispatch]);

   useEffect(() => {
      return () => {
         setPaymentTypeId('');
         setBankName('');
         setHolderName('');
         setHolderDni('');
         setAccountNumber('');
         setEmail('');
         setPhone('');
         setUser('');
         
         dispatch(setPaymentMethodsError('paymentTypeId', null));
         dispatch(setPaymentMethodsError('bankName', null));
         dispatch(setPaymentMethodsError('holderName', null));
         dispatch(setPaymentMethodsError('holderDni', null));
         dispatch(setPaymentMethodsError('accountNumber', null));
         dispatch(setPaymentMethodsError('email', null));
         dispatch(setPaymentMethodsError('phone', null));
         dispatch(setPaymentMethodsError('user', null));

         dispatch(setPaymentTypesList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handlePaymentTypeId = (value) => {
      const error = handleRequired(value, 'El tipo de pago es obligatorio');
      dispatch(setPaymentMethodsError('paymentTypeId', error));

      setPaymentTypeId(value);

      dispatch(setPaymentMethodsError('bankName', null));
      dispatch(setPaymentMethodsError('holderName', null));
      dispatch(setPaymentMethodsError('holderDni', null));
      dispatch(setPaymentMethodsError('accountNumber', null));
      dispatch(setPaymentMethodsError('email', null));
      dispatch(setPaymentMethodsError('phone', null));
      dispatch(setPaymentMethodsError('user', null));
   }

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

      const paymentTypeIdE = handleRequired(paymentTypeId, 'El tipo de pago es obligatorio');
      dispatch(setPaymentMethodsError('paymentTypeId', paymentTypeIdE));

      let bankNameE = null;
      let holderNameE = null;
      let holderDniE = null;
      let accountNumberE = null;
      let emailE = null;
      let phoneE = null;
      let userE = null;

      if (paymentTypeId !== '') {
         const type = paymentTypesList.find(p => p.id === Number(paymentTypeId));

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
      }
      
      if (!paymentTypeIdE && !bankNameE && !holderNameE && !holderDniE && !accountNumberE && !emailE && !phoneE && !userE) {
         const data = { paymentTypeId, bankName, holderName, holderDni, accountNumber, email, phone, user }
         dispatch(startCreatePaymentMethod(data, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setPaymentTypeId('');
      setBankName('');
      setHolderName('');
      setHolderDni('');
      setAccountNumber('');
      setEmail('');
      setPhone('');
      setUser('');
      
      dispatch(setPaymentMethodsError('paymentTypeId', null));
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
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Crear método de pago'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Select
                           value={paymentTypeId}
                           setValue={handlePaymentTypeId}
                           title='Tipo de pago'
                           name='state'
                           placeholder='Seleccione un tipo de pago'
                           options={paymentTypesList}
                           containerClass='col-md-12 col-12 mb-1'
                           error={paymentTypeIdError}
                           disabled={loadingPaymentTypesList}
                        />

                        <RequiredField
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
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
                           paymentTypeId={Number(paymentTypeId)}
                           fieldName='phone'
                        >
                           <InputPhone
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

         <LoadingResponse state={loadingCreate} />
      </>
   );
}



export default PaymentMethodsCreate;