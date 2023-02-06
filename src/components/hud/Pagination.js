


// Custom hooks
import { usePagination } from '../../hooks/usePagination';



const Pagination = ({pages, count, perPage, loading}) => {

   const { pageNumbers, active, leftHolder, rightHolder, handleActive, handlePage } = usePagination(pages);

   if (loading) {
      return (<></>);
   }

   return (
      <div className='d-flex justify-content-between mx-2 row'>
         <div className='col-sm-12 col-md-6'>
            <div
               className='dataTables_info text-center text-md-start'
            >Mostrando desde {((active - 1) * perPage) + 1} a {(active * perPage) < count ? active * perPage : count} de {count} registros</div>
         </div>

         <div className='col-sm-12 col-md-6 mt-1 mt-md-0'>
            <div className='d-flex justify-content-center justify-content-md-end'>
               <ul className='pagination mb-2 mt-1'>
                  <li className={`page-item ${active === 1 && 'disabled'}`}>
                     <button
                        className='page-link'
                        disabled={active === 1}
                        onClick={() => handlePage(1)}
                     >«</button>
                  </li>

                  <li className={`page-item prev ${active === 1 && 'disabled'}`}>
                     <button
                        className='page-link'
                        disabled={active === 1}
                        onClick={() => handlePage(active - 1)}
                     ></button>
                  </li>

                  {
                     leftHolder && (
                        <li className='page-item disabled'>
                           <button
                              type='button'
                              className='page-link'
                           >...</button>
                        </li>
                     )
                  }

                  {
                     pageNumbers.map(page => (
                        <li
                           key={'page-' + page}
                           className={handleActive(page, 'page-item', 'active')}
                        >
                           <button
                              type='button'
                              className='page-link'
                              onClick={() => handlePage(page)}
                              disabled={page === active}
                           >{page}</button>
                        </li>
                     ))
                  }

                  {
                     rightHolder && (
                        <li className='page-item disabled'>
                           <button
                              type='button'
                              className='page-link'
                           >...</button>
                        </li>
                     )
                  }

                  <li className={`page-item next ${active === pages && 'disabled'}`}>
                     <button
                        className='page-link'
                        disabled={active === pages}
                        onClick={() => handlePage(active + 1)}
                     ></button>
                  </li>

                  <li className={`page-item ${active === pages && 'disabled'}`}>
                     <button
                        className='page-link'
                        disabled={active === pages}
                        onClick={() => handlePage(pages)}
                     >»</button>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}



export default Pagination;