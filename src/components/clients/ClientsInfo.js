import { useSelector } from 'react-redux';



// Components
import LoadingComponent from '../ui/spinners/LoadingComponent';



const ClientsInfo = () => {

   const { client, loadingDetail } = useSelector(state => state.clients);

   return (
      <div className='col-xl-9 col-md-8 col-12 position-relative'>
         <div className='card invoice-preview-card mb-2'>
            <div className='card-body invoice-padding pb-0'>
               <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
                  <h4 className='mb-0 fw-bolder'>Detalles del cliente</h4>

                  <div className='mt-md-0 mt-2'>
                     <h4 className='invoice-title mb-0'><span className='invoice-number'>#{client?.id}</span></h4>
                  </div>
               </div>
            </div>

            <hr className='invoice-spacing' />

            <div className='card-body invoice-padding pt-0'>
               <div className='row'>
                  <div className='col-xl-6 px-0 px-xl-1'>
                     <h5 className='text-center fw-bolder'>Información</h5>

                     <table className='w-100'>
                        <tbody>
                           <tr>
                              <td className='pe-1'>Nombre:</td>

                              <td className='text-end fw-bolder'>{client?.name}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>DNI:</td>

                              <td className='text-end fw-bolder'>{client?.rut}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>Correo:</td>

                              <td className='text-end fw-bolder'>{client?.email}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>Teléfono:</td>

                              <td className='text-end fw-bolder'>{client?.phone}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <div className='col-xl-6 px-0 px-xl-1 mt-2 mt-xl-0'>
                     <h5 className='text-center fw-bolder'>Dirección</h5>

                     <table className='w-100'>
                        <tbody>
                           <tr>
                              <td className='pe-1'>País:</td>

                              <td className='text-end fw-bolder'>{client?.city?.state?.country?.name}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>Estado:</td>

                              <td className='text-end fw-bolder'>{client?.city?.state?.name}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>Ciudad:</td>

                              <td className='text-end fw-bolder'>{client?.city?.name}</td>
                           </tr>

                           <tr>
                              <td className='pe-1'>Dirección:</td>

                              <td className='text-end fw-bolder'>{client?.address}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         <LoadingComponent state={loadingDetail} isBlocking />
      </div>
   );
}



export default ClientsInfo;