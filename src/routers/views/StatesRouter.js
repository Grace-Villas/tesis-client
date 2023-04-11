import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import StatesCreate from '../../views/admin/states/StatesCreate';
import StatesDetail from '../../views/admin/states/StatesDetail';
import StatesEdit from '../../views/admin/states/StatesEdit';
import StatesList from '../../views/admin/states/StatesList';



// Custom hooks
import { usePermission } from '../../hooks/usePermission';



const StatesRouter = () => {

   usePermission({section: 'states', onlyAdmin: true});

   return (
      <Routes>
         <Route path='/' element={<StatesList />} />

         <Route path='/create' element={<StatesCreate />} />

         <Route path='/edit/:id' element={<StatesEdit />} />

         <Route path='/:id' element={<StatesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default StatesRouter;