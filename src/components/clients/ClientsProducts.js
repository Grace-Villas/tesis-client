import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { setProducts, startGetCompanyProducts } from '../../actions/products';
import { resetFilters } from '../../actions/filters';



// Components
import LoadingComponent from '../ui/spinners/LoadingComponent';
import Pagination from '../hud/Pagination';
import Icon from '../ui/Icon';
import RowsQuantityPicker from '../tables/RowsQuantityPicker';
import Button from '../ui/Button';
import InputFilter from '../tables/InputFilter';
import FiltersContainer from '../tables/FiltersContainer';



// Custom hooks
import { useCurrentPage } from '../../hooks/usePagination';



const ClientsProducts = () => {

   const dispatch = useDispatch();

   const { client } = useSelector(state => state.clients);

   const { rows, count, pages, loadingTable } = useSelector(state => state.products);

   const { name } = useSelector(state => state.filters);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      if (currentPage === null || perPage === '' || !client?.id) return

      dispatch(startGetCompanyProducts(currentPage, perPage, { name, companyId: client?.id }));
   }, [dispatch, currentPage, perPage, name, client?.id]);

   useEffect(() => {
      return () => {
         dispatch(setProducts([], null, null));
         dispatch(resetFilters());
      }
   }, [dispatch]);

   const handleResetFilters = () => dispatch(resetFilters());

   return (
      <div className='col-xl-9 col-md-8 col-12 position-relative'>
         <FiltersContainer className=''>
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
         </FiltersContainer>

         <div className='card mt-1 position-relative overflow-hidden'>
            <div className='card-datatable table-responsive'>
               <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                  <div className='table-responsive'>
                     <table className='invoice-list-table table dataTable no-footer dtr-column'>
                        <thead className='table-dark'>
                           <tr role='row'>
                              <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>

                              <th rowSpan={1} colSpan={1} className='text-center'>Stock</th>
                              
                              <th rowSpan={1} colSpan={1} className='text-center' style={{width: 300}}>Acciones</th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              rows.map(row => (
                                 <tr key={'product-' + row.id}>
                                    <td className='text-center'>{row.name}</td>
                                    
                                    <td className='text-center'>{row.stock}</td>

                                    <td className='text-center'>
                                       <div className='d-flex justify-content-center gap-1'>
                                          <Link to={`/products/${row.productId}`} className='btn btn-sm btn-relief-primary'>
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



export default ClientsProducts;