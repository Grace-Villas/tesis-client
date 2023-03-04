import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setLoginError, startRecovery } from '../../actions/auth';



// Components
import AuthContainer from '../../components/auth/AuthContainer';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



// Custom hooks
import { useInstalled } from '../../hooks/useInstalled';



const PasswordRecovery = () => {

   const dispatch = useDispatch();

   useInstalled();

   const { emailError, loadingAuth } = useSelector(state => state.auth);

   const [email, setEmail] = useState('');

   useEffect(() => {
      return () => {
         setEmail('');

         dispatch(setLoginError('email', null));
      }
   }, [dispatch]);

   const handleRecovery = (e) => {
      e.preventDefault();

      dispatch(startRecovery(email));
   }

   return (
      <>
         <AuthContainer>
            <h3 className='card-title mb-1 text-center'>¡Bienvenido!</h3>

            <p className='card-text mb-2 text-center fs-4'>Recuperar contraseña</p>

            <form className='auth-login-form mt-2' onSubmit={handleRecovery}>
               <Input
                  value={email}
                  setValue={setEmail}
                  title='Correo'
                  containerClass='mb-1'
                  error={emailError}
                  placeholder='john@example.com'
                  autoFocus
                  tabIndex={1}
               />

               <button
                  type='submit'
                  className='btn btn-primary w-100 waves-effect waves-float waves-light'
                  tabIndex={2}
               >Recuperar contraseña</button>
            </form>

            <p className='text-center mt-2'>
               <span>¿Deseas ingresar? </span>

               <Link to='/auth/login'>
                  <span>Inicia sesión</span>
               </Link>
            </p>
         </AuthContainer>

         <LoadingResponse state={loadingAuth} />
      </>
   );
}



export default PasswordRecovery;