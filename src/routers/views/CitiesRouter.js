import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import CitiesCreate from '../../views/admin/cities/CitiesCreate';
import CitiesDetail from '../../views/admin/cities/CitiesDetail';
import CitiesEdit from '../../views/admin/cities/CitiesEdit';
import CitiesList from '../../views/admin/cities/CitiesList';



const CitiesRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<CitiesList />} />

         <Route path='/create' element={<CitiesCreate />} />

         <Route path='/edit/:id' element={<CitiesEdit />} />

         <Route path='/:id' element={<CitiesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default CitiesRouter;