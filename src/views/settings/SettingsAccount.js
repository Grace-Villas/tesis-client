import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';



// Actions
import { setSettingsError, startUpdateAccount } from '../../actions/settings';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



const SettingsAccount = () => {

   const dispatch = useDispatch();

   const auth = useSelector(state => state.auth);

   const { firstNameError, lastNameError, emailError, loadingAccount } = useSelector(state => state.settings);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      setFirstName(auth.firstName);
      setLastName(auth.lastName);
      setEmail(auth.email);
   }, [auth.firstName, auth.lastName, auth.email]);

   useEffect(() => {
      return () => {
         setFirstName(auth.firstName);
         setLastName(auth.lastName);
         setEmail(auth.email);
      }
   }, [auth.firstName, auth.lastName, auth.email]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/settings',
            text: 'Configuraciones'
         },
         {
            text: 'Cuenta'
         }
      ]));
   }, [dispatch]);

   // Errors and valids
   const handleInvalidFirstName = (firstName) => {
      if (firstName.trim().length === 0) {
         return 'El nombre es obligatorio';
      } else {
         return null;
      }
   }

   const handleInvalidLastName = (lastName) => {
      if (lastName.trim().length === 0) {
         return 'El apellido es obligatorio';
      } else {
         return null;
      }
   }

   const handleValidName = (value, current) => {
      if (value !== current && value.trim().length > 0) {
         return true;
      } else {
         return null;
      }
   }

   const handleInvalidEmail = (email) => {
      if (email.trim().length === 0) {
         return 'El correo es obligatorio';
      } else if (!isEmail(email)) {
         return 'El correo es inválido';
      } else {
         return null;
      }
   }

   const handleValidEmail = () => {
      if (email !== auth.email && email.trim().length > 0 && isEmail(email)) {
         return true;
      } else {
         return null;
      }
   }

   // Handlers
   const handleFirstName = (value) => {
      const firstNameE = handleInvalidFirstName(value);
      dispatch(setSettingsError('firstName', firstNameE));

      setFirstName(value);
   }

   const handleLastName = (value) => {
      const lastNameE = handleInvalidLastName(value);
      dispatch(setSettingsError('lastName', lastNameE));

      setLastName(value);
   }

   const handleEmail = (value) => {
      const emailE = handleInvalidEmail(value);
      dispatch(setSettingsError('email', emailE));

      setEmail(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      // Manejadores de error
      const firstNameE = handleInvalidFirstName(firstName);
      dispatch(setSettingsError('firstName', firstNameE));

      const lastNameE = handleInvalidLastName(lastName);
      dispatch(setSettingsError('lastName', lastNameE));

      const emailE = handleInvalidEmail(email);
      dispatch(setSettingsError('email', emailE));

      if (!firstNameE && !lastNameE && !emailE) {
         dispatch(startUpdateAccount(firstName, lastName, email));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setFirstName(auth.firstName);
      setLastName(auth.lastName);
      setEmail(auth.email);
   }
   
   return (
      <>
         <div className='card'>
            <div className='card-header border-bottom'>
               <h4 className='card-title'>Detalles de usuario</h4>
            </div>

            <div className='card-body py-2 my-25'>
               <form className='validate-form pt-50' onSubmit={handleSubmit}>
                  <div className='row'>
                     <Input
                        value={firstName}
                        setValue={handleFirstName}
                        title='Nombre'
                        placeholder='Ingrese su nombre...'
                        containerClass='col-12 col-sm-4 mb-1'
                        error={firstNameError}
                        isValid={handleValidName(firstName, auth.firstName)}
                     />

                     <Input
                        value={lastName}
                        setValue={handleLastName}
                        title='Apellido'
                        placeholder='Ingrese su apellido..'
                        containerClass='col-12 col-sm-4 mb-1'
                        error={lastNameError}
                        isValid={handleValidName(lastName, auth.lastName)}
                     />

                     <Input
                        value={email}
                        setValue={handleEmail}
                        title='Correo'
                        placeholder='Ingrese su correo...'
                        containerClass='col-12 col-sm-4 mb-1'
                        error={emailError}
                        isValid={handleValidEmail()}
                     />

                     <div className='col-12'>
                        <button
                           type='submit'
                           disabled={firstName === auth.firstName && lastName === auth.lastName && email === auth.email}
                           className='btn btn-primary mt-1 me-1 waves-effect waves-float waves-light'
                        >Guardar cambios</button>

                        <button
                           type='button'
                           className='btn btn-outline-secondary mt-1 waves-effect'
                           onClick={handleDiscard}
                        >Descartar</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>

         <LoadingResponse state={loadingAccount} />
      </>
   );
}



export default SettingsAccount;