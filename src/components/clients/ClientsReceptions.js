import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setReceptions, startGetReceptions } from '../../actions/receptions';



// Components
import LoadingComponent from '../ui/spinners/LoadingComponent';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';
import { setUsersList, startGetUsersList } from '../../actions/users';
import { resetFilters } from '../../actions/filters';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Pagination from '../hud/Pagination';
import RowsQuantityPicker from '../tables/RowsQuantityPicker';
import FiltersContainer from '../tables/FiltersContainer';
import InputFilter from '../tables/InputFilter';
import SelectFilter from '../tables/SelectFilter';
import Button from '../ui/Button';



const ClientsReceptions = () => {

   const dispatch = useDispatch();

   const { client } = useSelector(state => state.clients);

   const { rows, count, pages, loadingTable } = useSelector(state => state.receptions);

   const { usersList, loadingList: loadingUsersList } = useSelector(state => state.users);

   const { date, userId } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(startGetUsersList());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '' || !client?.id) return

      dispatch(startGetReceptions(currentPage, perPage, { companyId: client?.id, date, userId }));
   }, [dispatch, currentPage, perPage, client?.id, date, userId]);

   useEffect(() => {
      return () => {
         dispatch(setReceptions([], null, null));
         dispatch(setUsersList([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   return (
      <div className='col-xl-9 col-md-8 col-12 position-relative'>
         <FiltersContainer className=''>
            <InputFilter
               type='date'
               className='col-12 col-lg'
               keyName='date'
               label='Filtrar por fecha'
            />

            <SelectFilter
               label='Filtrar por consignador'
               keyName='userId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='users'
               options={usersList}
               disabled={loadingUsersList}
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

                              <th rowSpan={1} colSpan={1} className='text-center'>Cliente</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Consignado por</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'product-' + row.id}>
                                    <td className='text-center'>{moment(row.date).format('DD-MM-YYYY')}</td>

                                    <td className='text-center'>{row.company.name}</td>

                                    <td className='text-center'>{row.consignee.fullName}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`/receptions/${row.id}`} className='btn btn-sm btn-relief-primary'>
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



export default ClientsReceptions;