import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import DispatchesCreate from '../../views/dispatches/DispatchesCreate';
import DispatchesDetail from '../../views/dispatches/DispatchesDetail';
import DispatchesList from '../../views/dispatches/DispatchesList';



const DispatchesRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<DispatchesList />} />

         <Route path='/create' element={<DispatchesCreate />} />

         <Route path='/:id' element={<DispatchesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default DispatchesRouter;