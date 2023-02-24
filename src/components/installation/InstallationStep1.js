


// Components
import FormWizardCard from '../form-wizard/FormWizardCard';



const InstallationStep1 = ({currentStep, headerProps, footerProps}) => {

   return (
      <FormWizardCard
         step={1}
         currentStep={currentStep}
         headerProps={headerProps}
         footerProps={footerProps}
      >
         <div>
            <h3 className='text-center mb-2'>¡Bienvenido a <span className='text-primary'>LogisticsChain</span>!</h3>

            <p className='fs-5'><b className='text-primary'>LC</b> es un sistema que le permitirá a tu empresa automatizar y gestionar los procesos basados en información referentes a la gestión logística, desde la perspectiva de la empresa y desde la del cliente.</p>

            <p className='fs-5'>Facilitando el acceso a la información almacenada por la organización. Envíos programados, clientes y sus cuentas por cobrar.</p>

            <p className='fs-5'>Acortando la distancia entre el cliente y sus productos. Stock, despachos, envíos, cuentas por pagar, todo al alcance de un click.</p>
         </div>
      </FormWizardCard>
   );
}



export default InstallationStep1;