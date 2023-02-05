import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setSettingsError, startUpdatePassword } from '../../actions/settings';



// Components
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import SettingsPasswordInput from '../../components/settings/SettingsPasswordInput';



const SettingsSecurity = () => {

   const dispatch = useDispatch();

   const { oldPasswordError, newPasswordError, repeatNewPasswordError, loadingSecurity } = useSelector(state => state.settings);

   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [repeatNewPassword, setRepeatNewPassword] = useState('');

   useEffect(() => {
      return () => {
         setOldPassword('');
         setNewPassword('');
         setRepeatNewPassword('');
      }
   }, []);

   const handleOldPassword = (value) => {
      if (value.trim().length === 0) {
         dispatch(setSettingsError('oldPassword', 'La contraseña actual es obligatoria'));
      } else if (value.length < 8) {
         dispatch(setSettingsError('oldPassword', 'La contraseña actual debe contener 8 caracteres como mínimo'));
      } else {
         dispatch(setSettingsError('oldPassword', null));
      }

      setOldPassword(value);
   }

   const handleNewPassword = (value) => {
      if (value.trim().length === 0) {
         dispatch(setSettingsError('newPassword', 'La nueva contraseña es obligatoria'));
      } else if (value.length < 8) {
         dispatch(setSettingsError('newPassword', 'La nueva contraseña debe contener 8 caracteres como mínimo'));
      } else {
         dispatch(setSettingsError('newPassword', null));
      }

      setNewPassword(value);
   }

   const handleRepeatNewPassword = (value) => {
      if (value.trim().length === 0) {
         dispatch(setSettingsError('repeatNewPassword', 'Debe confirmar la nueva contraseña'));
      } else if (value.length < 8) {
         dispatch(setSettingsError('repeatNewPassword', 'La nueva contraseña debe contener 8 caracteres como mínimo'));
      } else if (value !== newPassword) {
         dispatch(setSettingsError('repeatNewPassword', 'Las contraseñas deben coincidir'));
      } else {
         dispatch(setSettingsError('repeatNewPassword', null));
      }

      setRepeatNewPassword(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      if (!oldPasswordError && !newPasswordError  && !repeatNewPasswordError) {
         dispatch(startUpdatePassword(oldPassword, newPassword));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setOldPassword('');
      setNewPassword('');
      setRepeatNewPassword('');
   }

   return (
      <>
         <div className="card">
            <div className="card-header border-bottom">
               <h4 className="card-title">Cambiar contraseña</h4>
            </div>

            <div className="card-body pt-1">
               <form className="validate-form" onSubmit={handleSubmit}>
                  <div className="row">
                     <SettingsPasswordInput
                        value={oldPassword}
                        setValue={handleOldPassword}
                        title='Contraseña actual'
                        placeholder='Ingrese su contraseña actual'
                        containerClass='col-12 col-sm-6 mb-1'
                        error={oldPasswordError}
                     />
                  </div>

                  <div className="row">
                     <SettingsPasswordInput
                        value={newPassword}
                        setValue={handleNewPassword}
                        title='Nueva contraseña'
                        placeholder='Ingrese su nueva contraseña'
                        containerClass='col-12 col-sm-6 mb-1'
                        error={newPasswordError}
                     />

                     <SettingsPasswordInput
                        value={repeatNewPassword}
                        setValue={handleRepeatNewPassword}
                        title='Repita su nueva contraseña'
                        placeholder='Confirme su nueva contraseña'
                        containerClass='col-12 col-sm-6 mb-1'
                        error={repeatNewPasswordError}
                     />

                     <div className="col-12">
                        <p className="fw-bolder">La contraseña debe contener:</p>

                        <ul className="ps-1 ms-25">
                           <li className="mb-50 success">Mínimo 8 caracteres de longitud - mientras más, mejor</li>
                        </ul>
                     </div>

                     <div className="col-12">
                        <button
                           type="submit"
                           className="btn btn-primary me-1 mt-1 waves-effect waves-float waves-light"
                        >Guardar cambios</button>

                        <button
                           type="reset"
                           className="btn btn-outline-secondary mt-1 waves-effect"
                           onClick={handleDiscard}
                        >Descartar</button>
                     </div>
                  </div>
               </form>
               {/*/ form */}
            </div>
         </div>

         <LoadingResponse state={loadingSecurity} />
      </>
   );
}



export default SettingsSecurity;