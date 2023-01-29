import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import RolesCreate from '../../views/roles/RolesCreate';
import RolesDetail from '../../views/roles/RolesDetail';
import RolesEdit from '../../views/roles/RolesEdit';
import RolesList from '../../views/roles/RolesList';



const RolesRouter = () => {

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