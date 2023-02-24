import PropTypes from 'prop-types';



// Components
import Icon from '../ui/Icon';



const FormWizardCardFooter = ({
   prevButtonText, prevButtonDisabled, prevButtonHandler,
   nextButtonText, nextButtonDisabled, nextButtonHandler
}) => {

   return (
      <div className='d-flex justify-content-between mt-3'>
         <button
            className='btn btn-outline-secondary btn-prev waves-effect'
            disabled={prevButtonDisabled}
            onClick={prevButtonHandler}
         >
            <Icon icon='ArrowLeft' size={14} className='align-middle me-sm-25 me-0' />
            
            <span className='align-middle d-sm-inline-block d-none'>{prevButtonText}</span>
         </button>

         <button
            className='btn btn-primary btn-next waves-effect waves-float waves-light'
            disabled={nextButtonDisabled}
            onClick={nextButtonHandler}
         >
            <span className='align-middle d-sm-inline-block d-none'>{nextButtonText}</span>

            <Icon icon='ArrowRight' size={14} className='align-middle ms-sm-25 ms-0' />
         </button>
      </div>
   );
}



FormWizardCardFooter.propTypes = {
   prevButtonText: PropTypes.string,
   prevButtonDisabled: PropTypes.bool,
   prevButtonHandler: PropTypes.func.isRequired,

   nextButtonText: PropTypes.string,
   nextButtonDisabled: PropTypes.bool,
   nextButtonHandler: PropTypes.func.isRequired,
}

FormWizardCardFooter.defaultProps = {
   prevButtonText: 'Anterior',
   prevButtonDisabled: false,

   nextButtonText: 'Siguiente',
   nextButtonDisabled: false,
}



export default FormWizardCardFooter;