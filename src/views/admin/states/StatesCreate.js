import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setStatesError, startCreateState } from '../../../actions/states';
import { startGetCountriesList, setCountriesList } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
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
      } else if (!/^[a-zA-Z]+$/.test(name)) {
         return 'El nombre debe contener solo letras'
      } else {
         return null;
      }
   }

   const handleInvalidCountryId = (locale) => {
      if (locale === '') {
         return 'El código local es obligatorio';
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
      const localeE = handleInvalidCountryId(value);
      dispatch(setStatesError('countryId', localeE));

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
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12'>
               <form
                  className='card invoice-preview-card mb-2'
                  onSubmit={handleSubmit}
               >
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Nuevo estado</h4>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding py-0'>
                     <div className='row'>
                        <Input
                           value={name}
                           setValue={handleName}
                           title={'Nombre'}
                           placeholder='Ingrese el nombre del país'
                           containerClass='col-md-4 col-12 mb-1'
                           error={nameError}
                        />

                        <Select
                           value={countryId}
                           setValue={handleCountryId}
                           title='País'
                           placeholder='Seleccione un país'
                           options={countriesList}
                           containerClass='col-md-4 col-12 mb-1'
                           error={countryIdError}
                           disabled={loadingCountriesList}
                        />
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                           <button
                              type='reset'
                              className='btn btn-outline-secondary waves-effect'
                              onClick={handleDiscard}
                           >Descartar</button>

                           <button
                              type='submit'
                              className='btn btn-primary waves-effect waves-float waves-light'
                           >Guardar</button>
                        </div>
                     </div>
                  </div>
               </form>
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