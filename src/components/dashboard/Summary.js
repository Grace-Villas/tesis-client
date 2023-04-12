import { useDispatch, useSelector } from 'react-redux';
import SummaryElement from './SummaryElement';
import { useEffect } from 'react';
import { setData, startGetBatchesCount, startGetClientsCount, startGetDeliveredProductsCount, startGetDispatchesCount, startGetPalletsCount, startGetReceptionsCount } from '../../actions/dashboard';
import PermissionNeeded from '../ui/PermissionNeeded';



const Summary = () => {

   const dispatch = useDispatch();

   const { clientsCount, dispatchesCount, receptionsCount, batchesCount, palletsCount, deliveredCount } = useSelector(state => state.dashboard);

   useEffect(() => {
      dispatch(startGetClientsCount());
      dispatch(startGetDispatchesCount());
      dispatch(startGetReceptionsCount());
      dispatch(startGetBatchesCount());
      dispatch(startGetDeliveredProductsCount());
      dispatch(startGetPalletsCount());
   }, [dispatch]);

   useEffect(() => {
      return () => {
         dispatch(setData('clientsCount', null));
         dispatch(setData('dispatchesCount', null));
         dispatch(setData('receptionsCount', null));
         dispatch(setData('batchesCount', null));
         dispatch(setData('palletsCount', null));
         dispatch(setData('deliveredCount', null));
      }
   }, [dispatch]);

   return (
      <div className='col-xl-9 col-md-6 col-12'>
         <div className='card card-statistics'>
            <div className='card-header'>
               <h4 className='card-title'>Estadísticas</h4>

               <div className='d-flex align-items-center'>
                  <p className='card-text font-small-2 me-25 mb-0'>Histórico de registros</p>
               </div>
            </div>

            <div className='card-body statistics-body px-1'>
               <div className='row'>
                  <PermissionNeeded onlyAdmin>
                     <SummaryElement
                        colorClass='bg-light-primary'
                        icon='Briefcase'
                        value={clientsCount}
                        text='Clientes'
                     />

                     <SummaryElement
                        colorClass='bg-light-success'
                        icon='Clipboard'
                        value={batchesCount}
                        text='Lotes'
                     />
                  </PermissionNeeded>

                  <PermissionNeeded onlyClient>
                     <SummaryElement
                        colorClass='bg-light-primary'
                        icon='Archive'
                        value={palletsCount}
                        text='Paletas'
                     />

                     <SummaryElement
                        colorClass='bg-light-success'
                        icon='Package'
                        value={deliveredCount}
                        text='P. Entregados'
                     />
                  </PermissionNeeded>

                  <SummaryElement
                     colorClass='bg-light-info'
                     icon='Truck'
                     value={dispatchesCount}
                     text='Despachos'
                  />

                  <SummaryElement
                     colorClass='bg-light-danger'
                     icon='Upload'
                     value={receptionsCount}
                     text='Recepciones'
                  />
               </div>
            </div>
         </div>
      </div>
   );
}



export default Summary;