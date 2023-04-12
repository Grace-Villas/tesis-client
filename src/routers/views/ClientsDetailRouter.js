import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import ClientsInfo from '../../components/clients/ClientsInfo';
import ClientsReceptions from '../../components/clients/ClientsReceptions';
import ClientsDispatches from '../../components/clients/ClientsDispatches';
import ClientsPayments from '../../components/clients/ClientsPayments';
import ClientsProducts from '../../components/clients/ClientsProducts';



const ClientsDetailRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<ClientsInfo />} />

         <Route path='/products' element={<ClientsProducts />} />

         <Route path='/receptions' element={<ClientsReceptions />} />

         <Route path='/dispatches' element={<ClientsDispatches />} />

         <Route path='/payments' element={<ClientsPayments />} />
      
         <Route path='*' element={<Navigate to='' replace />} />
      </Routes>
   );
}



export default ClientsDetailRouter;