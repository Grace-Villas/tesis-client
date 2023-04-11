import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setUsers, startDeleteUser, startGetUsers } from '../../actions/users';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';



// Components
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import Pagination from '../../components/hud/Pagination';
import RowsQuantityPicker from '../../components/tables/RowsQuantityPicker';
import FiltersContainer from '../../components/tables/FiltersContainer';
import InputFilter from '../../components/tables/InputFilter';
import Button from '../../components/ui/Button';
import CreateButton from '../../components/tables/CreateButton';
import Icon from '../../components/ui/Icon';


// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';
import { usePermission } from '../../hooks/usePermission';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const UsersList = () => {

   usePermission({section: 'users', permission: 'list'});

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.users);

   const { name, email } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/users',
            text: 'Usuarios'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetUsers(currentPage, perPage, { name, email }));
   }, [dispatch, currentPage, perPage, name, email]);

   useEffect(() => {
      return () => {
         dispatch(setUsers([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteUser(id, { page: currentPage, perPage }, { name, email }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               label='Filtrar por nombre'
               className='col-12 col-lg'
               keyName='name'
            />

            <InputFilter
               label='Filtrar por correo'
               className='col-12 col-lg'
               keyName='email'
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
               section='users'
               permission='create'
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
                              <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Correo</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'country-' + row.id}>
                                    <td className='text-center'>{row.fullName}</td>

                                    <td className='text-center'>{row.email}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <PermissionNeeded
                                             section='users'
                                             permission='list'
                                          >
                                             <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>
                                                <Icon icon='Info' size={16} />
                                             </Link>
                                          </PermissionNeeded>

                                          <PermissionNeeded
                                             section='users'
                                             permission='edit'
                                          >
                                             <Link to={`edit/${row.id}`} className='btn btn-sm btn-relief-info'>
                                                <Icon icon='Edit' size={16} />
                                             </Link>
                                          </PermissionNeeded>

                                          <PermissionNeeded
                                             section='users'
                                             permission='delete'
                                          >
                                             <button
                                                type='button'
                                                className='btn btn-sm btn-relief-danger'
                                                onClick={() => handleDelete(row.id, currentPage, perPage)}
                                             >
                                                <Icon icon='Trash2' size={16} />
                                             </button>
                                          </PermissionNeeded>
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



export default UsersList;