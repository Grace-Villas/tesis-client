import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setCountry, setLoading, startDeleteCountry, startGetCountry } from '../../../actions/countries';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';



const CountriesDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { country, loadingDetail, loadingDelete } = useSelector(state => state.countries);

   useEffect(() => {
      if (country === null) return;

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
            text: country?.formatedName
         }
      ]));
   }, [dispatch, country]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetCountry(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setCountry(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteCountry(id, { navigate }));

   if (!loadingDetail && !country) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/countries'
         />
      );
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <div className='card invoice-preview-card'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Detalles del país</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{country?.id}</span></h4>
                        </div>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-xl-6 p-0 mt-xl-0 mt-2 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Nombre:</td>

                                    <td className='text-end fw-bolder'>{country?.formatedName}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Código local:</td>

                                    <td className='text-end fw-bolder'>{country?.locale}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Extensión telefónica:</td>

                                    <td className='text-end fw-bolder'>{country?.phoneExtension}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               <LoadingComponent state={loadingDetail} isBlocking />
            </div>
            
            <div className='col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2'>
               <div className='card'>
                  <div className='card-body'>
                     <Link
                        to='/countries'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <Link
                        to={`/countries/edit/${id}`}
                        className='btn btn-info w-100 mb-75 waves-effect waves-float waves-light'
                     >Editar</Link>

                     <button
                        className='btn btn-danger w-100 waves-effect waves-float waves-light'
                        onClick={handleDelete}
                        disabled={loadingDelete || loadingDetail}
                     >Eliminar</button>
                  </div>
               </div>
            </div>
         </div>

         <LoadingResponse state={loadingDelete} />
      </>
   );
}



export default CountriesDetail;