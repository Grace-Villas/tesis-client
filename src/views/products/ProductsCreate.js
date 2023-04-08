import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setProductsError, startCreateProduct } from '../../actions/products';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



// Helpers
import { handleInvalidName, handleInvalidQuantity } from '../../helpers/validations';



const StatesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { nameError, qtyPerPalletError, loadingCreate } = useSelector(state => state.products);

   const [name, setName] = useState('');
   const [qtyPerPallet, setQtyPerPallet] = useState('');

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/products',
            text: 'Productos'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setQtyPerPallet('');
         
         dispatch(setProductsError('name', null));
         dispatch(setProductsError('qtyPerPallet', null));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
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

      const nameE = handleInvalidName(name);
      dispatch(setProductsError('name', nameE));

      const qtyE = handleInvalidQuantity(qtyPerPallet);
      dispatch(setProductsError('qtyPerPallet', qtyE));

      if (!nameE && !qtyE) {
         dispatch(startCreateProduct({name, qtyPerPallet}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      setQtyPerPallet('');
      
      dispatch(setProductsError('name', null));
      dispatch(setProductsError('qtyPerPallet', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Crear producto'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del producto'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Input
                           value={qtyPerPallet}
                           setValue={handleQuantity}
                           title={'Cantidad de unidades por paleta'}
                           placeholder='Ingrese la cantidad de unidades'
                           containerClass='col-md-6 col-12 mb-1'
                           error={qtyPerPalletError}
                        />
                     </div>
                  </div>
               </Form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/products'
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



export default StatesCreate;