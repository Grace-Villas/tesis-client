import { useEffect, useState } from 'react';



// Components
import FormWizard from '../../components/form-wizard/FormWizard';
import InstallationStep1 from '../../components/installation/InstallationStep1';
import InstallationStep2 from '../../components/installation/InstallationStep2';
import InstallationStep3 from '../../components/installation/InstallationStep3';
import InstallationStep4 from '../../components/installation/InstallationStep4';



// Custom hooks
import { useInstalled } from '../../hooks/useInstalled';



const Installation = () => {

   const [currentStep, setCurrentStep] = useState(1);

   useInstalled(false);

   useEffect(() => {
      return () => {
         setCurrentStep(1);
      }
   }, []);

   const header = [
      {
         id: 1,
         icon: 'Home',
         title: 'Bienvenida',
         subtitle: 'Introducción'
      },
      {
         id: 2,
         icon: 'HelpCircle',
         title: 'Información',
         subtitle: 'Datos adicionales'
      },
      {
         id: 3,
         icon: 'Briefcase',
         title: 'Empresa',
         subtitle: 'Registro de empresa'
      },
      {
         id: 4,
         icon: 'UserPlus',
         title: 'Usuario principal',
         subtitle: 'Registro de usuario'
      }
   ];

   return (
      <div className='container-fluid pt-lg-2 installation'>
         <div className='row'>
            <div className='col-md-8 mx-auto'>
               <FormWizard
                  headerSteps={header}
                  currentStep={currentStep}
               >
                  <InstallationStep1
                     currentStep={currentStep}
                     headerProps={{title: 'Proceso de instalación', subtitle: 'Bienvenida al sistema'}}
                     footerProps={{prevButtonDisabled: true, prevButtonHandler: () => null, nextButtonHandler: () => setCurrentStep(2)}}
                  />

                  <InstallationStep2
                     currentStep={currentStep}
                     headerProps={{title: 'Proceso de instalación', subtitle: 'Información adicional'}}
                     footerProps={{prevButtonHandler: () => setCurrentStep(1), nextButtonHandler: () => setCurrentStep(3)}}
                  />

                  <InstallationStep3
                     currentStep={currentStep}
                     headerProps={{title: 'Proceso de instalación', subtitle: 'Registro de datos de empresa'}}
                     footerProps={{prevButtonHandler: () => setCurrentStep(2), nextButtonHandler: () => setCurrentStep(4)}}
                  />

                  <InstallationStep4
                     currentStep={currentStep}
                     headerProps={{title: 'Proceso de instalación', subtitle: 'Registro de usuario principal'}}
                     footerProps={{prevButtonHandler: () => setCurrentStep(3), nextButtonText: 'Guardar', nextButtonHandler: setCurrentStep}}
                  />
               </FormWizard>
            </div>
         </div>
      </div>
   );
}



export default Installation;