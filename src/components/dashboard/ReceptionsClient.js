import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import moment from 'moment';
import LoadingComponent from '../ui/spinners/LoadingComponent';
import { setReceptions, startGetReceptions } from '../../actions/receptions';



const ReceptionsClient = () => {

   const dispatch = useDispatch();

   const { company } = useSelector(state => state.auth);

   const { rows, loadingTable } = useSelector(state => state.receptions);

   useEffect(() => {
      dispatch(startGetReceptions(1, 5, { companyId: company?.id }));
   }, [dispatch, company?.id]);

   useEffect(() => {
      return () => {
         dispatch(setReceptions([], null, null));
      }
   }, [dispatch]);

   return (
      <div className='col-xl-6 col-md-6 col-12'>
         <div className='card card-statistics'>
            <div className='card-header'>
               <h4 className='card-title'>Últimas recepciones</h4>
            </div>

            <div className='position-relative overflow-hidden'>
               <div className='card-datatable table-responsive'>
                  <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                     <div className='table-responsive'>
                        <table className='invoice-list-table table dataTable no-footer dtr-column'>
                           <thead className='table-dark'>
                              <tr role='row'>
                                 <th rowSpan={1} colSpan={1} className='text-center'>Fecha</th>

                                 <th rowSpan={1} colSpan={1} className='text-center'># paletas</th>
                                 
                                 <th rowSpan={1} colSpan={1} className='text-center' style={{width: 120}}>Acciones</th>
                              </tr>
                           </thead>

                           <tbody>
                              {
                                 rows.map(row => (
                                    <tr key={'country-' + row.id}>
                                       <td className='text-center'>{moment(row.date).format('DD-MM-YYYY')}</td>

                                       <td className='text-center fw-bolder'>{row.products.reduce((acc, current) => acc + current.qty, 0)}</td>

                                       <td className='text-center'>
                                          <div className='d-flex justify-content-center gap-1'>
                                             <Link to={`/dispatches/${row.id}`} className='btn btn-sm btn-relief-primary'>
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
                  </div>
               </div>

               <LoadingComponent state={loadingTable} />
            </div>
         </div>
      </div>
   );
}



export default ReceptionsClient;