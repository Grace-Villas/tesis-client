import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setConfigurations, setLoading, startGetConfigurations } from '../actions/configurations';
import { setBreadcrumb } from '../actions/ui';



// Components
import LoadingComponent from '../components/ui/spinners/LoadingComponent';
import Icon from '../components/ui/Icon';
import EditConfigModal from '../components/configurations/EditConfigModal';



const Configurations = () => {

   const dispatch = useDispatch();

   const { configurations, loadingDetail } = useSelector(state => state.configurations);

   const [configs, setConfigs] = useState([]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/roles',
            text: 'Configuraciones de la empresa'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetConfigurations());
   }, [dispatch]);

   useEffect(() => {
      setConfigs(configurations.map(conf => ({
         ...conf,
         isOpen: false
      })));
   }, [configurations]);

   useEffect(() => {
      return () => {
         dispatch(setConfigurations([]));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleOpenModal = (index) => setConfigs(configs.map((conf, i) => {
      if (i !== index) {
         return conf;
      }

      return {
         ...conf,
         isOpen: !conf.isOpen
      }
   }));

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-12 col-md-12 col-12 position-relative mx-auto'>
               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Configuraciones de la empresa</h4>
                     </div>
                  </div>

                  <hr className='invoice-spacing mb-0' />

                  <div className='card-datatable table-responsive'>
                     <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                        <div className='table-responsive'>
                           <table className='invoice-list-table table dataTable no-footer dtr-column'>
                              <thead className='table-dark'>
                                 <tr role='row'>
                                    <th rowSpan={1} colSpan={1} className='text-start'>Atributo</th>

                                    <th rowSpan={1} colSpan={1} className='text-end'>Valor</th>
                                    
                                    <th rowSpan={1} colSpan={1} className='text-center'>Acciones</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {
                                    configs.map((conf, i) => (
                                       <tr key={'config-' + conf.id}>
                                          <td className='text-start'>{conf.key}</td>

                                          <td className='text-end'>{conf.value}</td>

                                          <td className='text-center'>
                                             <div className='d-flex justify-content-center gap-1'>
                                                <button
                                                   className='btn btn-sm btn-relief-info'
                                                   onClick={() => handleOpenModal(i)}
                                                >
                                                   <Icon icon='Edit' size={16} />
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    )) 
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
         </div>

         {
            configs.map((conf, i) => (
               <EditConfigModal
                  key={'config-modal-' + conf.id}
                  isOpen={conf.isOpen}
                  handleOpen={() => handleOpenModal(i)}
                  configId={conf.id}
                  currentValue={`${conf.value}`}
                  configTitle={conf.key}
                  handleInvalid={conf.handleInvalid}
               />
            ))
         }
      </>
   );
}



export default Configurations;