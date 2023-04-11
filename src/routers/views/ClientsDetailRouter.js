import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import ClientsInfo from '../../components/clients/ClientsInfo';



const ClientsDetailRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<ClientsInfo />} />
      
         <Route path='*' element={<Navigate to='' replace />} />
      </Routes>
   );
}



export default ClientsDetailRouter;