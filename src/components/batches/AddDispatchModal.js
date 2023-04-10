import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startGetDispatchesList } from '../../actions/dispatches';
import { startGetDispatchStatuses } from '../../actions/dispatch-statuses';
import { addDispatchToBatch } from '../../actions/batches';



// Components
import Modal from '../ui/Modal';
import Icon from '../ui/Icon';



const AddDispatchModal = ({isOpen, handleOpen, date}) => {

   const dispatch = useDispatch();

   const { dispatchesList } = useSelector(state => state.dispatches);
   
   const { dispatchStatusesList } = useSelector(state => state.dispatchStatuses);

   const { dispatches } = useSelector(state => state.batches);

   const [statusId, setStatusId] = useState('');

   const [availableDispatches, setAvailableDispatches] = useState([]);

   useEffect(() => {
      const status = dispatchStatusesList.find(d => d.text.toLocaleLowerCase() === 'pendiente');

      setStatusId(status?.value || '');
   }, [dispatchStatusesList]);

   useEffect(() => {
      dispatch(startGetDispatchStatuses());
      dispatch(startGetDispatchesList({date, statusId}));
   }, [dispatch, date, statusId]);

   useEffect(() => {
      const existingDispatches = dispatches.map(p => p.dispatchId);
      
      setAvailableDispatches(dispatchesList.filter(p => !existingDispatches.includes(p.id)));
   }, [dispatches, dispatchesList]);
   
   const handleClose = () => handleOpen(false);

   const handleAddDispatch = (dispatchId, clientName, cityName) => dispatch(addDispatchToBatch(dispatchId, clientName, cityName));

   return (
      <Modal
         state={isOpen}
         close={handleOpen}
         className='receptions-modal-container'
      >
         <div className='receptions-modal dispatches'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h5 className='modal-title'>Agregar despachos</h5>
                  
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
                              <th rowSpan={1} colSpan={1} className='text-center'>Cliente</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Ciudad</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Estado</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center'>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              availableDispatches.map(dis => (
                                 <tr key={'dispatch-add-product-' + dis.id}>
                                    <td className='text-center'>{dis.company.name}</td>

                                    <td className='text-center'>{dis.receiver.city.name}</td>

                                    <td className='text-center'>{dis.receiver.city.state.name}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <button
                                             type='button'
                                             className='btn btn-sm btn-relief-primary'
                                             onClick={() => handleAddDispatch(dis.id, dis.company.name, dis.receiver.city.name)}
                                          >
                                             <Icon icon='Plus' size={16} />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              )) 
                           }

                           {
                              availableDispatches.length === 0 && (
                                 <tr className='odd'>
                                    <td valign='top' colSpan='4' className='text-center py-5 fw-bolder h3'>No hay despachos...</td>
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



export default AddDispatchModal;