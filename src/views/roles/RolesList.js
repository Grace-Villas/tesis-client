import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setRoles, startDeleteRole, startGetRoles } from '../../actions/roles';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';



// Components
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import Pagination from '../../components/hud/Pagination';
import RowsQuantityPicker from '../../components/tables/RowsQuantityPicker';
import Icon from '../../components/ui/Icon';
import FiltersContainer from '../../components/tables/FiltersContainer';
import InputFilter from '../../components/tables/InputFilter';
import Button from '../../components/ui/Button';
import SelectFilter from '../../components/tables/SelectFilter';
import CreateButton from '../../components/tables/CreateButton';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';



// Helpers
import { contrastColor } from '../../helpers/colors';



// Mocks
const isPublicData = [
   { value: 1, text: 'Público' },
   { value: 0, text: 'Privado' }
];



const RolesList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.roles);

   const { name, isPublic } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/roles',
            text: 'Roles'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetRoles(currentPage, perPage, { name, isPublic }));
   }, [dispatch, currentPage, perPage, name, isPublic]);

   useEffect(() => {
      return () => {
         dispatch(setRoles([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteRole(id, { page: currentPage, perPage }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='name'
            />

            <SelectFilter
               label='Filtrar por status'
               keyName='isPublic'
               className='col-12 col-lg mt-1 mt-md-0'
               name='deliveries'
               options={isPublicData}
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

                              <th rowSpan={1} colSpan={1} className='text-center'>Color</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Público</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 500}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{row.name}</td>

                                    <td className='text-center'>
                                       <span
                                          className='px-50 py-25 rounded'
                                          style={{
                                             backgroundColor: row.hexColor,
                                             color: contrastColor(row.hexColor)
                                          }}>{row.hexColor}</span>
                                    </td>

                                    <td className={`text-center ${row.isPublic ? 'text-success' : 'text-danger'}`}>
                                       {row.isPublic ? 'Sí' : 'No'}
                                    </td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>
                                             <Icon icon='Info' size={16} />
                                          </Link>

                                          {
                                             !row.isPublic && (
                                                <Link to={`edit/${row.id}`} className='btn btn-sm btn-relief-info'>
                                                   <Icon icon='Edit' size={16} />
                                                </Link>
                                             )
                                          }

                                          {
                                             !row.isPublic && (
                                                <button
                                                   type='button'
                                                   className='btn btn-sm btn-relief-danger'
                                                   onClick={() => handleDelete(row.id, currentPage, perPage)}
                                                >
                                                   <Icon icon='Trash2' size={16} />
                                                </button>
                                             )
                                          }
                                       </div>
                                    </td>
                                 </tr>
                              )) 
                           }

                           {
                              (rows.length === 0 && !loadingTable) && (
                                 <tr className='odd'>
                                    <td valign='top' colspan='6' className='text-center py-5 fw-bolder h3'>No hay resultados...</td>
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



export default RolesList;