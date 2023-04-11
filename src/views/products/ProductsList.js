import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setProducts, startDeleteProduct, startGetCompanyProducts, startGetProducts } from '../../actions/products';
import { setBreadcrumb } from '../../actions/ui';
import { resetFilters } from '../../actions/filters';



// Components
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import Pagination from '../../components/hud/Pagination';
import RowsQuantityPicker from '../../components/tables/RowsQuantityPicker';
import CreateButton from '../../components/tables/CreateButton';
import FiltersContainer from '../../components/tables/FiltersContainer';
import InputFilter from '../../components/tables/InputFilter';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';
import PermissionNeeded from '../../components/ui/PermissionNeeded';
import { usePermission } from '../../hooks/usePermission';



const ProductsList = () => {

   usePermission({section: 'products', permission: 'list'});

   const dispatch = useDispatch();

   const { isAdmin } = useSelector(state => state.auth);

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.products);

   const { name } = useSelector(state => state.filters);

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
            text: 'Productos'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      let getMethod = startGetProducts;

      if (!isAdmin) {
         getMethod = startGetCompanyProducts;
      }

      dispatch(getMethod(currentPage, perPage, { name }));
   }, [dispatch, isAdmin, currentPage, perPage, name]);

   useEffect(() => {
      return () => {
         dispatch(setProducts([], null, null));
         dispatch(setBreadcrumb([]));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteProduct(id, { page: currentPage, perPage }, { name }));

   return (
      <>
         <FiltersContainer>
            <InputFilter
               className='col-12 col-lg'
               keyName='name'
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

                              <PermissionNeeded onlyAdmin>
                                 <th rowSpan={1} colSpan={1} className='text-center'>Unidades por paleta</th>
                              </PermissionNeeded>

                              <PermissionNeeded onlyClient>
                                 <th rowSpan={1} colSpan={1} className='text-center'>Stock</th>
                              </PermissionNeeded>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'product-' + row.id}>
                                    <td className='text-center'>{row.name}</td>

                                    <PermissionNeeded onlyAdmin>
                                       <td className='text-center'>{row.qtyPerPallet}</td>
                                    </PermissionNeeded>

                                    <PermissionNeeded onlyClient>
                                       <td className='text-center'>{row.stock}</td>
                                    </PermissionNeeded>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>
                                             <Icon icon='Info' size={16} />
                                          </Link>

                                          <PermissionNeeded
                                             section='products'
                                             permission='edit'
                                             onlyAdmin
                                          >
                                             <Link to={`edit/${row.id}`} className='btn btn-sm btn-relief-info'>
                                                <Icon icon='Edit' size={16} />
                                             </Link>
                                          </PermissionNeeded>

                                          <PermissionNeeded
                                             section='products'
                                             permission='delete'
                                             onlyAdmin
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



export default ProductsList;