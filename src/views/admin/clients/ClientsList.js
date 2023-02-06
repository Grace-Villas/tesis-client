


// Components
import Pagination from '../../../components/hud/Pagination';



const ClientsList = () => {

   return (
      <div className='card mt-2'>
         <div className='card-datatable table-responsive'>
            <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
               <div className='row d-flex justify-content-between align-items-center mx-1 my-2'>
                  <div className='col-12 col-lg-6 d-flex align-items-center justify-content-between justify-content-md-start'>
                     <div className='d-flex align-items-center gap-1'>
                        <label>Mostrar</label>

                        <select name='DataTables_Table_0_length' className='form-select' style={{minWidth: '5rem'}}>
                           <option value={10}>10</option>
                           <option value={25}>25</option>
                           <option value={50}>50</option>
                           <option value={100}>100</option>
                        </select>
                     </div>
                     
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
                           <th className='sorting sorting_desc' rowSpan={1} colSpan={1} style={{width: 46}}>#</th>
                           
                           <th className='sorting' rowSpan={1} colSpan={1} style={{width: 270}}>Client</th>
                           
                           <th className='sorting' rowSpan={1} colSpan={1} style={{width: 73}}>Total</th>
                           
                           <th className='text-truncate sorting' rowSpan={1} colSpan={1} style={{width: 130}}>Issued Date</th>
                           
                           <th className='sorting' rowSpan={1} colSpan={1} style={{width: 98}}>Balance</th>
                           
                           <th className='cell-fit sorting_disabled' rowSpan={1} colSpan={1} style={{width: 80}}>Actions</th>
                        </tr>
                     </thead>

                     <tbody>
                     </tbody>
                  </table>
               </div>
               
               <Pagination />
            </div>
         </div>
      </div>
   );
}



export default ClientsList;