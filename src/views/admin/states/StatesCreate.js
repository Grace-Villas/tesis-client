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



// Helpers
import { handleInvalidName } from '../../../helpers/validations';
import { usePermission } from '../../../hooks/usePermission';



const StatesCreate = () => {

   usePermission({section: 'states', permission: 'create', onlyAdmin: true});

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { nameError, loadingCreate } = useSelector(state => state.states);

   const { countriesList, loadingList: loadingCountriesList } = useSelector(state => state.countries);

   const [name, setName] = useState('');

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
         
         dispatch(setStatesError('name', null));
         dispatch(setStatesError('countryId', null));

         dispatch(setCountriesList([]));
         
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setStatesError('name', nameE));

      setName(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setStatesError('name', nameE));

      const country = countriesList[0];

      if (!nameE) {
         dispatch(startCreateState({name, countryId: country.value}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      
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
                           containerClass='col-md-12 col-12 mb-1'
                           error={nameError}
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

         <LoadingResponse state={loadingCreate || loadingCountriesList} />
      </>
   );
}



export default StatesCreate;