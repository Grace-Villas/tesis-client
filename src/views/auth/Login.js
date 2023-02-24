import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startLogin } from '../../actions/auth';



// Components
import Icon from '../../components/ui/Icon';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



// Custom hooks
import { useInstalled } from '../../hooks/useInstalled';



const Login = () => {

   const dispatch = useDispatch();

   useInstalled();

   const { loadingLogin, emailError, passwordError } = useSelector(state => state.auth);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [remember, setRemember] = useState(false);

   const [showPass, setShowPass] = useState(false);

   const handleLogin = (e) => {
      e.preventDefault();

      dispatch(startLogin(email, password, remember));
   }

   return (
      <>
         <div className='blank-page'>
            <div className='app-content content'>
               <div className='content-wrapper'>
                  <div className='content-body'>
                     <div className='row py-2' style={{minHeight: '100vh'}}>
                        <div className='col-lg-4 px-2 px-lg-0 mx-lg-auto d-flex flex-column'>
                           <div className='card mb-0 flex-grow-1'>
                              <div className='card-body'>
                                 <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                                    <h1 className='mb-0 fw-bolder text-primary' style={{fontSize: 60}}>LC</h1>

                                    <h2 className='text-primary mb-0' style={{fontSize: 30}}>Logistics Chain</h2>
                                 </div>

                                 <h3 className='card-title mb-1 text-center'>¡Bienvenido!</h3>

                                 <p className='card-text mb-2 text-center fs-4'>Inicio de sesión</p>

                                 <form className='auth-login-form mt-2' onSubmit={handleLogin}>
                                    <div className='mb-1'>
                                       <label className='form-label fs-6'>Correo</label>

                                       <input
                                          type='text'
                                          className={`form-control ${emailError && 'is-invalid'}`}
                                          placeholder='john@example.com'
                                          tabIndex={1}
                                          autoFocus
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                       />

                                       {
                                          emailError && (
                                             <div className='invalid-feedback'>{emailError}</div>
                                          )
                                       }
                                    </div>

                                    <div className='mb-1'>
                                       <div className='d-flex justify-content-between'>
                                          <label className='form-label fs-6'>Contraseña</label>

                                          <a href='auth-forgot-password-basic.html'>
                                             <small>¿Olvidó su contraseña?</small>
                                          </a>
                                       </div>

                                       <div className={`input-group input-group-merge form-password-toggle ${passwordError && 'is-invalid'}`}>
                                          <input
                                             type={!showPass ? 'password' : 'text'}
                                             className={`form-control form-control-merge ${passwordError && 'error'}`}
                                             tabIndex={2}
                                             placeholder='············'
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
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

                                 <p className="text-center mt-2">
                                    <span>¿Olvidó su contraseña?</span>

                                    <a href="auth-register-basic.html">
                                       <span> Recupérela aquí</span>
                                    </a>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingLogin} />
      </>
   );
}



export default Login;