import { useDispatch, useSelector } from 'react-redux';



// Components
import LoadingComponent from '../ui/spinners/LoadingComponent';
import { useCurrentPage } from '../../hooks/usePagination';
import { useEffect } from 'react';
import { setPaymentStatuses, startGetPaymentStatuses } from '../../actions/payment-statuses';
import { setPayments, startGetPayments } from '../../actions/payments';
import { resetFilters } from '../../actions/filters';
import FiltersContainer from '../tables/FiltersContainer';
import InputFilter from '../tables/InputFilter';
import SelectFilter from '../tables/SelectFilter';
import Button from '../ui/Button';
import RowsQuantityPicker from '../tables/RowsQuantityPicker';
import moment from 'moment';
import { currencyFormat } from '../../helpers/format';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Pagination from '../hud/Pagination';



const ClientsPayments = () => {

   const dispatch = useDispatch();

   const { client } = useSelector(state => state.clients);

   const { rows, count, pages, loadingTable } = useSelector(state => state.payments);

   const { date, statusId } = useSelector(state => state.filters);

   const { paymentStatusesList, loadingList: loadingPaymentStatusesList } = useSelector(state => state.paymentStatuses);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(startGetPaymentStatuses());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '' || !client?.id) return

      dispatch(startGetPayments(currentPage, perPage, { date, statusId, companyId: client?.id }));
   }, [dispatch, currentPage, perPage, date, statusId, client?.id]);

   useEffect(() => {
      return () => {
         dispatch(setPayments([], null, null));
         dispatch(setPaymentStatuses([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   return (
      <div className='col-xl-9 col-md-8 col-12 position-relative'>
         <FiltersContainer className=''>
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
                                          <Link to={`/payments/${row.id}`} className='btn btn-sm btn-relief-primary'>
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

            <LoadingComponent state={loadingTable} />
         </div>
      </div>
   );
}



export default ClientsPayments;