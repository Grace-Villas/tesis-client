import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setStatesError, startCreateState } from '../../../actions/states';
import { startGetCountriesList, setCountriesList } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';



const StatesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { nameError, countryIdError, loadingCreate } = useSelector(state => state.states);

   const { countriesList, loadingList: loadingCountriesList } = useSelector(state => state.countries);

   const [name, setName] = useState('');
   const [countryId, setCountryId] = useState('');

   useEffect(() => {
      dispatch(startGetCountriesList());
   }, [dispatch]);

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/states',
            text: 'Estados'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setCountryId('');
         
         dispatch(setStatesError('name', null));
         dispatch(setStatesError('countryId', null));

         dispatch(setCountriesList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Errors and valids
   const handleInvalidName = (name) => {
      if (name.trim().length === 0) {
         return 'El nombre es obligatorio';
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(name)) {
         return 'El nombre debe contener solo letras'
      } else {
         return null;
      }
   }

   const handleInvalidCountryId = (countryId) => {
      if (countryId === '') {
         return 'El país es obligatorio';
      } else {
         return null;
      }
   }

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setStatesError('name', nameE));

      setName(value);
   }

   const handleCountryId = (value) => {
      const countryIdE = handleInvalidCountryId(value);
      dispatch(setStatesError('countryId', countryIdE));

      setCountryId(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setStatesError('name', nameE));

      const countryIdE = handleInvalidCountryId(countryId);
      dispatch(setStatesError('countryId', countryIdE));

      if (!nameE && !countryIdE) {
         dispatch(startCreateState({name, countryId}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      setCountryId('');
      
      dispatch(setStatesError('name', null));
      dispatch(setStatesError('countryId', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <Form
                  title='Crear estado'
                  handleSubmit={handleSubmit}
                  handleDiscard={handleDiscard}
               >
                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del estado'
                           containerClass='col-md-6 col-12 mb-1'
                           error={nameError}
                        />

                        <Select
                           value={countryId}
                           setValue={handleCountryId}
                           title='País'
                           name='country'
                           placeholder='Seleccione un país'
                           options={countriesList}
                           containerClass='col-md-6 col-12 mb-1'
                           error={countryIdError}
                           disabled={loadingCountriesList}
                        />
                     </div>
                  </div>
               </Form>
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/states'
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



export default StatesCreate;