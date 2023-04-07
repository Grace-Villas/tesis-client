import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setConfigurations, setLoading, startGetConfigurations } from '../actions/configurations';
import { setBreadcrumb } from '../actions/ui';



// Components
import LoadingComponent from '../components/ui/spinners/LoadingComponent';



// Helpers
import { currencyFormat } from '../helpers/format';



const CompanyInfo = () => {

   const dispatch = useDispatch();

   const { configurations, loadingDetail } = useSelector(state => state.configurations);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/roles',
            text: 'Información de la empresa'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetConfigurations());
   }, [dispatch]);

   useEffect(() => {
      return () => {
         dispatch(setConfigurations([]));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   return (
      <div className='row invoice-preview mt-2'>
         <div className='col-xl-12 col-md-12 col-12 position-relative mx-auto'>
            <div className='card invoice-preview-card mb-2'>
               <div className='card-body invoice-padding pb-0'>
                  <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                     <h4 className='mb-0 fw-bolder'>Información de la empresa</h4>
                  </div>
               </div>

               <hr className='invoice-spacing mb-0' />

               <div className='card-datatable table-responsive'>
                  <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                     <div className='table-responsive'>
                        <table className='invoice-list-table table table-borderless dataTable no-footer dtr-column'>
                           <tbody>
                              {
                                 configurations.map(conf => (
                                    <tr key={'config-' + conf.id} className='borderless'>
                                       <td className='text-start'>{conf.key}</td>

                                       <td className='text-end fw-bolder'>{conf.dbKey === 'palletDay' ? currencyFormat(conf.value) : conf.value}</td>
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
   );
}



export default CompanyInfo;