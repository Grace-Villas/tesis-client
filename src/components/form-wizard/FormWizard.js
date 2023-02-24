import PropTypes from 'prop-types';



// Coponents
import FormWizardHeader from './FormWizardHeader';



const FormWizard = ({children, headerSteps, currentStep, isVertical}) => {

   return (
      <section className={!isVertical ? 'modern-horizontal-wizard' : 'modern-horizontal-wizard'}>
         <div className={`bs-stepper wizard-modern ${isVertical && 'vertical'}`}>
            <FormWizardHeader
               steps={headerSteps}
               currentStep={currentStep}
            />
                  
            <div className='bs-stepper-content position-relative'>
               {children}
            </div>
         </div>
      </section>
   );
}



FormWizard.propTypes = {
   children: PropTypes.node,
   headerSteps: PropTypes.array.isRequired,
   currentStep: PropTypes.number.isRequired,
   isVertical: PropTypes.bool
}

FormWizard.defaultProps = {
   isVertical: false
}



export default FormWizard;