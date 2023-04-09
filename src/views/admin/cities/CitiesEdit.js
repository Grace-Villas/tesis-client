import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setLoading, setCitiesError, setCity, startGetCity, startUpdateCity } from '../../../actions/cities';
import { setStatesList, startGetStatesList } from '../../../actions/states';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';
import Switch from '../../../components/form/Switch';



// Helpers
import { handleInvalidCurrency, handleInvalidName } from '../../../helpers/validations';



const CitiesEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { nameError, stateIdError, deliveryPriceError, loadingUpdate, loadingDetail, city } = useSelector(state => state.cities);

   const { statesList, loadingList: loadingStatesList } = useSelector(state => state.states);

   const [name, setName] = useState('');
   const [stateId, setStateId] = useState('');
   const [hasDeliveries, setHasDeliveries] = useState(true);
   const [deliveryPrice, setDeliveryPrice] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetCity(id));
   }, [dispatch, id]);

   useEffect(() => {
      setName(city?.name || '');
      setStateId(city?.stateId || '');
      setHasDeliveries(city?.hasDeliveries ?? true);
      setDeliveryPrice(city?.deliveryPrice ? `${city?.deliveryPrice}` : '');
   }, [city?.name, city?.stateId, city?.hasDeliveries, city?.deliveryPrice]);

   useEffect(() => {
      dispatch(startGetStatesList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/cities',
            text: 'Ciudades'
         },
         {
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setStateId('');
         
         dispatch(setCitiesError('name', null));
         dispatch(setCitiesError('stateId', null));

         dispatch(setCity(null));

         dispatch(setStatesList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   useEffect(() => {
      if (!hasDeliveries) {
         setDeliveryPrice('');
         dispatch(setCitiesError('deliveryPrice', null));
      }
   }, [hasDeliveries, dispatch]);

   const handleInvalidStateId = (stateId) => {
      if (stateId === '') {
         return 'El estado es obligatorio';
      } else {
         return null;
      }
   }

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setCitiesError('name', nameE));

      setName(value);
   }

   const handleStateId = (value) => {
      const stateIdE = handleInvalidStateId(value);
      dispatch(setCitiesError('stateId', stateIdE));

      setStateId(value);
   }

   const handleDeliveryPrice = (value) => {
      const deliverPriceE = handleInvalidCurrency(value, 'costo');
      dispatch(setCitiesError('deliveryPrice', deliverPriceE));

      setDeliveryPrice(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setCitiesError('name', nameE));

      const stateIdE = handleInvalidStateId(stateId);
      dispatch(setCitiesError('stateId', stateIdE));

      const deliveryPriceE = hasDeliveries ? handleInvalidCurrency(deliveryPrice) : null;
      dispatch(setCitiesError('deliveryPrice', deliveryPriceE));

      const validatedDeliveryPrice = hasDeliveries ? deliveryPrice : undefined;
      
      if (!nameE && !stateIdE && !deliveryPriceE) {
         dispatch(startUpdateCity(city.id, {name, stateId, hasDeliveries, deliveryPrice: validatedDeliveryPrice}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(city?.name);
      setStateId(city?.stateId);
      setHasDeliveries(city?.hasDeliveries);
      setDeliveryPrice(city?.deliveryPrice || '');
      
      dispatch(setCitiesError('name', null));
      dispatch(setCitiesError('stateId', null));
      dispatch(setCitiesError('deliveryPrice', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar ciudad'
                  id={city?.id}
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre de la ciudad'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Switch
                           name='list'
                           value={hasDeliveries}
                           setValue={() => setHasDeliveries(!hasDeliveries)}
                           title='¿Despachable?'
                           containerClass='col-md-2 col-5 mb-1 align-items-center'
                           wrapperClass='my-50'
                        />

                        <Input
                           value={deliveryPrice}
                           setValue={handleDeliveryPrice}
                           title={'Costo de despacho'}
                           placeholder='Ingrese el costo de despacho'
                           containerClass='col-md-4 col-7 mb-1'
                           error={deliveryPriceError}
                           disabled={!hasDeliveries}
                        />

                        <Select
                           value={stateId}
                           setValue={handleStateId}
                           title='Estado'
                           name='state'
                           placeholder='Seleccione un estado'
                           options={statesList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={stateIdError}
                           disabled={loadingStatesList}
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
                        to='/cities'
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



export default CitiesEdit;