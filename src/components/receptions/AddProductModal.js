import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startGetProductsList } from '../../actions/products';
import { addProductToReception } from '../../actions/receptions';



// Components
import Modal from '../ui/Modal';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import CreateProductModal from './CreateProductModal';



const AddProductModal = ({isOpen, handleOpen}) => {

   const dispatch = useDispatch();

   const { productsList } = useSelector(state => state.products);

   const { products } = useSelector(state => state.receptions);

   const [availableProducts, setAvailableProducts] = useState([]);

   const [createProductIsOpen, setCreateProductIsOpen] = useState(false);

   useEffect(() => {
      dispatch(startGetProductsList());
   }, [dispatch]);

   useEffect(() => {
      const existingProducts = products.map(p => p.productId);
      
      setAvailableProducts(productsList.filter(p => !existingProducts.includes(p.id)));
   }, [products, productsList]);
   
   const handleClose = () => handleOpen(false);

   const handleAddProduct = (productId, qty, name) => dispatch(addProductToReception(productId, qty, name));

   const handleCreateProductModal = (state) => setCreateProductIsOpen(state);

   return (
      <>
         <Modal
            state={isOpen}
            close={handleOpen}
            className='receptions-modal-container'
         >
            <div className='receptions-modal'>
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
                                 
                                 <th rowSpan={1} colSpan={1} className='text-center'>Acciones</th>
                              </tr>
                           </thead>

                           <tbody>
                              {
                                 availableProducts.map(p => (
                                    <tr key={'reception-add-product-' + p.id}>
                                       <td className='text-center'>{p.name}</td>

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
                                       <td valign='top' colSpan='2' className='text-center py-5 fw-bolder h3'>No hay productos...</td>
                                    </tr>
                                 )
                              }
                           </tbody>
                        </table>
                     </div>

                     <div className='d-flex pt-1'>
                        <Button
                           text='Crear producto'
                           icon='Plus'
                           className='ms-auto me-1 btn-sm'
                           color='success'
                           onClick={() => handleCreateProductModal(true)}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </Modal>

         <CreateProductModal
            isOpen={createProductIsOpen}
            handleOpen={handleCreateProductModal}
         />
      </>
   );
}



export default AddProductModal;