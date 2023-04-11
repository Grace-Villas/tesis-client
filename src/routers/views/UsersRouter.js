import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import UsersCreate from '../../views/users/UsersCreate';
import UsersDetail from '../../views/users/UsersDetail';
import UsersEdit from '../../views/users/UsersEdit';
import UsersList from '../../views/users/UsersList';



// Custom hooks
import { usePermission } from '../../hooks/usePermission';



const UsersRouter = () => {

   usePermission({section: 'users'});
      
   return (
      <Routes>
         <Route path='/' element={<UsersList />} />

         <Route path='/create' element={<UsersCreate />} />

         <Route path='/edit/:id' element={<UsersEdit />} />

         <Route path='/:id' element={<UsersDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default UsersRouter;