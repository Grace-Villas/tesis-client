import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setReceiversError, startCreateReceiver } from '../../actions/receivers';
import { setCitiesList, startGetCitiesList } from '../../actions/cities';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';



// Helpers
import { handleRequired, handleInvalidRut, handleInvalidPhone } from '../../helpers/validations';



const ReceiversCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { cityIdError, nameError, rutError, addressError, phoneError, loadingCreate } = useSelector(state => state.receivers);

   const { citiesList, loadingList: loadingCitiesList } = useSelector(state => state.cities);

   const [cityId, setCityId] = useState('');
   const [name, setName] = useState('');
   const [rut, setRut] = useState('');
   const [address, setAddress] = useState('');
   const [phone, setPhone] = useState('');

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/products',
            text: 'Productos'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      dispatch(startGetCitiesList({hasDeliveries: 1}));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setCityId('');
         setName('');
         setRut('');
         setAddress('');
         setPhone('');
         
         dispatch(setReceiversError('cityId', null));
         dispatch(setReceiversError('name', null));
         dispatch(setReceiversError('rut', null));
         dispatch(setReceiversError('address', null));
         dispatch(setReceiversError('phone', null));
         
         dispatch(setBreadcrumb([]));

         dispatch(setCitiesList([]));
      }
   }, [dispatch]);

   // Handlers
   const handleCityId = (value) => {
      const cityIdE = handleRequired(value, 'La ciudad es obligatoria');
      dispatch(setReceiversError('cityId', cityIdE));

      setCityId(value);
   }
   
   const handleName = (value) => {
      const nameE = handleRequired(value, 'El nombre es obligatoria');
      dispatch(setReceiversError('name', nameE));

      setName(value);
   }
   
   const handleRut = (value) => {
      const rutE = handleInvalidRut(value);
      dispatch(setReceiversError('rut', rutE));

      setRut(value);
   }
   
   const handleAddress = (value) => {
      const addressE = handleRequired(value, 'La dirección es obligatoria');
      dispatch(setReceiversError('address', addressE));

      setAddress(value);
   }
   
   const handlePhone = (value) => {
      const phoneE = handleInvalidPhone(value);
      dispatch(setReceiversError('phone', phoneE));

      setPhone(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const cityIdE = handleRequired(cityId, 'La ciudad es obligatoria');
      dispatch(setReceiversError('cityId', cityIdE));

      const nameE = handleRequired(name, 'El nombre es obligatoria');
      dispatch(setReceiversError('name', nameE));

      const rutE = handleInvalidRut(rut);
      dispatch(setReceiversError('rut', rutE));

      const addressE = handleRequired(address, 'La dirección es obligatoria');
      dispatch(setReceiversError('address', addressE));

      const phoneE = handleInvalidPhone(phone);
      dispatch(setReceiversError('phone', phoneE));

      if (!cityIdE && !nameE && !rutE && !addressE && !phoneE) {
         dispatch(startCreateReceiver({cityId, name, rut, address, phone}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setCityId('');
      setName('');
      setRut('');
      setAddress('');
      setPhone('');
      
      dispatch(setReceiversError('cityId', null));
      dispatch(setReceiversError('name', null));
      dispatch(setReceiversError('rut', null));
      dispatch(setReceiversError('address', null));
      dispatch(setReceiversError('phone', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Crear destinatario'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del destinatario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Input
                           value={rut}
                           setValue={handleRut}
                           title={'Identificación'}
                           placeholder='Ingrese la identificación del destinatario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={rutError}
                        />

                        <Input
                           value={phone}
                           setValue={handlePhone}
                           title={'Teléfono'}
                           placeholder='Ingrese el teléfono del destinatario'
                           containerClass='col-md-6 col-12 mb-1'
                           error={phoneError}
                        />

                        <Select
                           value={cityId}
                           setValue={handleCityId}
                           title='Ciudad'
                           name='city'
                           placeholder='Seleccione una ciudad'
                           options={citiesList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={cityIdError}
                           disabled={loadingCitiesList}
                        />

                        <TextArea
                           value={address}
                           setValue={handleAddress}
                           title={'Dirección'}
                           placeholder='Ingrese la dirección del destinatario'
                           containerClass='col-12 mb-1'
                           error={addressError}
                        />
                     </div>
                  </div>
               </Form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/receivers'
                        className='btn btn-outline-secondary w-100 waves-effect waves-float waves-light'
                     >Volver a listado</Link>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingCreate} />
      </>
   );
}



export default ReceiversCreate;