import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setLoading, setState, setStatesError, startGetState, startUpdateState } from '../../../actions/states';
import { setCountriesList, startGetCountriesList } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';



// Helpers
import { handleInvalidName } from '../../../helpers/validations';
import { usePermission } from '../../../hooks/usePermission';



const StatesEdit = () => {

   usePermission({section: 'states', permission: 'edit', onlyAdmin: true});
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { nameError, countryIdError, loadingUpdate, loadingDetail, state } = useSelector(state => state.states);

   const { countriesList, loadingList: loadingCountriesList } = useSelector(state => state.countries);

   const [name, setName] = useState('');
   const [countryId, setCountryId] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetState(id));
   }, [dispatch, id]);

   useEffect(() => {
      setName(state?.name || '');
      setCountryId(state?.countryId || '');
   }, [state?.name, state?.countryId]);

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
            text: 'Editar'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setCountryId('');
         
         dispatch(setStatesError('name', null));
         dispatch(setStatesError('countryId', null));

         dispatch(setState(null));
         
         dispatch(setBreadcrumb([]));

         dispatch(setCountriesList([]));
      }
   }, [dispatch]);

   // Errors and valids
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
         dispatch(startUpdateState(state.id, {name, countryId}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(state?.name);
      setCountryId(state?.countryId);
      
      dispatch(setStatesError('name', null));
      dispatch(setStatesError('countryId', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <Form
                  title='Editar estado'
                  id={state?.id}
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

               <LoadingComponent state={loadingDetail} isBlocking />
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

         <LoadingResponse state={loadingUpdate} />
      </>
   );
}



export default StatesEdit;