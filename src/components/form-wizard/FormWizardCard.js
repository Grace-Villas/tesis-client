import PropTypes from 'prop-types';




// Components
import FormWizardCardFooter from './FormWizardCardFooter';
import FormWizardCardHeader from './FormWizardCardHeader';



const FormWizardCard = ({children, step, currentStep, headerProps, footerProps}) => {
   
   return (
      <div className={`content h-100 ${step === currentStep && 'active dstepper-block'}`}>
         <FormWizardCardHeader {...headerProps} />

         {children}

         <FormWizardCardFooter {...footerProps} />
      </div>
   );
}



FormWizardCard.propTypes = {
   children: PropTypes.node,
   step: PropTypes.number.isRequired,
   currentStep: PropTypes.number.isRequired
}



export default FormWizardCard;