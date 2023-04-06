import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const CreateButton = ({link, className}) => {

   return (
      <div className={`col-6 col-lg-2 ${className}`}>
         <div className='dt-action-buttons text-xl-end text-lg-start text-lg-end text-start'>
            <div className='dt-buttons d-flex justify-content-lg-center m-0'>
               <Link
                  to={link}
                  className='dt-button btn btn-primary btn-add-record m-0 ms-auto ms-lg-0'
               >
                  <span>Nuevo</span>
               </Link>
            </div>
         </div>
      </div>
   );
}



CreateButton.propTypes = {
   link: PropTypes.string.isRequired,
   className: PropTypes.string
}

CreateButton.defaultProps = {
   className: ''
}



export default CreateButton;