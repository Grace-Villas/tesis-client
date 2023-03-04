import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';



// Actions
import { setLoginError, startResetPassword } from '../../actions/auth';



// Components
import AuthContainer from '../../components/auth/AuthContainer';
import PasswordInput from '../../components/form/PasswordInput';



// Custom hooks
import { useInstalled } from '../../hooks/useInstalled';



const PasswordReset = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { token } = useParams();

   useInstalled();

   const { passwordError, passwordRepeatError } = useSelector(state => state.auth);

   const [password, setPassword] = useState('');
   const [passwordRepeat, setPasswordRepeat] = useState('');

   useEffect(() => {
      return () => {
         setPassword('');
         setPasswordRepeat('');

         dispatch(setLoginError('password', null));
         dispatch(setLoginError('passwordRepeat', null));
      }
   }, [dispatch]);

   const handleReset = (e) => {
      e.preventDefault();

      dispatch(startResetPassword(token, { password, passwordRepeat }, navigate))
   }

   return (
      <>
         <AuthContainer>
            <h3 className='card-title mb-1 text-center'>¡Bienvenido!</h3>

            <p className='card-text mb-2 text-center fs-4'>Restaurar contraseña</p>

            <form className='auth-login-form mt-2' onSubmit={handleReset}>
               <PasswordInput
                  value={password}
                  setValue={setPassword}
                  title='Contraseña'
                  containerClass='mb-1'
                  error={passwordError}
                  placeholder='Ingrese su nueva contraseña'
                  autoFocus
                  tabIndex={1}
               />

               <PasswordInput
                  value={passwordRepeat}
                  setValue={setPasswordRepeat}
                  title='Repetir contraseña'
                  containerClass='mb-1'
                  error={passwordRepeatError}
                  placeholder='Repita su nueva contraseña'
                  tabIndex={2}
               />

               <button
                  type='submit'
                  className='btn btn-primary w-100 waves-effect waves-float waves-light'
                  tabIndex={3}
               >Cambiar contraseña</button>
            </form>

            <p className='text-center mt-2'>
               <span>¿Deseas ingresar? </span>

               <Link to='/auth/login'>
                  <span>Inicia sesión</span>
               </Link>
            </p>
         </AuthContainer>
      </>
   );
}



export default PasswordReset;