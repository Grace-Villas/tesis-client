import { Navigate, Route, Routes } from 'react-router-dom';



// Components
import NavBar from '../components/hud/NavBar';
import SideBar from '../components/hud/SideBar';
import MainBody from '../components/hud/MainBody';



// Views
import Dashboard from '../views/Dashboard';



// Routers
import BusinessRouter from './views/BusinessRouter';
import UsersRouter from './views/UsersRouter';
import RolesRouter from './views/RolesRouter';



const MainRouter = () => {

   return (
      <>
         <NavBar />

         <SideBar />

         <MainBody>
            <Routes>
               <Route path='/' element={<Dashboard />} />

               <Route path='/business/*' element={<BusinessRouter />} />

               <Route path='/users/*' element={<UsersRouter />} />

               <Route path='/roles/*' element={<RolesRouter />} />
            
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
         </MainBody>
      </>
   );
}



export default MainRouter;