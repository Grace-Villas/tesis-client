import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const BreadCrumbs = () => {
   
   const { breadcrumb } = useSelector(state => state.ui);

   const [current, setCurrent] = useState('');

   useEffect(() => {
      setCurrent(breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].text : '');
   }, [breadcrumb]);

   return (
      <div className='content-header d-flex flex-row flex-content-between'>
         <div className='col-12'>
            <h2 className='content-header-title float-start mb-0'>{current.toLocaleUpperCase()}</h2>

            <div className='breadcrumb-wrapper'>
               <ol className='breadcrumb'>
                  {
                     breadcrumb.map((bread, i) => {
                        if (i === breadcrumb.length - 1) {
                           return
                        }

                        return (
                           <li
                              key={'breadbrum-' + bread.link}
                              className='breadcrumb-item'
                           >
                              <Link to={bread.link}>{bread.text}</Link>
                           </li>
                        )
                     })
                  }

                  <li className='breadcrumb-item active'>
                     {current}
                  </li>
               </ol>
            </div>
         </div>
      </div>
   );
}



export default BreadCrumbs;