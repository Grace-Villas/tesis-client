


// Components
import FormWizardCard from '../form-wizard/FormWizardCard';
import Icon from '../ui/Icon';



const InstallationStep2 = ({currentStep, headerProps, footerProps}) => {

   return (
      <FormWizardCard
         step={2}
         currentStep={currentStep}
         headerProps={headerProps}
         footerProps={footerProps}
      >
         <div>
            <p className='fs-5'>Este sistema fue planteado como trabajo especial de grado para la universidad Rafael Belloso Chacín (URBE) bajo el título de "<b className='text-primary'>Aplicación informática bajo ambiente web para la automatización de los procesos en una empresa de gestión logística</b>".</p>

            <p className='fs-5 mb-0'>Desarrollado por:</p>

            <ul>
               <li>Espina Romero, Samir Yasser.</li>
               <li>Pineda Gamboa, Mario José de Jesús.</li>
               <li>Villasmil Delgado, Elizabeth Grace.</li>
            </ul>

            <p className='fs-5 mb-25'>Para asistencia técnica comunicarse a través los medios:</p>

            <div className='d-flex gap-50 align-items-center ms-50 mb-25'>
               <Icon icon='Phone' className='font-medium-3' />

               <p className='fs-5 mb-0'>+58 414-7566524</p>
            </div>

            <div className='d-flex gap-50 align-items-center ms-50 mb-25'>
               <Icon icon='Phone' className='font-medium-3' />

               <p className='fs-5 mb-0'>+58 424-2956982</p>
            </div>

            <div className='d-flex gap-50 align-items-center ms-50 mb-25'>
               <Icon icon='Mail' className='font-medium-3' />

               <p className='fs-5 mb-0'>support@logisticschain.com</p>
            </div>
         </div>
      </FormWizardCard>
   );
}



export default InstallationStep2;