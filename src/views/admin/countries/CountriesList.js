import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { startDeleteCountry, startGetCountries } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import Pagination from '../../../components/hud/Pagination';
import RowsQuantityPicker from '../../../components/tables/RowsQuantityPicker';



// Custom hooks
import { useCurrentPage } from '../../../hooks/usePagination';



const CountriesList = () => {

   const dispatch = useDispatch();

   const { rows, count, pages, loadingTable, loadingDelete } = useSelector(state => state.countries);

   const { perPage } = useSelector(state => state.tables);

   const { currentPage } = useCurrentPage();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/countries',
            text: 'Países'
         },
         {
            text: 'Listado'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      if (currentPage === null || perPage === '') return

      dispatch(startGetCountries(currentPage, perPage));
   }, [dispatch, currentPage, perPage]);

   // handle delete
   const handleDelete = (id) => dispatch(startDeleteCountry(id, currentPage, perPage));

   return (
      <div className='card mt-2 position-relative'>
         <div className='card-datatable table-responsive'>
            <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
               <div className='row d-flex justify-content-between align-items-center mx-1 my-2'>
                  <div className='col-12 col-lg-6 d-flex align-items-center justify-content-between justify-content-md-start'>
                     <RowsQuantityPicker />
                     
                     <div className='dt-action-buttons text-xl-end text-lg-start text-lg-end text-start ms-0 ms-md-2'>
                        <div className='dt-buttons m-0'>
                           <button className='dt-button btn btn-primary btn-add-record m-0' type='button'>
                              <span>Nuevo</span>
                           </button>
                        </div>
                     </div>
                  </div>
                  
                  <div className='col-12 col-lg-6 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pe-lg-1 p-md-0 mt-1 mt-md-0'>
                     <div className='d-flex align-items-center gap-1 w-100'>
                        <label>Buscar</label>

                        <input type='search' className='form-control flex-grow-1' placeholder='Ingrese su búsqueda' />
                     </div>

                     <div className='invoice_status ms-sm-2' />
                  </div>
               </div>
            
               <div className='table-responsive'>
                  <table className='invoice-list-table table dataTable no-footer dtr-column'>
                     <thead>
                        <tr role='row'>
                           <th rowSpan={1} colSpan={1} className='text-center'>País</th>
                           
                           <th rowSpan={1} colSpan={1} className='text-center' style={{width: 500}}>Acciones</th>
                        </tr>
                     </thead>

                     <tbody>
                        {
                           rows.map(row => (
                              <tr key={'country-' + row.id}>
                                 <td className='text-center'>{row.name}</td>

                                 <td className='text-center'>
                                    <div className='d-flex justify-content-center gap-1'>
                                       <Link to={`${row.id}`} className='btn btn-sm btn-relief-primary'>Ver</Link>

                                       <Link to={`edit/${row.id}`} className='btn btn-sm btn-relief-info'>Editar</Link>

                                       <button
                                          type='button'
                                          className='btn btn-sm btn-relief-danger'
                                          onClick={() => handleDelete(row.id)}
                                       >Eliminar</button>
                                    </div>
                                 </td>
                              </tr>
                           )) 
                        }
                     </tbody>
                  </table>
               </div>
               
               <Pagination pages={pages} count={count} perPage={perPage} loading={loadingTable} />
            </div>
         </div>

         <LoadingComponent state={loadingTable || loadingDelete} />
      </div>
   );
}



export default CountriesList;