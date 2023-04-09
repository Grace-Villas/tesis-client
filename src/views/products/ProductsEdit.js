import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setLoading, setProduct, setProductsError, startGetProduct, startUpdateProduct } from '../../actions/products';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';



// Helpers
import { handleRequired, handleInvalidQuantity } from '../../helpers/validations';



const ProductsEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { nameError, qtyPerPalletError, loadingUpdate, loadingDetail, product } = useSelector(state => state.products);

   const [name, setName] = useState('');
   const [qtyPerPallet, setQtyPerPallet] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetProduct(id));
   }, [dispatch, id]);

   useEffect(() => {
      setName(product?.name || '');
      setQtyPerPallet(product?.qtyPerPallet ? `${product?.qtyPerPallet}` : '');
   }, [product?.name, product?.qtyPerPallet]);

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
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setQtyPerPallet('');
         
         dispatch(setProductsError('name', null));
         dispatch(setProductsError('qtyPerPallet', null));

         dispatch(setProduct(null));
         
         dispatch(setBreadcrumb([]));
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

      const qtyE = handleQuantity(qtyPerPallet);
      dispatch(setProductsError('qtyPerPallet', qtyE));

      if (!nameE && !qtyE) {
         dispatch(startUpdateProduct(product.id, {name, qtyPerPallet}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(product?.name);
      setQtyPerPallet(`${product?.qtyPerPallet}`)
      
      dispatch(setProductsError('name', null));
      dispatch(setProductsError('qtyPerPallet', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar producto'
                  id={product?.id}
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del estado'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Input
                           value={qtyPerPallet}
                           setValue={handleQuantity}
                           title={'Cantidad de unidades por paleta'}
                           placeholder='Ingrese la cantidad'
                           containerClass='col-md-6 col-12 mb-1'
                           error={qtyPerPalletError}
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
                        to='/products'
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



export default ProductsEdit;