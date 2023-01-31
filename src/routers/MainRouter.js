import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import NavBar from '../components/hud/NavBar';
import SideBar from '../components/hud/SideBar';
import MainBody from '../components/hud/MainBody';



// Views
import Dashboard from '../views/Dashboard';



// Routers
import ClientsRouter from './views/ClientsRouter';
import UsersRouter from './views/UsersRouter';
import RolesRouter from './views/RolesRouter';
import CitiesRouter from './views/CitiesRouter';
import StatesRouter from './views/StatesRouter';



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
            
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
         </MainBody>
      </>
   );
}



export default MainRouter;