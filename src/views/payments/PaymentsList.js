import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';



// Actions
import { setPayments, startGetPayments } from '../../actions/payments';
import { setPaymentStatuses, startGetPaymentStatuses } from '../../actions/payment-statuses';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';



// Components
import Button from '../../components/ui/Button';
import CreateButton from '../../components/tables/CreateButton';
import FiltersContainer from '../../components/tables/FiltersContainer';
import Icon from '../../components/ui/Icon';
import InputFilter from '../../components/tables/InputFilter';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import Pagination from '../../components/hud/Pagination';
import RowsQuantityPicker from '../../components/tables/RowsQuantityPicker';
import SelectFilter from '../../components/tables/SelectFilter';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';



// Helpers
import { currencyFormat } from '../../helpers/format';
import { usePermission } from '../../hooks/usePermission';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const PaymentsList = () => {

   usePermission({section: 'payments', permission: 'list'});

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.payments);

   const { date, statusId } = useSelector(state => state.filters);

   const { paymentStatusesList, loadingList: loadingPaymentStatusesList } = useSelector(state => state.paymentStatuses);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/payment',
            text: 'Pagos'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetPaymentStatuses());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetPayments(currentPage, perPage, { date, statusId }));
   }, [dispatch, currentPage, perPage, date, statusId]);

   useEffect(() => {
      return () => {
         dispatch(setPayments([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(setPaymentStatuses([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='date'
               label='Filtrar por fecha'
               type='date'
            />

            <SelectFilter
               label='Filtrar por tipo de pago'
               keyName='statusId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='paymentTypes'
               options={paymentStatusesList}
               disabled={loadingPaymentStatusesList}
            />

            <div className='col-12'>
               <Button
                  className='ms-auto mt-1'
                  onClick={handleResetFilters}
                  text='Limpiar'
               />
            </div>

            <div className='col-12'>
               <hr className='my-2' />
            </div>

            <RowsQuantityPicker />

            <PermissionNeeded
               section='payments'
               permission='create'
               onlyClient
            >
               <CreateButton link='create' />
            </PermissionNeeded>
         </FiltersContainer>

         <div className='card mt-1 position-relative overflow-hidden'>
            <div className='card-datatable table-responsive'>
               <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                  <div className='table-responsive'>
                     <table className='invoice-list-table table dataTable no-footer dtr-column'>
                        <thead className='table-dark'>
                           <tr role='row'>
                              <th rowSpan={1} colSpan={1} className='text-center'>Fecha</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Monto</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Estatus</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Método de pago</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{moment(row.date).format('DD-MM-YYYY')}</td>

                                    <td className='text-center'>{currencyFormat(row.amount)}</td>

                                    <td className='text-center fw-bolder'>{row.status.name}</td>

                                    <td className='text-center'>{row.paymentMethod.paymentType.name}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>
                                             <Icon icon='Info' size={16} />
                                          </Link>
                                       </div>
                                    </td>
                                 </tr>
                              )) 
                           }

                           {
                              (rows.length === 0 && !loadingTable) && (
                                 <tr className='odd'>
                                    <td valign='top' colSpan='6' className='text-center py-5 fw-bolder h3'>No hay resultados...</td>
                                 </tr>
                              )
                           }
                        </tbody>
                     </table>
                  </div>
                  
                  <Pagination pages={pages} count={count} perPage={perPage} loading={loadingTable} />
               </div>
            </div>

            <LoadingComponent state={loadingTable || loadingDelete} />
         </div>
      </>
   );
}



export default PaymentsList;