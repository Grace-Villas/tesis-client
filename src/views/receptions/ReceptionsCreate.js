import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { removeProductFromReception, resetProducts, setProductsModalState, setReceptionsError, startCreateReception, updateProductFromReception } from '../../actions/receptions';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Select from '../../components/form/Select';



// Helpers
import { handleInvalidQuantity, handleRequired } from '../../helpers/validations';
import { startGetClientsList } from '../../actions/clients';
import Button from '../../components/ui/Button';
import AddProductModal from '../../components/receptions/AddProductModal';
import Icon from '../../components/ui/Icon';
import { usePermission } from '../../hooks/usePermission';



const ReceptionsCreate = () => {

   usePermission({section: 'receptions', permission: 'list', onlyAdmin: true});

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { productsModalState, products, companyIdError, dateError, loadingCreate } = useSelector(state => state.receptions);

   const { clientsList, loadingList: loadingClientsList } = useSelector(state => state.clients);

   const [companyId, setCompanyId] = useState('');
   const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

   const [productsError, setProductsError] = useState(null);

   useEffect(() => {
      dispatch(startGetClientsList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/receptions',
            text: 'Recepciones'
         },
         {
            text: 'Crear'
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
         setCompanyId('');
         setDate(moment().format('YYYY-MM-DD'));
         
         dispatch(setReceptionsError('companyId', null));
         dispatch(setReceptionsError('date', null));
         
         dispatch(setBreadcrumb([]));

         dispatch(resetProducts());
         setProductsError(null);
      }
   }, [dispatch]);

   // Handlers
   const handleCompanyId = (value) => {
      const companyIdE = handleRequired(value, 'El cliente es obligatorio');
      dispatch(setReceptionsError('companyId', companyIdE));

      setCompanyId(value);
   }

   const handleDate = (value) => {
      const dateE = handleRequired(value, 'La fecha de recepción es obligatoria');
      dispatch(setReceptionsError('date', dateE));

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

      const companyIdE = handleRequired(companyId, 'El cliente es obligatorio');
      dispatch(setReceptionsError('companyId', companyIdE));

      const dateE = handleRequired(date, 'La fecha de recepción es obligatoria');
      dispatch(setReceptionsError('date', dateE));

      let productEIntern = false;
      products.forEach(p => {
         if (p.error) {
            productEIntern = true;
         }
      });

      if (!companyIdE && !dateE && !productsE && !productEIntern) {
         dispatch(startCreateReception({companyId, date, products}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setCompanyId('');
      setDate(moment().format('YYYY-MM-DD'));
      
      dispatch(setReceptionsError('companyId', null));
      dispatch(setReceptionsError('date', null));

      dispatch(resetProducts());
      setProductsError(null);
   }

   const handleModalState = (state) => dispatch(setProductsModalState(state));

   const handleDeleteProduct = (productId) => dispatch(removeProductFromReception(productId));

   const handleUpdateProductQty = (productId, qty) => {
      const qtyE = handleInvalidQuantity(qty);
      dispatch(updateProductFromReception(productId, 'error', qtyE));

      dispatch(updateProductFromReception(productId, 'qty', qty));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Crear recepción de productos'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Select
                           value={companyId}
                           setValue={handleCompanyId}
                           title='Cliente'
                           name='client'
                           placeholder='Seleccione un cliente'
                           options={clientsList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={companyIdError}
                           disabled={loadingClientsList}
                        />

                        <Input
                           type='date'
                           value={date}
                           setValue={handleDate}
                           title='Fecha de recepción'
                           containerClass='col-md-6 col-12 mb-1'
                           error={dateError}
                           max={moment().format('YYYY-MM-DD')}
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

                                    <th rowSpan={1} colSpan={1} className='text-center'>Cantidad de paletas</th>
                                    
                                    <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {
                                    products.map(p => (
                                       <tr key={'reception-product-' + p.productId}>
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
                        to='/receptions'
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



export default ReceptionsCreate;