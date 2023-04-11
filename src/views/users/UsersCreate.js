import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setUsersError, startCreateUser } from '../../actions/users';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import PasswordInput from '../../components/form/PasswordInput';
import Form from '../../components/form/Form';



// Helpers
import { handleInvalidEmail, handleInvalidName, handleInvalidPassword } from '../../helpers/validations';
import { usePermission } from '../../hooks/usePermission';



const UsersCreate = () => {

   usePermission({section: 'users', permission: 'create'});

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

   // Handlers
   const handleFirstName = (value) => {
      const firstNameE = handleInvalidName(value);
      dispatch(setUsersError('firstName', firstNameE));

      setFirstName(value);
   }

   const handleLastName = (value) => {
      const lastNameE = handleInvalidName(value, 'apellido');
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

      const firstNameE = handleInvalidName(firstName);
      dispatch(setUsersError('firstName', firstNameE));

      const lastNameE = handleInvalidName(lastName, 'apellido');
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
               <Form
                  title='Crear usuario'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
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
               </Form>
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