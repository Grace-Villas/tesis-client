import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setCountriesError, setCountry, setLoading, startGetCountry, startUpdateCountry } from '../../../actions/countries';
import { setBreadcrumb } from '../../../actions/ui';



// Components
import Input from '../../../components/form/Input';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import Select from '../../../components/form/Select';



// Data
import locales from '../../../data/locales.json';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';



const CountriesEdit = () => {
   
   const dispatch = useDispatch();

   const { id } = useParams();

   const { nameError, localeError, phoneExtensionError, loadingUpdate, loadingDetail, country } = useSelector(state => state.countries);

   const [name, setName] = useState('');
   const [phoneExtension, setPhoneExtension] = useState('');
   const [locale, setLocale] = useState('');

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetCountry(id));
   }, [dispatch, id]);

   useEffect(() => {
      setName(country?.name || '');
      setPhoneExtension(country?.phoneExtension || '');
      setLocale(country?.locale || '');
   }, [country?.name, country?.phoneExtension, country?.locale]);

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
            text: 'Editar'
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

         dispatch(setCountry(null));
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
         dispatch(startUpdateCountry(country.id, {name, locale, phoneExtension}));
      }
   }

   // Reset form
   const handleDiscard = () => {
      setName(country?.name);
      setPhoneExtension(country?.phoneExtension);
      setLocale(country?.locale);
      
      dispatch(setCountriesError('name', null));
      dispatch(setCountriesError('locale', null));
      dispatch(setCountriesError('phoneExtension', null));
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <form
                  className='card invoice-preview-card mb-2'
                  onSubmit={handleSubmit}
               >
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Editar país</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{country?.id}</span></h4>
                        </div>
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
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                           <button
                              type='button'
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

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/countries'
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



export default CountriesEdit;