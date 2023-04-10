import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startGetCompanyProductsList } from '../../actions/products';
import { addProductToDispatch } from '../../actions/dispatches';



// Components
import Modal from '../ui/Modal';
import Icon from '../ui/Icon';



const AddProductModal = ({isOpen, handleOpen}) => {

   const dispatch = useDispatch();

   const { productsList } = useSelector(state => state.products);

   const { products } = useSelector(state => state.dispatches);

   const [availableProducts, setAvailableProducts] = useState([]);

   useEffect(() => {
      dispatch(startGetCompanyProductsList());
   }, [dispatch]);

   useEffect(() => {
      const existingProducts = products.map(p => p.productId);
      
      setAvailableProducts(productsList.filter(p => !existingProducts.includes(p.id)));
   }, [products, productsList]);
   
   const handleClose = () => handleOpen(false);

   const handleAddProduct = (productId, qty, name) => dispatch(addProductToDispatch(productId, qty, name));

   return (
      <Modal
         state={isOpen}
         close={handleOpen}
         className='receptions-modal-container'
      >
         <div className='receptions-modal dispatches'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h5 className='modal-title'>Agregar productos</h5>
                  
                  <button
                     type='button'
                     className='btn-close'
                     onClick={handleClose}
                  />
               </div>

               <div className='modal-body px-0 pt-0 d-flex flex-column h-100 mh-100 overflow-hidden'>
                  <div className='receptions-modal-body'>
                     <table className='invoice-list-table table dataTable no-footer dtr-column mb-0'>
                        <thead className='table-dark'>
                           <tr role='row'>
                              <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Stock</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center'>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              availableProducts.map(p => (
                                 <tr key={'dispatch-add-product-' + p.id}>
                                    <td className='text-center'>{p.name}</td>

                                    <td className='text-center'>{p.stock}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <button
                                             type='button'
                                             className='btn btn-sm btn-relief-primary'
                                             onClick={() => handleAddProduct(p.id, '1', p.name)}
                                          >
                                             <Icon icon='Plus' size={16} />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              )) 
                           }

                           {
                              availableProducts.length === 0 && (
                                 <tr className='odd'>
                                    <td valign='top' colSpan='3' className='text-center py-5 fw-bolder h3'>No hay productos...</td>
                                 </tr>
                              )
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
}



export default AddProductModal;