import { Route, Routes } from 'react-router-dom';



// Components
import PersistantLog from '../components/functionals/PersistantLog';



// Routers
import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';



// Custom hooks
import { useTheme } from '../hooks/useTheme';



const AppRouter = () => {

   useTheme();

   return (
      <PersistantLog>
         <Routes>
            <Route path='/auth/*' element={<AuthRouter />} />

            <Route path='*' element={<MainRouter />} />
         </Routes>
      </PersistantLog>
   );
}



export default AppRouter;