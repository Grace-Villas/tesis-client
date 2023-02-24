import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import CheckInstallation from '../components/functionals/CheckInstallation';



// Views
import Installation from '../views/auth/Installation';
import Login from '../views/auth/Login';
import LostPassword from '../views/auth/LostPassword';
import PasswordRecovery from '../views/auth/PasswordRecovery';



// Custom hooks
import { useAuthenticated } from '../hooks/useAuthenticated';



const AuthRouter = () => {

   useAuthenticated(false);

   return (
      <CheckInstallation>
         <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/lost-password' element={<LostPassword />} />

            <Route path='/password-recovery' element={<PasswordRecovery />} />

            <Route path='/installation' element={<Installation />} />
            
            <Route path='*' element={<Navigate to='/' replace />} />
         </Routes>
      </CheckInstallation>
   );
}



export default AuthRouter;