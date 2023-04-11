import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import RolesCreate from '../../views/roles/RolesCreate';
import RolesDetail from '../../views/roles/RolesDetail';
import RolesEdit from '../../views/roles/RolesEdit';
import RolesList from '../../views/roles/RolesList';



// Custom hooks
import { usePermission } from '../../hooks/usePermission';



const RolesRouter = () => {

   usePermission({section: 'roles'});

   return (
      <Routes>
         <Route path='/' element={<RolesList />} />

         <Route path='/create' element={<RolesCreate />} />

         <Route path='/edit/:id' element={<RolesEdit />} />

         <Route path='/:id' element={<RolesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default RolesRouter;