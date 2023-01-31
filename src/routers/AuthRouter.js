import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import Login from '../views/auth/Login';
import LostPassword from '../views/auth/LostPassword';
import PasswordRecovery from '../views/auth/PasswordRecovery';



// Custom hooks
import { useAuthenticated } from '../hooks/useAuthenticated';



const AuthRouter = () => {

   useAuthenticated(false);

   return (
      <Routes>
         <Route path='/login' element={<Login />} />

         <Route path='/lost-password' element={<LostPassword />} />

         <Route path='/password-recovery' element={<PasswordRecovery />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default AuthRouter;