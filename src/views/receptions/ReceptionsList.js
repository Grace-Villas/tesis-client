import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';



// Actions
import { setReceptions, startGetReceptions } from '../../actions/receptions';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';
import { setClientsList, startGetClientsList } from '../../actions/clients';
import { startGetUsersList } from '../../actions/users';



// Components
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import Pagination from '../../components/hud/Pagination';
import RowsQuantityPicker from '../../components/tables/RowsQuantityPicker';
import CreateButton from '../../components/tables/CreateButton';
import FiltersContainer from '../../components/tables/FiltersContainer';
import InputFilter from '../../components/tables/InputFilter';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import SelectFilter from '../../components/tables/SelectFilter';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';
import { usePermission } from '../../hooks/usePermission';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const ReceptionsList = () => {

   usePermission({section: 'receptions', permission: 'list'});

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable } = useSelector(state => state.receptions);

   const { clientsList, loadingList: loadingClientsList } = useSelector(state => state.clients);

   const { usersList, loadingList: loadingUsersList } = useSelector(state => state.users);

   const { date, companyId, userId } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/receptions',
            text: 'Recepciones de productos'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetClientsList());
      dispatch(startGetUsersList());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetReceptions(currentPage, perPage, { date, companyId, userId }));
   }, [dispatch, currentPage, perPage, date, companyId, userId]);

   useEffect(() => {
      return () => {
         dispatch(setReceptions([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(setClientsList([]));
         dispatch(setClientsList([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   return (
      <>
         <FiltersContainer>
            <InputFilter
               type='date'
               className='col-12 col-lg'
               keyName='date'
               label='Filtrar por fecha'
            />

            <PermissionNeeded onlyAdmin>
               <SelectFilter
                  label='Filtrar por cliente'
                  keyName='companyId'
                  className='col-12 col-lg mt-1 mt-md-0'
                  name='companies'
                  options={clientsList}
                  disabled={loadingClientsList}
               />

               <SelectFilter
                  label='Filtrar por consignador'
                  keyName='userId'
                  className='col-12 col-lg mt-1 mt-md-0'
                  name='users'
                  options={usersList}
                  disabled={loadingUsersList}
               />
            </PermissionNeeded>

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

            <PermissionNeeded onlyAdmin>
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

                              <PermissionNeeded onlyAdmin>
                                 <th rowSpan={1} colSpan={1} className='text-center'>Cliente</th>

                                 <th rowSpan={1} colSpan={1} className='text-center'>Consignado por</th>
                              </PermissionNeeded>

                              <PermissionNeeded onlyClient>
                                 <th rowSpan={1} colSpan={1} className='text-center'># paletas total</th>
                              </PermissionNeeded>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'product-' + row.id}>
                                    <td className='text-center'>{moment(row.date).format('DD-MM-YYYY')}</td>

                                    <PermissionNeeded onlyAdmin>
                                       <td className='text-center'>{row.company.name}</td>

                                       <td className='text-center'>{row.consignee.fullName}</td>
                                    </PermissionNeeded>

                                    <PermissionNeeded onlyClient>
                                       <td className='text-center'>{row.products.reduce((acc, current) => acc + current.qty, 0)}</td>
                                    </PermissionNeeded>

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



export default ReceptionsList;