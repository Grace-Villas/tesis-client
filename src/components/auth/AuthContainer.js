import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const AuthContainer = ({children}) => {

   return (
      <div className='blank-page'>
         <div className='app-content content'>
            <div className='content-wrapper'>
               <div className='content-body'>
                  <div className='row py-2' style={{minHeight: '100vh'}}>
                     <div className='col-lg-4 px-2 px-lg-0 mx-lg-auto d-flex flex-column justify-content-center'>
                        <div className='card mb-0'>
                           <div className='card-body'>
                              <Link
                                 className='brand-logo d-flex justify-content-center mb-1'
                                 to='/'
                              >
                                 <img
                                    src={process.env.PUBLIC_URL + '/images/logos/logo-large.png'}
                                    alt='large logo'
                                    className='w-md-50'
                                 />
                              </Link>

                              {children}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}



AuthContainer.propTypes = {
   children: PropTypes.node
}



export default AuthContainer;