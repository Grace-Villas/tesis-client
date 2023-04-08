import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setCities, startDeleteCity, startGetCities } from '../../../actions/cities';
import { setStatesList, startGetStatesList } from '../../../actions/states';
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
import { currencyFormat } from '../../../helpers/format';



// Mocks
const hasDeliveriesData = [
   { value: 1, text: 'Con despacho' },
   { value: 0, text: 'Sin despacho' }
];



const CitiesList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.cities);

   const { name, stateId, hasDeliveries } = useSelector(state => state.filters);

   const { statesList, loadingList: loadingStatesList } = useSelector(state => state.states);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/cities',
            text: 'Ciudades'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetStatesList());
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetCities(currentPage, perPage, { name, stateId, hasDeliveries }));
   }, [dispatch, currentPage, perPage, name, stateId, hasDeliveries]);

   useEffect(() => {
      return () => {
         dispatch(setCities([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(setStatesList([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteCity(id, { page: currentPage, perPage }, { name, stateId, hasDeliveries }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='name'
            />

            <SelectFilter
               label='Filtrar por estado'
               keyName='stateId'
               className='col-12 col-lg mt-1 mt-md-0'
               name='states'
               options={statesList}
               disabled={loadingStatesList}
            />

            <SelectFilter
               label='Filtrar por despachable'
               keyName='hasDeliveries'
               className='col-12 col-lg mt-1 mt-md-0'
               name='deliveries'
               options={hasDeliveriesData}
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
                              <th rowSpan={1} colSpan={1} className='text-center'>Ciudad</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Estado</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Despachable</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Costo de despacho</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{row.name}</td>

                                    <td className='text-center'>{row.state.name}</td>

                                    <td
                                       className={`text-center ${row.hasDeliveries ? 'text-success' : 'text-danger'}`}
                                    >{row.hasDeliveries ? 'Sí' : 'No'}</td>

                                    <td className='text-center'>{row.deliveryPrice ? currencyFormat(row.deliveryPrice) : '-'}</td>

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



export default CitiesList;