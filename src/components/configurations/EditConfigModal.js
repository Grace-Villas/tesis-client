import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



// Actions
import { startUpdateConfig } from '../../actions/configurations';



// Components
import Modal from '../ui/Modal';
import Input from '../form/Input';



const EditConfigModal = ({isOpen, handleOpen, configId, currentValue, configTitle, handleInvalid}) => {

   const dispatch = useDispatch();

   const [value, setValue] = useState('');
   const [error, setError] = useState(null);

   useEffect(() => {
      setValue(currentValue);
   }, [currentValue]);
   
   const handleClose = () => {
      handleOpen(false);
      resetHandler();
   }

   const inputHandler = (value) => {
      const currentError = handleInvalid(value);
      setError(currentError);

      setValue(value);
   }

   const resetHandler = () => {
      setValue(currentValue);
      setError(null);
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const currentError = handleInvalid(value);
      setError(currentError);

      if (!currentError) {
         dispatch(startUpdateConfig(configId, value));
      }
   }

   return (
      <Modal
         state={isOpen}
         close={handleClose}
      >
         <div className='roles-modal'>
            <form className='modal-content' onSubmit={handleSubmit}>
               <div className='modal-header'>
                  <h5 className='modal-title'>Editar configuración de empresa</h5>
                  
                  <button
                     type='button'
                     className='btn-close'
                     onClick={handleClose}
                  />
               </div>

               <div className='modal-body'>
                  <Input
                     value={value}
                     setValue={inputHandler}
                     title={configTitle}
                     error={error}
                  />
               </div>

               <div className='modal-footer'>
                  <button
                     type='button'
                     className='btn btn-outline-secondary waves-effect me-auto'
                     onClick={resetHandler}
                  >Descartar</button>

                  <button
                     type='submit'
                     className='btn btn-primary waves-effect waves-float waves-light'
                  >Guardar</button>
               </div>
            </form>
         </div>
      </Modal>
   );
}



export default EditConfigModal;