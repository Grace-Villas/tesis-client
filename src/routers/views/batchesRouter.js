import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import BatchesCreate from '../../views/admin/batches/BatchesCreate';
import BatchesDetail from '../../views/admin/batches/BatchesDetail';
import BatchesList from '../../views/admin/batches/BatchesList';
import { usePermission } from '../../hooks/usePermission';



const BatchesRouter = () => {

   usePermission({section: 'batches', onlyAdmin: true});

   return (
      <Routes>
         <Route path='/' element={<BatchesList />} />

         <Route path='/create' element={<BatchesCreate />} />

         <Route path='/:id' element={<BatchesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default BatchesRouter;