import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import ClientsCreate from '../../views/admin/clients/ClientsCreate';
import ClientsDetail from '../../views/admin/clients/ClientsDetail';
import ClientsEdit from '../../views/admin/clients/ClientsEdit';
import ClientsList from '../../views/admin/clients/ClientsList';



// Custom hook
import { usePermission } from '../../hooks/usePermission';



const ClientsRouter = () => {

   usePermission({section: 'companies', onlyAdmin: true});

   return (
      <Routes>
         <Route path='/' element={<ClientsList />} />

         <Route path='/create' element={<ClientsCreate />} />

         <Route path='/edit/:id' element={<ClientsEdit />} />

         <Route path='/:id/*' element={<ClientsDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default ClientsRouter;