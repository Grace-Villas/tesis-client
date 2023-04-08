import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setProductsError, startCreateProductAux } from '../../actions/products';



// Components
import Input from '../form/Input';
import Modal from '../ui/Modal';
import { handleInvalidQuantity, handleRequired } from '../../helpers/validations';
import LoadingComponent from '../ui/spinners/LoadingComponent';



const CreateProductModal = ({isOpen, handleOpen}) => {

   const dispatch = useDispatch();

   const { nameError, qtyPerPalletError, loadingCreate } = useSelector(state => state.products);

   const [name, setName] = useState('');
   const [qtyPerPallet, setQtyPerPallet] = useState('');

   useEffect(() => {
      return () => {
         setName('');
         setQtyPerPallet('');
         
         dispatch(setProductsError('name', null));
         dispatch(setProductsError('qtyPerPallet', null));
      }
   }, [dispatch]);

   // Handlers
   const handleName = (value) => {
      const nameE = handleRequired(value, 'El nombre es obligatorio');
      dispatch(setProductsError('name', nameE));

      setName(value);
   }

   const handleQuantity = (value) => {
      const qtyE = handleInvalidQuantity(value);
      dispatch(setProductsError('qtyPerPallet', qtyE));

      setQtyPerPallet(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleRequired(name, 'El nombre es obligatorio');
      dispatch(setProductsError('name', nameE));

      const qtyE = handleInvalidQuantity(qtyPerPallet);
      dispatch(setProductsError('qtyPerPallet', qtyE));

      if (!nameE && !qtyE) {
         dispatch(startCreateProductAux({name, qtyPerPallet}, handleDiscard));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      setQtyPerPallet('');
      
      dispatch(setProductsError('name', null));
      dispatch(setProductsError('qtyPerPallet', null));
   }
   
   const handleClose = () => handleOpen(false);

   return (
      <Modal
         state={isOpen}
         close={handleClose}
         isAboveModal
      >
         <div className='roles-modal'>
            <form className='modal-content position-relative' onSubmit={handleSubmit}>
               <div className='modal-header'>
                  <h5 className='modal-title' id='myModalLabel160'>Asignar roles</h5>
                  
                  <button
                     type='button'
                     className='btn-close'
                     onClick={handleClose}
                  />
               </div>

               <div className='modal-body'>
                  <div className='row'>
                     <Input
                        value={name}
                        setValue={handleName}
                        title={'Nombre'}
                        placeholder='Ingrese el nombre del producto'
                        containerClass='col-12 mb-1'
                        error={nameError}
                     />

                     <Input
                        value={qtyPerPallet}
                        setValue={handleQuantity}
                        title={'Cantidad de unidades por paleta'}
                        placeholder='Ingrese la cantidad de unidades'
                        containerClass='col-12 mb-1'
                        error={qtyPerPalletError}
                     />
                  </div>
               </div>

               <div className='modal-footer'>
                  <button
                     type='button'
                     className='btn btn-outline-secondary waves-effect me-auto'
                     onClick={handleDiscard}
                  >Descartar</button>

                  <button
                     type='submit'
                     className='btn btn-primary waves-effect waves-float waves-light'
                  >Guardar</button>
               </div>

               <LoadingComponent isBlocking state={loadingCreate} />
            </form>
         </div>
      </Modal>
   );
}



export default CreateProductModal;