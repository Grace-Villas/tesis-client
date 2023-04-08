import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import NavBar from '../components/hud/NavBar';
import SideBar from '../components/hud/SideBar';
import MainBody from '../components/hud/MainBody';



// Views
import CompanyInfo from '../views/CompanyInfo';
import Configurations from '../views/admin/Configurations';
import Dashboard from '../views/Dashboard';



// Routers
import CitiesRouter from './views/CitiesRouter';
import ClientsRouter from './views/ClientsRouter';
import ProductsRouter from './views/ProductsRouter';
import ReceptionsRouter from './views/ReceptionsRouter';
import RolesRouter from './views/RolesRouter';
import SettingsRouter from './views/SettingsRouter';
import StatesRouter from './views/StatesRouter';
import UsersRouter from './views/UsersRouter';



// Custom hooks
import { useAuthenticated } from '../hooks/useAuthenticated';



const MainRouter = () => {

   useAuthenticated();

   return (
      <>
         <NavBar />

         <SideBar />

         <MainBody>
            <Routes>
               <Route path='/' element={<Dashboard />} />

               <Route path='/clients/*' element={<ClientsRouter />} />

               <Route path='/users/*' element={<UsersRouter />} />

               <Route path='/roles/*' element={<RolesRouter />} />

               <Route path='/states/*' element={<StatesRouter />} />

               <Route path='/cities/*' element={<CitiesRouter />} />

               <Route path='/settings/*' element={<SettingsRouter />} />

               <Route path='/configurations' element={<Configurations />} />

               <Route path='/company' element={<CompanyInfo />} />

               <Route path='/products/*' element={<ProductsRouter />} />

               <Route path='/receptions/*' element={<ReceptionsRouter />} />
            
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
         </MainBody>
      </>
   );
}



export default MainRouter;