import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import CheckInstallation from '../components/functionals/CheckInstallation';



// Views
import Installation from '../views/auth/Installation';
import Login from '../views/auth/Login';
import PasswordReset from '../views/auth/PasswordReset';
import PasswordRecovery from '../views/auth/PasswordRecovery';



// Custom hooks
import { useAuthenticated } from '../hooks/useAuthenticated';



const AuthRouter = () => {

   useAuthenticated(false);

   return (
      <CheckInstallation>
         <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/password-recovery' element={<PasswordRecovery />} />

            <Route path='/password-reset/:token' element={<PasswordReset />} />

            <Route path='/installation' element={<Installation />} />
            
            <Route path='*' element={<Navigate to='/' replace />} />
         </Routes>
      </CheckInstallation>
   );
}



export default AuthRouter;