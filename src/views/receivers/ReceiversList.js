import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setReceivers, startDeleteReceiver, startGetReceivers } from '../../actions/receivers';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';
import { startGetCitiesList } from '../../actions/cities';



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



const ReceiversList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.receivers);

   const { citiesList, loadingList: loadingCitiesList } = useSelector(state => state.cities);

   const { search, cityId } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/products',
            text: 'Destinatarios'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetCitiesList({hasDeliveries: 1}));
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetReceivers(currentPage, perPage, { search, cityId }));
   }, [dispatch, currentPage, perPage, search, cityId]);

   useEffect(() => {
      return () => {
         dispatch(setReceivers([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteReceiver(id, { page: currentPage, perPage }, { search, cityId }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='search'
            />

            <SelectFilter
               label='Filtrar por ciudad'
               keyName='cityId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='cities'
               options={citiesList}
               disabled={loadingCitiesList}
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
                              <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center'>Ciudad</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Estado</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'product-' + row.id}>
                                    <td className='text-center'>{row.name}</td>

                                    <td className='text-center'>{row.city.name}</td>

                                    <td className='text-center'>{row.city.state.name}</td>

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



export default ReceiversList;