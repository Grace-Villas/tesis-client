import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';



// Actions
import { removeDispatchFromBatch, resetDispatches, setBatchesError, setDispatchesModalState, startCreateBatch } from '../../../actions/batches';
import { setBreadcrumb } from '../../../actions/ui';
import { setUsersList, startGetUsersList } from '../../../actions/users';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import AddDispatchModal from '../../../components/batches/AddDispatchModal';



// Helpers
import { handleRequired } from '../../../helpers/validations';



const BatchesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const {
      userIdError, dateError,
      loadingCreate,
      dispatchesModalState, dispatches
   } = useSelector(state => state.batches);

   const { usersList, loadingList: loadingUsersList } = useSelector(state => state.users);

   const [date, setDate] = useState('');
   const [userId, setUserId] = useState('');

   const [dispatchesError, setDispatchesError] = useState(null);

   useEffect(() => {
      dispatch(startGetUsersList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/batches',
            text: 'Lotes'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (dispatches) {
         setDispatchesError(null)
      }
   }, [dispatches]);

   useEffect(() => {
      return () => {
         setUserId('');
         setDate('');
         setDispatchesError('');

         dispatch(setBatchesError('userId', null));
         dispatch(setBatchesError('date', null));

         dispatch(setUsersList([]));
         
         dispatch(setBreadcrumb([]));

         dispatch(resetDispatches());
         setDispatchesError(null);
      }
   }, [dispatch]);

   // Handlers
   const handleUserId = (value) => {
      const error = handleRequired(value, 'El usuario encargado es obligatorio');
      dispatch(setBatchesError('userId', error));

      setUserId(value);
   }
   
   const handleDate = (value) => {
      const error = handleRequired(value, 'La fecha de entrega es obligatoria');
      dispatch(setBatchesError('date', error));

      setDate(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      let dispatchesE = false;
      if (dispatches.length < 1) {
         dispatchesE = true;
         setDispatchesError('Debe agregar al menos un despacho');
      } else {
         setDispatchesError(null);
      }
      
      const userIdE = handleRequired(userId, 'El usuario encargado es obligatorio');
      dispatch(setBatchesError('userId', userIdE));

      const dateE = handleRequired(date, 'La fecha de entrega es obligatoria');
      dispatch(setBatchesError('date', dateE));
      
      if (!userIdE && !dateE && !dispatchesE) {
         const data = { userId, date, dispatches: dispatches.map(d => d.dispatchId) }
         dispatch(startCreateBatch(data, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setUserId('');
      setDate('');
      
      dispatch(setBatchesError('userId', null));
      dispatch(setBatchesError('date', null));

      dispatch(resetDispatches());
      setDispatchesError(null);
   }

   const handleModalState = (state) => {
      const error = handleRequired(date, 'La fecha de entrega es obligatoria');
      dispatch(setBatchesError('date', error));

      if (!error) {

         dispatch(setDispatchesModalState(state));
      }
   }

   const handleDeleteDispatch = (productId) => dispatch(removeDispatchFromBatch(productId));

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
                           value={userId}
                           setValue={handleUserId}
                           title='Encargado del lote'
                           name='user'
                           placeholder='Seleccione un encargado del lote'
                           options={usersList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={userIdError}
                           disabled={loadingUsersList}
                        />

                        <Input
                           type='date'
                           value={date}
                           setValue={handleDate}
                           title='Fecha de entrega'
                           containerClass='col-md-6 col-12 mb-1'
                           error={dateError}
                           min={moment().format('YYYY-MM-DD')}
                        />

                        <div className='col-12 mb-1'>
                           <Button
                              text='Agregar despacho'
                              icon='Plus'
                              className='ms-auto btn-sm'
                              color='success'
                              onClick={() => handleModalState(true)}
                           />
                        </div>
                     </div>
                  </div>

                  {
                     dispatchesError && (
                        <span className='text-center text-danger'><small>{dispatchesError}</small></span>
                     )
                  }

                  <div className='card-datatable table-responsive'>
                     <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                        <div className='table-responsive'>
                           <table className={`invoice-list-table table dataTable no-footer dtr-column ${dispatchesError && 'border border-danger'}`}>
                              <thead>
                                 <tr role='row'>
                                    <th rowSpan={1} colSpan={1} className='text-center'>Cliente</th>

                                    <th rowSpan={1} colSpan={1} className='text-center'>Ciudad</th>
                                    
                                    <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {
                                    dispatches.map(dis => (
                                       <tr key={'dispatch-product-' + dis.dispatchId}>
                                          <td className='text-center'>{dis.clientName}</td>

                                          <td className='text-center'>{dis.cityName}</td>

                                          <td className='text-center'>
                                             <div className='d-flex justify-content-center gap-1'>
                                                <button
                                                   type='button'
                                                   className='btn btn-sm btn-relief-danger'
                                                   onClick={() => handleDeleteDispatch(dis.dispatchId)}
                                                >
                                                   <Icon icon='Trash2' size={16} />
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    )) 
                                 }

                                 {
                                    (dispatches.length === 0) && (
                                       <tr>
                                          <td colSpan={3}>
                                             <p className='mb-0 py-4 text-center fs-5'>Agregue un despacho con el botón <b>"agregar despacho"</b></p>
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

         <AddDispatchModal
            isOpen={dispatchesModalState}
            handleOpen={handleModalState}
            date={date}
         />
      </>
   );
}



export default BatchesCreate;