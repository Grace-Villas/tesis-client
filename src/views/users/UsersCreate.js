import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';



// Actions
import { setUsersError, startCreateUser } from '../../actions/users';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import PasswordInput from '../../components/form/PasswordInput';



const UsersCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { firstNameError, lastNameError, emailError, passwordError, loadingCreate } = useSelector(state => state.users);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/users',
            text: 'Usuarios'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setFirstName('');
         setLastName('');
         setEmail('');
         setPassword('');
         
         dispatch(setUsersError('firstName', null));
         dispatch(setUsersError('lastName', null));
         dispatch(setUsersError('email', null));
         dispatch(setUsersError('password', null));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Errors and valids
   const handleInvalidFirstName = (firstName) => {
      if (firstName.trim().length === 0) {
         return 'El nombre es obligatorio';
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(firstName)) {
         return 'El nombre debe contener solo letras'
      } else {
         return null;
      }
   }
   
   const handleInvalidLastName = (lastName) => {
      if (lastName.trim().length === 0) {
         return 'El apellido es obligatorio';
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(lastName)) {
         return 'El apellido debe contener solo letras'
      } else {
         return null;
      }
   }

   const handleInvalidEmail = (email) => {
      if (email.trim().length === 0) {
         return 'El correo es obligatorio';
      } else if (!isEmail(email)) {
         return 'El correo debe tener un formato válido'
      } else {
         return null;
      }
   }

   const handleInvalidPassword = (password) => {
      if (password.length === 0) {
         return 'La contraseña es obligatoria';
      } else if (password.length < 8) {
         return 'La contraseña debe tener al menos 8 caracteres'
      } else {
         return null;
      }
   }

   // Handlers
   const handleFirstName = (value) => {
      const firstNameE = handleInvalidFirstName(value);
      dispatch(setUsersError('firstName', firstNameE));

      setFirstName(value);
   }

   const handleLastName = (value) => {
      const lastNameE = handleInvalidLastName(value);
      dispatch(setUsersError('lastName', lastNameE));

      setLastName(value);
   }

   const handleEmail = (value) => {
      const emailE = handleInvalidEmail(value);
      dispatch(setUsersError('email', emailE));

      setEmail(value);
   }

   const handlePassword = (value) => {
      if (/\s/g.test(value)) return;

      const passwordE = handleInvalidPassword(value);
      dispatch(setUsersError('password', passwordE));

      setPassword(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const firstNameE = handleInvalidFirstName(firstName);
      dispatch(setUsersError('firstName', firstNameE));

      const lastNameE = handleInvalidLastName(lastName);
      dispatch(setUsersError('lastName', lastNameE));

      const emailE = handleInvalidEmail(email);
      dispatch(setUsersError('email', emailE));

      const passwordE = handleInvalidPassword(password);
      dispatch(setUsersError('password', passwordE));

      if (!firstNameE && !lastNameE && !emailE && !passwordE) {
         dispatch(startCreateUser({firstName, lastName, email, password}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
         
      dispatch(setUsersError('firstName', null));
      dispatch(setUsersError('lastName', null));
      dispatch(setUsersError('email', null));
      dispatch(setUsersError('password', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <form
                  className='card invoice-preview-card mb-2'
                  onSubmit={handleSubmit}
               >
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Nuevo usuario</h4>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={firstName}
                           setValue={handleFirstName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del usuario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={firstNameError}
                        />

                        <Input
                           value={lastName}
                           setValue={handleLastName}
                           title={'Apellido'}
                           placeholder='Ingrese el apellido del usuario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={lastNameError}
                        />

                        <Input
                           value={email}
                           setValue={handleEmail}
                           title={'Correo'}
                           placeholder='Ingrese el correo del usuario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={emailError}
                        />

                        <PasswordInput
                           value={password}
                           setValue={handlePassword}
                           title={'Contraseña'}
                           placeholder='Ingrese la contraseña del usuario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={passwordError}
                        />
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                           <button
                              type='reset'
                              className='btn btn-outline-secondary waves-effect'
                              onClick={handleDiscard}
                           >Descartar</button>

                           <button
                              type='submit'
                              className='btn btn-primary waves-effect waves-float waves-light'
                           >Guardar</button>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/users'
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



export default UsersCreate;