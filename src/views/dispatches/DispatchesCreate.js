import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { removeProductFromDispatch, resetProducts, setDispatchesError, setProductsModalState, startCreateDispatch, updateProductFromDispatch } from '../../actions/dispatches';
import { setBreadcrumb } from '../../actions/ui';
import { setProductsList, startGetCompanyProductsList } from '../../actions/products';
import { setReceiversList, startGetReceiversList } from '../../actions/receivers';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Select from '../../components/form/Select';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import AddProductModal from '../../components/dispatches/AddProductModal';



// Helpers
import { handleInvalidQuantity, handleRequired } from '../../helpers/validations';



const DispatchesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const {
      receiverIdError, dateError,
      loadingCreate,
      productsModalState, products
   } = useSelector(state => state.dispatches);

   const { receiversList, loadingList: loadingReceiversList } = useSelector(state => state.receivers);

   const { productsList } = useSelector(state => state.products);

   const [date, setDate] = useState('');
   const [receiverId, setReceiverId] = useState('');

   const [productsError, setProductsError] = useState(null);

   useEffect(() => {
      dispatch(startGetCompanyProductsList());
      dispatch(startGetReceiversList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/dispatches',
            text: 'Despachos'
         },
         {
            text: 'Programar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (products) {
         setProductsError(null)
      }
   }, [products]);

   useEffect(() => {
      return () => {
         setReceiverId('');
         setDate('');
         setProductsError('');

         dispatch(setDispatchesError('receiverId', null));
         dispatch(setDispatchesError('date', null));

         dispatch(setReceiversList([]));
         dispatch(setProductsList([]));
         
         dispatch(setBreadcrumb([]));

         dispatch(resetProducts());
         setProductsError(null);
      }
   }, [dispatch]);

   // Handlers
   const handleReceiverId = (value) => {
      const error = handleRequired(value, 'El destinatario es obligatorio');
      dispatch(setDispatchesError('receiverId', error));

      setReceiverId(value);
   }
   
   const handleDate = (value) => {
      const error = handleRequired(value, 'La fecha de pago es obligatoria');
      dispatch(setDispatchesError('date', error));

      setDate(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      let productsE = false;
      if (products.length < 1) {
         productsE = true;
         setProductsError('Debe agregar al menos un producto');
      } else {
         setProductsError(null);
      }
      
      const receiverIdE = handleRequired(receiverId, 'El destinatario es obligatorio');
      dispatch(setDispatchesError('receiverId', receiverIdE));

      const dateE = handleRequired(date, 'La fecha de pago es obligatoria');
      dispatch(setDispatchesError('date', dateE));

      let productEIntern = false;
      products.forEach(p => {
         if (p.error) {
            productEIntern = true;
         }
      });
      
      if (!receiverIdE && !dateE && !productsE && !productEIntern) {
         const data = { receiverId, date, products }
         dispatch(startCreateDispatch(data, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setReceiverId('');
      setDate('');
      
      dispatch(setDispatchesError('receiverId', null));
      dispatch(setDispatchesError('date', null));

      dispatch(resetProducts());
      setProductsError(null);
   }

   const handleModalState = (state) => dispatch(setProductsModalState(state));

   const handleDeleteProduct = (productId) => dispatch(removeProductFromDispatch(productId));

   const handleUpdateProductQty = (productId, qty) => {
      const qtyE = handleInvalidQuantity(qty);
      dispatch(updateProductFromDispatch(productId, 'error', qtyE));

      if (!qtyE) {
         const product = productsList.find(p => p.id === productId);
         dispatch(updateProductFromDispatch(productId, 'error', Number(qty) > product.stock ? 'No posee stock suficiente' : null));
      }

      dispatch(updateProductFromDispatch(productId, 'qty', qty));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Programar despacho'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                     <Select
                           value={receiverId}
                           setValue={handleReceiverId}
                           title='Destinatario'
                           name='receiver'
                           placeholder='Seleccione un destinatario'
                           options={receiversList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={receiverIdError}
                           disabled={loadingReceiversList}
                        />

                        <Input
                           type='date'
                           value={date}
                           setValue={handleDate}
                           title='Fecha de entrega'
                           containerClass='col-md-6 col-12 mb-1'
                           error={dateError}
                           min={moment().add(5, 'days').format('YYYY-MM-DD')}
                        />

                        <div className='col-12 mb-1'>
                           <Button
                              text='Agregar producto'
                              icon='Plus'
                              className='ms-auto btn-sm'
                              color='success'
                              onClick={() => handleModalState(true)}
                           />
                        </div>
                     </div>
                  </div>

                  {
                     productsError && (
                        <span className='text-center text-danger'><small>{productsError}</small></span>
                     )
                  }

                  <div className='card-datatable table-responsive'>
                     <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                        <div className='table-responsive'>
                           <table className={`invoice-list-table table dataTable no-footer dtr-column ${productsError && 'border border-danger'}`}>
                              <thead>
                                 <tr role='row'>
                                    <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>

                                    <th rowSpan={1} colSpan={1} className='text-center'>Unidades</th>
                                    
                                    <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {
                                    products.map(p => (
                                       <tr key={'dispatch-product-' + p.productId}>
                                          <td className='text-center'>{p.name}</td>

                                          <td className='text-center'>
                                             <Input
                                                value={p.qty}
                                                setValue={(value) => handleUpdateProductQty(p.productId, value)}
                                                error={p.error}
                                             />
                                          </td>

                                          <td className='text-center'>
                                             <div className='d-flex justify-content-center gap-1'>
                                                <button
                                                   type='button'
                                                   className='btn btn-sm btn-relief-danger'
                                                   onClick={() => handleDeleteProduct(p.productId)}
                                                >
                                                   <Icon icon='Trash2' size={16} />
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    )) 
                                 }

                                 {
                                    (products.length === 0) && (
                                       <tr>
                                          <td colSpan={3}>
                                             <p className='mb-0 py-4 text-center fs-5'>Agregue un producto con el botón <b>"agregar producto"</b></p>
                                          </td>
                                       </tr>
                                    )
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </Form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/dispatches'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingCreate} />

         <AddProductModal
            isOpen={productsModalState}
            handleOpen={handleModalState}
         />
      </>
   );
}



export default DispatchesCreate;