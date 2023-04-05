import { useDispatch, useSelector } from 'react-redux';
import { isMobilePhone } from 'validator';



// Actions
import { setInstallationError, setInstallationValue } from '../../actions/installation';



// Components
import FormWizardCard from '../form-wizard/FormWizardCard';
import Input from '../form/Input';



// Helpers
import { handleInvalidCurrency, handleInvalidEmail, handleInvalidName, handleRequired } from '../../helpers/validations';



const InstallationStep3 = ({currentStep, headerProps, footerProps}) => {

   const dispatch = useDispatch();
   
   const {
      companyName, companyEmail, companyContactEmail, companyPhone,
      palletDay,
      state, city, deliveryPrice, address,

      companyNameError, companyEmailError, companyContactEmailError, companyPhoneError,
      palletDayError,
      stateError, cityError, deliveryPriceError, addressError
   } = useSelector(state => state.installation);

   // Errors

   const handleInvalidPhone = (phone) => {
      if (phone.length === 0) {
         return 'El teléfono es obligatorio';
      } else if (!isMobilePhone(`+58${phone}`, 'es-VE')) {
         return 'El teléfono es inválido';
      } else {
         return null;
      }
   }

   // Handlers

   const handleCompanyName = (value) => {
      const error = handleRequired(value, 'El nombre es obligatorio');
      dispatch(setInstallationError('companyName', error));

      dispatch(setInstallationValue('companyName', value));
   }

   const handleCompanyEmail = (value) => {
      const error = handleInvalidEmail(value);
      dispatch(setInstallationError('companyEmail', error));

      dispatch(setInstallationValue('companyEmail', value));
   }

   const handleCompanyContactEmail = (value) => {
      const error = handleInvalidEmail(value);
      dispatch(setInstallationError('companyContactEmail', error));
      
      dispatch(setInstallationValue('companyContactEmail', value));
   }

   const handleCompanyPhone = (value) => {
      if (!/^[0-9]*$/.test(value)) return

      const error = handleInvalidPhone(value);
      dispatch(setInstallationError('companyPhone', error));
      
      dispatch(setInstallationValue('companyPhone', value));
   }

   const handlePalletDay = (value) => {
      const error = handleInvalidCurrency(value);
      dispatch(setInstallationError('palletDay', error));
      
      dispatch(setInstallationValue('palletDay', value));
   }

   const handleState = (value) => {
      const error = handleInvalidName(value, 'estado');
      dispatch(setInstallationError('state', error));
      
      dispatch(setInstallationValue('state', value));
   }

   const handleCity = (value) => {
      const error = handleInvalidName(value, 'campo ciudad');
      dispatch(setInstallationError('city', error));
      
      dispatch(setInstallationValue('city', value));
   }

   const handleDeliveryPrice = (value) => {
      const error = handleInvalidCurrency(value);
      dispatch(setInstallationError('deliveryPrice', error));
      
      dispatch(setInstallationValue('deliveryPrice', value));
   }

   const handleAddress = (value) => {
      const error = handleRequired(value, 'La dirección es obligatoria');
      dispatch(setInstallationError('address', error));
      
      dispatch(setInstallationValue('address', value));
   }

   // Submit

   const handleNextStep = () => {
      const nameE = handleRequired(companyName, 'El nombre es obligatorio');
      dispatch(setInstallationError('companyName', nameE));
      
      const emailE = handleInvalidEmail(companyEmail);
      dispatch(setInstallationError('companyEmail', emailE));
      
      const contactE = handleInvalidEmail(companyContactEmail);
      dispatch(setInstallationError('companyContactEmail', contactE));
      
      const phoneE = handleInvalidPhone(companyPhone);
      dispatch(setInstallationError('companyPhone', phoneE));

      const palletE = handleInvalidCurrency(palletDay);
      dispatch(setInstallationError('palletDay', palletE));
      
      const stateE = handleInvalidName(state, 'estado');
      dispatch(setInstallationError('state', stateE));
      
      const cityE = handleInvalidName(city, 'ciudad');
      dispatch(setInstallationError('city', cityE));

      const deliverPriceE = handleInvalidCurrency(deliveryPrice);
      dispatch(setInstallationError('deliveryPrice', deliverPriceE));
      
      const addressE = handleRequired(address, 'La dirección es obligatoria');
      dispatch(setInstallationError('address', addressE));

      if (!nameE && !emailE && !contactE && !phoneE && !palletE && !stateE && !cityE && !deliverPriceE && !addressE) {
         footerProps.nextButtonHandler();
      }
   }

   return (
      <FormWizardCard
         step={3}
         currentStep={currentStep}
         headerProps={headerProps}
         footerProps={{...footerProps, nextButtonHandler: handleNextStep}}
      >
         <div className='row'>
            <Input
               value={companyName}
               setValue={handleCompanyName}
               title={'Nombre de la compañía'}
               placeholder='Nombre de la compañía'
               containerClass='col-md-8 col-12 mb-1'
               error={companyNameError}
            />

            <Input
               value={palletDay}
               setValue={handlePalletDay}
               title={'Precio de paleta por día (En dólares)'}
               placeholder='Precio de paleta por día'
               containerClass='col-md-4 col-12 mb-1'
               error={palletDayError}
            />

            <div className='col-12'>
               <hr />
            </div>

            <Input
               value={companyPhone}
               setValue={handleCompanyPhone}
               title={'Teléfono de contacto'}
               placeholder='Teléfono de la compañía'
               containerClass='col-md-4 col-12 mb-1'
               error={companyPhoneError}
            />
            
            <Input
               value={companyEmail}
               setValue={handleCompanyEmail}
               title={'Correo de la compañía'}
               placeholder='Correo de la compañía'
               containerClass='col-md-4 col-12 mb-1'
               error={companyEmailError}
            />

            <Input
               value={companyContactEmail}
               setValue={handleCompanyContactEmail}
               title={'Correo de contacto de la compañía'}
               placeholder='Correo de la compañía'
               containerClass='col-md-4 col-12 mb-1'
               error={companyContactEmailError}
            />

            <div className='col-12'>
               <hr />
            </div>

            <Input
               value={state}
               setValue={handleState}
               title={'Estado'}
               placeholder='Ingrese el estado donde se ubica la compañía'
               containerClass='col-md-4 col-12 mb-1'
               error={stateError}
            />

            <Input
               value={city}
               setValue={handleCity}
               title={'Ciudad'}
               placeholder='Ingrese la ciudad donde se ubica la compañía'
               containerClass='col-md-4 col-12 mb-1'
               error={cityError}
            />

            <Input
               value={deliveryPrice}
               setValue={handleDeliveryPrice}
               title={'Precio de despacho (En dólares)'}
               placeholder='Ingrese el precio de despacho'
               containerClass='col-md-4 col-12 mb-1'
               error={deliveryPriceError}
            />

            <Input
               value={address}
               setValue={handleAddress}
               title={'Dirección'}
               placeholder='Ingrese la dirección de la compañía'
               containerClass='col-12 mb-1'
               error={addressError}
            />
         </div>
      </FormWizardCard>
   );
}



export default InstallationStep3;