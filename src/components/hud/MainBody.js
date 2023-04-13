


// Components
import BreadCrumbs from './BreadCrumb';



const MainBody = ({children}) => {

   return (
      <div className='app-content content pb-3'>
         <div className='header-navbar-shadow' />
      
         <div className='content-wrapper container-xxl p-0'>
            <BreadCrumbs />

            <div className='content-body position-relative'>
               {children}
            </div>
         </div>
      </div>
   )
}



export default MainBody;