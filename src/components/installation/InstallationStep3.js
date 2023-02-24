import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setInstallationError, startInstallSystem } from '../../actions/installation';



// Components
import FormWizardCard from '../form-wizard/FormWizardCard';
import Input from '../form/Input';
import PasswordInput from '../form/PasswordInput';



// Helpers
import { handleInvalidEmail, handleInvalidName, handleInvalidPassword, handleInvalidRepeatPassword } from '../../helpers/validations';
import LoadingComponent from '../ui/spinners/LoadingComponent';



const InstallationStep3 = ({currentStep, headerProps, footerProps}) => {

   const dispatch = useDispatch();

   const {
      firstNameError, lastNameError, emailError, passwordError, repeatPasswordError,
      loadingCreate
   } = useSelector(state => state.installation);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [repeatPassword, setRepeatPassword] = useState('');

   const handleFirstName = (value) => {
      const error = handleInvalidName(value);
      dispatch(setInstallationError('firstName', error));

      setFirstName(value);
   }

   const handleLastName = (value) => {
      const error = handleInvalidName(value, 'apellido');
      dispatch(setInstallationError('lastName', error));

      setLastName(value);
   }

   const handleEmail = (value) => {
      const error = handleInvalidEmail(value);
      dispatch(setInstallationError('email', error));

      setEmail(value);
   }

   const handlePassword = (value) => {
      if (/\s/g.test(value)) return;

      const error = handleInvalidPassword(value);
      dispatch(setInstallationError('password', error));

      setPassword(value);
   }

   const handleRepeatPassword = (value) => {
      if (/\s/g.test(value)) return;

      const error = handleInvalidRepeatPassword(value, password);
      dispatch(setInstallationError('repeatPassword', error));

      setRepeatPassword(value);
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const firstNameE = handleInvalidName(firstName);
      dispatch(setInstallationError('firstName', firstNameE));

      const lastNameE = handleInvalidName(lastName, 'apellido');
      dispatch(setInstallationError('lastName', lastNameE));

      const emailE = handleInvalidEmail(email);
      dispatch(setInstallationError('email', emailE));

      const passwordE = handleInvalidPassword(password);
      dispatch(setInstallationError('password', passwordE));

      const rPasswordE = handleInvalidRepeatPassword(repeatPassword, password);
      dispatch(setInstallationError('repeatPassword', rPasswordE));

      if (!firstNameE && !lastNameE && !emailE && !passwordE && !rPasswordE) {
         dispatch(startInstallSystem(firstName, lastName, email, password));
      }
   }

   return (
      <>
         <FormWizardCard
            step={3}
            currentStep={currentStep}
            headerProps={headerProps}
            footerProps={{...footerProps, nextButtonHandler: handleSubmit}}
         >
            <form
               className='row'
               onSubmit={handleSubmit}
            >
               <Input
                  value={firstName}
                  setValue={handleFirstName}
                  title={'Nombre'}
                  placeholder='Ingrese su nombre'
                  containerClass='col-md-4 col-12 mb-1'
                  error={firstNameError}
               />

               <Input
                  value={lastName}
                  setValue={handleLastName}
                  title={'Apellido'}
                  placeholder='Ingrese su apellido'
                  containerClass='col-md-4 col-12 mb-1'
                  error={lastNameError}
               />

               <Input
                  value={email}
                  setValue={handleEmail}
                  title={'Correo'}
                  placeholder='Ingrese su correo'
                  containerClass='col-md-4 col-12 mb-1'
                  error={emailError}
               />

               <PasswordInput
                  value={password}
                  setValue={handlePassword}
                  title={'Contraseña'}
                  placeholder='Ingrese su contraseña'
                  containerClass='col-md-6 col-12 mb-1'
                  error={passwordError}
               />

               <PasswordInput
                  value={repeatPassword}
                  setValue={handleRepeatPassword}
                  title={'Repita su contraseña'}
                  placeholder='Ingrese su contraseña nuevamente'
                  containerClass='col-md-6 col-12 mb-1'
                  error={repeatPasswordError}
               />
            </form>

            
         </FormWizardCard>

         <LoadingComponent state={loadingCreate} />
      </>
   );
}



export default InstallationStep3;