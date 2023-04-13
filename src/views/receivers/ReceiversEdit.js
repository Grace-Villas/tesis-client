import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setLoading, setReceiver, setReceiversError, startGetReceiver, startUpdateReceiver } from '../../actions/receivers';
import { setCitiesList, startGetCitiesList } from '../../actions/cities';
import { setBreadcrumb } from '../../actions/ui';



// Components
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import TextArea from '../../components/form/TextArea';
import Select from '../../components/form/Select';



// Helpers
import { handleRequired, handleInvalidPhone, handleInvalidRut } from '../../helpers/validations';
import { usePermission } from '../../hooks/usePermission';
import InputPhone from '../../components/form/InputPhone';



const ReceiversEdit = () => {

   usePermission({section: 'receivers', permission: 'edit', onlyClient: true});
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const {
      cityIdError, nameError, rutError, addressError, phoneError,
      loadingUpdate, loadingDetail, receiver
   } = useSelector(state => state.receivers);

   const { citiesList, loadingList: loadingCitiesList } = useSelector(state => state.cities);

   const [cityId, setCityId] = useState('');
   const [name, setName] = useState('');
   const [rut, setRut] = useState('');
   const [address, setAddress] = useState('');
   const [phone, setPhone] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetReceiver(id));
   }, [dispatch, id]);

   useEffect(() => {
      dispatch(startGetCitiesList({hasDeliveries: 1}));
   }, [dispatch]);

   useEffect(() => {
      setCityId(`${receiver?.cityId}` || '');
      setName(receiver?.name || '');
      setRut(receiver?.rut || '');
      setAddress(receiver?.address || '');
      setPhone(receiver?.phone || '');
   }, [receiver?.cityId, receiver?.name, receiver?.rut, receiver?.address, receiver?.phone]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/receivers',
            text: 'Productos'
         },
         {
            text: 'Editar'
         }
      ]));
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

         dispatch(setReceiver(null));
         
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
         dispatch(startUpdateReceiver(receiver.id, {cityId, name, rut, address, phone}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setCityId(`${receiver?.cityId}` || '');
      setName(receiver?.name);
      setRut(receiver?.rut);
      setAddress(receiver?.address);
      setPhone(receiver?.phone);
         
      dispatch(setReceiversError('cityId', null));
      dispatch(setReceiversError('name', null));
      dispatch(setReceiversError('rut', null));
      dispatch(setReceiversError('address', null));
      dispatch(setReceiversError('phone', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar destinatario'
                  id={receiver?.id}
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

                        <InputPhone
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

               <LoadingComponent state={loadingDetail} isBlocking />
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

         <LoadingResponse state={loadingUpdate} />
      </>
   );
}



export default ReceiversEdit;