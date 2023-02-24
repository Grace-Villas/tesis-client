import React from 'react';
import PropTypes from 'prop-types';



// Components
import Icon from '../ui/Icon';



const FormWizardHeader = ({steps, currentStep, isVertical}) => {

   return (
      <div className={`bs-stepper-header ${!isVertical && 'justify-content-center'}`}>
         {
            steps.map((step, i) => (
               <React.Fragment key={'wizard-step-' + step.id}>
                  <div className={`step ${step.id === currentStep && 'active'}`}>
                     <button type='button' className='step-trigger'>
                        <span className='bs-stepper-box'>
                           <Icon icon={step.icon} size={14} className='font-medium-3' />
                        </span>

                        <span className='bs-stepper-label'>
                           <span className='bs-stepper-title'>{step.title}</span>

                           <span className='bs-stepper-subtitle'>{step.subtitle}</span>
                        </span>
                     </button>
                  </div>

                  {
                     i !== (steps.length - 1) && (
                        <div className='line'>
                           <Icon icon='ChevronRight' size={14} className='font-medium-2' />
                        </div>
                     )
                  }
               </React.Fragment>
            ))
         }
      </div>
   );
}



FormWizardHeader.propTypes = {
   steps: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         icon: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
         subtitle: PropTypes.string.isRequired
      }).isRequired
   ).isRequired,
   currentStep: PropTypes.number.isRequired,
   isVertical: PropTypes.bool
}

FormWizardHeader.defaultProps = {
   isVertical: false
}



export default FormWizardHeader;