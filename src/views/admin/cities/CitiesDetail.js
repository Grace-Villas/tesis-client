import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../../actions/ui';
import { setCity, setLoading, startDeleteCity, startGetCity } from '../../../actions/cities';



// Components
import Element404 from '../../../components/ui/Element404';
import LoadingResponse from '../../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../../components/ui/spinners/LoadingComponent';
import { currencyFormat } from '../../../helpers/format';



const CitiesDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { city, loadingDetail, loadingDelete } = useSelector(state => state.cities);

   useEffect(() => {
      if (city === null) return;

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
            text: city?.name
         }
      ]));
   }, [dispatch, city]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      dispatch(startGetCity(id));
   }, [dispatch, id]);

   useEffect(() => {
      return () => {
         dispatch(setCity(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteCity(id, { navigate }));

   if (!loadingDetail && !city) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/cities'
         />
      );
   }

   return (
      <>
         <div className='row invoice-preview mt-2'>
            <div className='col-xl-9 col-md-8 col-12 position-relative'>
               <div className='card invoice-preview-card mb-2'>
                  <div className='card-body invoice-padding pb-0'>
                     <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                        <h4 className='mb-0 fw-bolder'>Detalles de la ciudad</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{city?.id}</span></h4>
                        </div>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Nombre:</td>

                                    <td className='text-end fw-bolder'>{city?.name}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Estado:</td>

                                    <td className='text-end fw-bolder'>{city?.state?.name}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className='col-xl-6 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>¿Despachable?:</td>

                                    <td
                                       className={`text-end fw-bolder ${city?.hasDeliveries ? 'text-success' : 'text-danger'}`}
                                    >{city?.hasDeliveries ? 'Sí' : 'No'}</td>
                                 </tr>

                                 <tr>
                                    <td className='pe-1'>Costo de despacho:</td>

                                    <td className='text-end fw-bolder'>{city?.deliveryPrice ? currencyFormat(city?.deliveryPrice) : '-'}</td>
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
                        to='/cities'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <Link
                        to={`/cities/edit/${id}`}
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



export default CitiesDetail;