import PropTypes from 'prop-types';



const FormWizardCardHeader = ({title, subtitle}) => {

   return (
      <div className='content-header mb-3'>
         <h5 className='mb-0'>{title}</h5>

         <small className='text-muted'>{subtitle}</small>
      </div>
   );
}



FormWizardCardHeader.propTypes = {
   title: PropTypes.string.isRequired,
   subtitle: PropTypes.string
}

FormWizardCardHeader.defaultProps = {
   subtitle: null
}



export default FormWizardCardHeader;