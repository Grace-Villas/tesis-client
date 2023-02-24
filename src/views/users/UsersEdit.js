import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setCountry, setLoading, } from '../../actions/countries';
import { setUsersError, startGetUser, startUpdateUser } from '../../actions/users';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Input from '../../components/form/Input';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Form from '../../components/form/Form';



// Helpers
import { handleInvalidEmail, handleInvalidName } from '../../helpers/validations';



const UsersEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { firstNameError, lastNameError, emailError, loadingUpdate, loadingDetail, user } = useSelector(state => state.users);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetUser(id));
   }, [dispatch, id]);

   useEffect(() => {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.email || '');
   }, [user?.firstName, user?.lastName, user?.email]);

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
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setFirstName('');
         setLastName('');
         setEmail('');
         
         dispatch(setUsersError('firstName', null));
         dispatch(setUsersError('lastName', null));
         dispatch(setUsersError('email', null));
         
         dispatch(setBreadcrumb([]));

         dispatch(setCountry(null));
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

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const firstNameE = handleInvalidName(firstName);
      dispatch(setUsersError('firstName', firstNameE));

      const lastNameE = handleInvalidName(lastName, 'apellido');
      dispatch(setUsersError('lastName', lastNameE));

      const emailE = handleInvalidEmail(email);
      dispatch(setUsersError('email', emailE));

      if (!firstNameE && !lastNameE && !emailE) {
         dispatch(startUpdateUser(user.id, {firstName, lastName, email}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
         
      dispatch(setUsersError('firstName', null));
      dispatch(setUsersError('lastName', null));
      dispatch(setUsersError('email', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar usuario'
                  id={user?.id}
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
                           containerClass='col-md-4 col-12 mb-1'
                           error={firstNameError}
                        />

                        <Input
                           value={lastName}
                           setValue={handleLastName}
                           title={'Apellido'}
                           placeholder='Ingrese el apellido del usuario'
                           containerClass='col-md-4 col-12 mb-1'
                           error={lastNameError}
                        />

                        <Input
                           value={email}
                           setValue={handleEmail}
                           title={'Correo'}
                           placeholder='Ingrese el correo del usuario'
                           containerClass='col-md-4 col-12 mb-1'
                           error={emailError}
                        />
                     </div>
                  </div>
               </Form>

               <LoadingComponent state={loadingDetail} isBlocking />
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

         <LoadingResponse state={loadingUpdate} />
      </>
   );
}



export default UsersEdit;