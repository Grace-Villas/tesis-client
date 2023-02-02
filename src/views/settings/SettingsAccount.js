import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';



// Actions
import { setSettingsError, startUpdateAccount } from '../../actions/settings';



// Components
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



const SettingsAccount = () => {

   const dispatch = useDispatch();

   const auth = useSelector(state => state.auth);

   const { nameError, emailError, loadingAccount } = useSelector(state => state.settings);

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      setName(auth.name);
      setEmail(auth.email);
   }, [auth]);

   useEffect(() => {
      return () => {
         setName(auth.name);
         setEmail(auth.email);
      }
   }, []);

   // Errors and valids
   const handleInvalidName = (name) => {
      if (name.trim().length === 0) {
         return 'El nombre es obligatorio';
      } else {
         return null;
      }
   }

   const handleValidName = () => {
      if (name !== auth.name && name.trim().length > 0) {
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
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setSettingsError('name', nameE));

      setName(value);
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
      const nameE = handleInvalidName(name);
      dispatch(setSettingsError('name', nameE));

      const emailE = handleInvalidEmail(email);
      dispatch(setSettingsError('email', emailE));

      if (!nameE && !emailE) {
         dispatch(startUpdateAccount(name, email));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(auth.name);
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
                        value={name}
                        setValue={handleName}
                        title='Nombre'
                        placeholder='Ingrese su nombre...'
                        containerClass='col-12 col-sm-6 mb-1'
                        error={nameError}
                        isValid={handleValidName()}
                     />

                     <Input
                        value={email}
                        setValue={handleEmail}
                        title='Correo'
                        placeholder='Ingrese su correo...'
                        containerClass='col-12 col-sm-6 mb-1'
                        error={emailError}
                        isValid={handleValidEmail()}
                     />

                     <div className='col-12'>
                        <button
                           type='submit'
                           disabled={name === auth.name && email === auth.email}
                           className='btn btn-primary mt-1 me-1 waves-effect waves-float waves-light'
                        >Guardar cambios</button>

                        <button
                           type='reset'
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