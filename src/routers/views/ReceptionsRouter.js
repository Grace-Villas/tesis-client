import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import ReceptionsCreate from '../../views/receptions/ReceptionsCreate';
import ReceptionsDetail from '../../views/receptions/ReceptionsDetail';
import ReceptionsList from '../../views/receptions/ReceptionsList';
import { usePermission } from '../../hooks/usePermission';



const ReceptionsRouter = () => {

   usePermission({section: 'receptions'});

   return (
      <Routes>
         <Route path='/' element={<ReceptionsList />} />

         <Route path='/create' element={<ReceptionsCreate />} />

         <Route path='/:id' element={<ReceptionsDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default ReceptionsRouter;