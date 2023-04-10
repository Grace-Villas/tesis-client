import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setPaymentMethods, startDeletePaymentMethod, startGetPaymentMethods } from '../../../actions/payment-methods';
import { setPaymentTypesList, startGetPaymentTypesList } from '../../../actions/payment-types';
import { setBreadcrumb } from '../../../actions/ui';
import { resetFilters } from '../../../actions/filters';



// Components
import Button from '../../../components/ui/Button';
import CreateButton from '../../../components/tables/CreateButton';
import FiltersContainer from '../../../components/tables/FiltersContainer';
import Icon from '../../../components/ui/Icon';
import InputFilter from '../../../components/tables/InputFilter';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import Pagination from '../../../components/hud/Pagination';
import RowsQuantityPicker from '../../../components/tables/RowsQuantityPicker';
import SelectFilter from '../../../components/tables/SelectFilter';



// Custom hooks
import { useCurrentPage } from '../../../hooks/usePagination';



const PaymentMethodsList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.paymentMethods);

   const { search, paymentTypeId } = useSelector(state => state.filters);

   const { paymentTypesList, loadingList: loadingPaymentTypesList } = useSelector(state => state.paymentTypes);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/payment-methods',
            text: 'Métodos de pago'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetPaymentTypesList());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetPaymentMethods(currentPage, perPage, { search, paymentTypeId }));
   }, [dispatch, currentPage, perPage, search, paymentTypeId]);

   useEffect(() => {
      return () => {
         dispatch(setPaymentMethods([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(setPaymentTypesList([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeletePaymentMethod(id, { page: currentPage, perPage }, { search, paymentTypeId }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='search'
            />

            <SelectFilter
               label='Filtrar por tipo de pago'
               keyName='paymentTypeId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='paymentTypes'
               options={paymentTypesList}
               disabled={loadingPaymentTypesList}
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

            <CreateButton link='create' />
         </FiltersContainer>

         <div className='card mt-1 position-relative overflow-hidden'>
            <div className='card-datatable table-responsive'>
               <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                  <div className='table-responsive'>
                     <table className='invoice-list-table table dataTable no-footer dtr-column'>
                        <thead className='table-dark'>
                           <tr role='row'>
                              <th rowSpan={1} colSpan={1} className='text-center'>Tipo de pago</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>banco</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Número de cuenta</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Correo</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Teléfono</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{row.paymentType.name}</td>

                                    <td className='text-center'>{row.bankName ?? '-'}</td>

                                    <td className='text-center'>{row.accountNumber ?? '-'}</td>

                                    <td className='text-center'>{row.email ?? '-'}</td>

                                    <td className='text-center'>{row.phone ?? '-'}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>
                                             <Icon icon='Info' size={16} />
                                          </Link>

                                          <Link to={`edit/${row.id}`} className='btn btn-sm btn-relief-info'>
                                             <Icon icon='Edit' size={16} />
                                          </Link>

                                          <button
                                             type='button'
                                             className='btn btn-sm btn-relief-danger'
                                             onClick={() => handleDelete(row.id, currentPage, perPage)}
                                          >
                                             <Icon icon='Trash2' size={16} />
                                          </button>
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



export default PaymentMethodsList;