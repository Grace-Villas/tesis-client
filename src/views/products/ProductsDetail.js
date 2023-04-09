import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setBreadcrumb } from '../../actions/ui';
import { setLoading, setProduct, startDeleteProduct, startGetCompanyProduct, startGetProduct } from '../../actions/products';



// Components
import Element404 from '../../components/ui/Element404';
import LoadingResponse from '../../components/ui/spinners/LoadingResponse';
import LoadingComponent from '../../components/ui/spinners/LoadingComponent';
import PermissionNeeded from '../../components/ui/PermissionNeeded';



const ProductsDetail = () => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const { id } = useParams();

   const { isAdmin } = useSelector(state => state.auth);

   const { product, loadingDetail, loadingDelete } = useSelector(state => state.products);

   useEffect(() => {
      if (product === null) return;

      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            link: '/products',
            text: 'Productos'
         },
         {
            text: product?.name
         }
      ]));
   }, [dispatch, product]);

   useEffect(() => {
      dispatch(setLoading('detail', true));
      if (isAdmin) {
         dispatch(startGetProduct(id));
      } else {
         dispatch(startGetCompanyProduct(id));
      }
   }, [dispatch, id, isAdmin]);

   useEffect(() => {
      return () => {
         dispatch(setProduct(null));
         dispatch(setBreadcrumb([]));
      }
   }, [dispatch]);

   const handleDelete = () => dispatch(startDeleteProduct(id, { navigate }));

   if (!loadingDetail && !product) {
      return (
         <Element404
            btnText='Volver al listado'
            btnLink='/products'
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
                        <h4 className='mb-0 fw-bolder'>Detalles del producto</h4>

                        <div className='mt-md-0 mt-2'>
                           <h4 className='invoice-title mb-0'><span className='invoice-number'>#{product?.id}</span></h4>
                        </div>
                     </div>
                  </div>

                  <hr className='invoice-spacing' />

                  <div className='card-body invoice-padding pt-0'>
                     <div className='row'>
                        <div className='col-xl-6 p-0 mx-xl-auto'>
                           <table className='w-100'>
                              <tbody>
                                 <tr>
                                    <td className='pe-1'>Nombre:</td>

                                    <td className='text-end fw-bolder'>{product?.name}</td>
                                 </tr>

                                 <PermissionNeeded onlyAdmin>
                                    <tr>
                                       <td className='pe-1'>Unidades por paleta:</td>

                                       <td className='text-end fw-bolder'>{product?.qtyPerPallet}</td>
                                    </tr>
                                 </PermissionNeeded>

                                 <PermissionNeeded onlyClient>
                                    <tr>
                                       <td className='pe-1'>Stock:</td>

                                       <td className='text-end fw-bolder'>{product?.stock}</td>
                                    </tr>
                                 </PermissionNeeded>
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
                        to='/products'
                        className='btn btn-outline-secondary w-100 mb-75 waves-effect waves-float waves-light'
                     >Volver a listado</Link>

                     <Link
                        to={`/products/edit/${id}`}
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



export default ProductsDetail;