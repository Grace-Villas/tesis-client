import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import ReceiversCreate from '../../views/receivers/ReceiversCreate';
import ReceiversDetail from '../../views/receivers/ReceiversDetail';
import ReceiversEdit from '../../views/receivers/ReceiversEdit';
import ReceiversList from '../../views/receivers/ReceiversList';
import { usePermission } from '../../hooks/usePermission';



const ReceiversRouter = () => {

   usePermission({section: 'receivers', onlyClient: true});

   return (
      <Routes>
         <Route path='/' element={<ReceiversList />} />

         <Route path='/create' element={<ReceiversCreate />} />

         <Route path='/edit/:id' element={<ReceiversEdit />} />

         <Route path='/:id' element={<ReceiversDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default ReceiversRouter;