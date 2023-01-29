import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import BusinessCreate from '../../views/admin/business/BusinessCreate';
import BusinessDetail from '../../views/admin/business/BusinessDetail';
import BusinessEdit from '../../views/admin/business/BusinessEdit';
import BusinessList from '../../views/admin/business/BusinessList';



const BusinessRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<BusinessList />} />

         <Route path='/create' element={<BusinessCreate />} />

         <Route path='/edit/:id' element={<BusinessEdit />} />

         <Route path='/:id' element={<BusinessDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default BusinessRouter;