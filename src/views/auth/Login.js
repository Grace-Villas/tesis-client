import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setLoginError, startLogin } from '../../actions/auth';
import AuthContainer from '../../components/auth/AuthContainer';



// Components
import Icon from '../../components/ui/Icon';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



// Custom hooks
import { useInstalled } from '../../hooks/useInstalled';



const Login = () => {

   const dispatch = useDispatch();

   useInstalled();

   const { loadingAuth, emailError, passwordError } = useSelector(state => state.auth);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [remember, setRemember] = useState(false);

   const [showPass, setShowPass] = useState(false);

   useEffect(() => {
      return () => {
         setEmail('');
         setPassword('');

         dispatch(setLoginError('email', null));
         dispatch(setLoginError('password', null));
      }
   }, [dispatch]);

   const handleLogin = (e) => {
      e.preventDefault();

      dispatch(startLogin(email, password, remember));
   }

   return (
      <>
         <AuthContainer>
            <h3 className='card-title mb-1 text-center'>¡Bienvenido!</h3>

            <p className='card-text mb-2 text-center fs-4'>Inicio de sesión</p>

            <form className='auth-login-form mt-2' onSubmit={handleLogin}>
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

               <div className='mb-1'>
                  <div className='d-flex justify-content-between'>
                     <label className='form-label fs-6'>Contraseña</label>

                     <Link to='/auth/password-recovery'>
                        <small>¿Olvidó su contraseña?</small>
                     </Link>
                  </div>

                  <div className={`input-group input-group-merge form-password-toggle ${passwordError && 'is-invalid'}`}>
                     <input
                        type={!showPass ? 'password' : 'text'}
                        className={`form-control form-control-merge ${passwordError && 'error'}`}
                        placeholder='············'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        tabIndex={2}
                     />

                     <span
                        className='input-group-text cursor-pointer'
                        onClick={() => setShowPass(!showPass)}
                     ><Icon icon={!showPass ? 'Eye' : 'EyeOff'} size={16} /></span>
                  </div>

                  {
                     passwordError && (
                        <div className='invalid-feedback'>{passwordError}</div>
                     )
                  }
               </div>

               <div className='mb-1'>
                  <div className='form-check'>
                     <input
                        type='checkbox'
                        className='form-check-input'
                        tabIndex={3}
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                        id='remember-me'
                     />

                     <label className='form-check-label' htmlFor='remember-me' style={{userSelect: 'none'}}>Recuérdame</label>
                  </div>
               </div>

               <button
                  type='submit'
                  className='btn btn-primary w-100 waves-effect waves-float waves-light'
                  tabIndex={4}
               >Iniciar sesión</button>
            </form>

            <p className='text-center mt-2'>
               <span>¿Olvidó su contraseña? </span>

               <Link to='/auth/password-recovery'>
                  <span>Recupérela aquí</span>
               </Link>
            </p>
         </AuthContainer>

         <LoadingResponse state={loadingAuth} />
      </>
   );
}



export default Login;