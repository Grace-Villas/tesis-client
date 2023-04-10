import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';



// Actions
import { setBatches, startGetBatches } from '../../../actions/batches';
import { setUsersList, startGetUsersList } from '../../../actions/users';
import { setBatchStatuses, startGetBatchStatuses } from '../../../actions/batch-statuses';
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



const BatchesList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable } = useSelector(state => state.batches);

   const { date, statusId, userId } = useSelector(state => state.filters);

   const { batchStatusesList, loadingList: loadingBatchStatusesList } = useSelector(state => state.batchStatuses);
   
   const { usersList, loadingList: loadingUsersList } = useSelector(state => state.users);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

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
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetBatchStatuses());
      dispatch(startGetUsersList())
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetBatches(currentPage, perPage, { date, statusId, userId }));
   }, [dispatch, currentPage, perPage, date, statusId, userId]);

   useEffect(() => {
      return () => {
         dispatch(setBatches([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(setBatchStatuses([]));
         dispatch(setUsersList([]));
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
               label='Filtrar por encargado'
               keyName='userId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='users'
               options={usersList}
               disabled={loadingUsersList}
            />

            <SelectFilter
               label='Filtrar por estatus'
               keyName='statusId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='statuses'
               options={batchStatusesList}
               disabled={loadingBatchStatusesList}
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
                              <th rowSpan={1} colSpan={1} className='text-center'>Fecha</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Estatus</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Encargado</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{moment(row.date).format('DD-MM-YYYY')}</td>

                                    <td className='text-center fw-bolder'>{row.status.name.toLocaleUpperCase()}</td>

                                    <td className='text-center fw-bolder'>{row.carrier.fullName}</td>

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

            <LoadingComponent state={loadingTable} />
         </div>
      </>
   );
}



export default BatchesList;