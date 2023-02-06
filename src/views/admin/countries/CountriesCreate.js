import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setCountriesError, startCreateCountry } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Input from '../../../components/form/Input';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Section from '../../../components/ui/Section';
import Select from '../../../components/form/Select';



// Data
import locales from '../../../data/locales.json';



const CountriesCreate = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const { nameError, localeError, phoneExtensionError, loadingCreate } = useSelector(state => state.countries);

   const [name, setName] = useState('');
   const [phoneExtension, setPhoneExtension] = useState('');
   const [locale, setLocale] = useState('');

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/countries',
            text: 'Países'
         },
         {
            text: 'Crear'
         }
      ]));
   }, [dispatch]);

   useEffect(() => {
      return () => {
         setName('');
         setPhoneExtension('');
         setLocale('');
         
         dispatch(setCountriesError('name', null));
         dispatch(setCountriesError('locale', null));
         dispatch(setCountriesError('phoneExtension', null));
      }
   }, []);

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

   const handleInvalidLocale = (locale) => {
      if (locale === '') {
         return 'El código local es obligatorio';
      } else {
         return null;
      }
   }

   const handleInvalidPhoneExtension = (phoneExtension) => {
      if (phoneExtension.trim().length === 0) {
         return 'La extensión telefónica es obligatoria';
      } else if (!/^\+([0-9]+$)/.test(phoneExtension)) {
         return 'El formato es inválido. Ejemplo: +58'
      } else {
         return null;
      }
   }

   // Handlers
   const handleName = (value) => {
      const nameE = handleInvalidName(value);
      dispatch(setCountriesError('name', nameE));

      setName(value);
   }

   const handleLocale = (value) => {
      const localeE = handleInvalidLocale(value);
      dispatch(setCountriesError('locale', localeE));

      setLocale(value);
   }

   const handlePhoneExtension = (value) => {
      const phoneExtensionE = handleInvalidPhoneExtension(value);
      dispatch(setCountriesError('phoneExtension', phoneExtensionE));

      setPhoneExtension(value);
   }

   // Submit
   const handleSubmit = (e) => {
      e.preventDefault();

      const nameE = handleInvalidName(name);
      dispatch(setCountriesError('name', nameE));

      const localeE = handleInvalidLocale(locale);
      dispatch(setCountriesError('locale', localeE));

      const phoneExtensionE = handleInvalidPhoneExtension(phoneExtension);
      dispatch(setCountriesError('phoneExtension', phoneExtensionE));

      if (!nameE && !localeE && !phoneExtensionE) {
         dispatch(startCreateCountry({name, locale, phoneExtension}, navigate));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName('');
      setPhoneExtension('');
      setLocale('');
   }

   return (
      <>
         <Section>
            <form className='row' onSubmit={handleSubmit}>
               <div className='col-12 pb-1 mb-1 border-bottom'>
                  <h4 className='mb-0 fw-bolder'>Nuevo país</h4>
               </div>

               <Input
                  value={name}
                  setValue={handleName}
                  title={'Nombre'}
                  placeholder='Ingrese el nombre del país'
                  containerClass='col-md-4 col-12 mb-1'
                  error={nameError}
               />

               <Select
                  value={locale}
                  setValue={handleLocale}
                  title='Código local'
                  placeholder='Seleccione un código'
                  options={locales.map(loc => ({ value: loc, text: loc}))}
                  containerClass='col-md-4 col-12 mb-1'
                  error={localeError}
               />

               <Input
                  value={phoneExtension}
                  setValue={handlePhoneExtension}
                  title={'Extensión telefónica'}
                  placeholder='Ingrese la extensión telefónica. Ejemplo: +58'
                  containerClass='col-md-4 col-12 mb-1'
                  error={phoneExtensionError}
               />

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
            </form>
         </Section>

         <LoadingResponse state={loadingCreate} />
      </>
   );
}



export default CountriesCreate;