import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import CountriesCreate from '../../views/admin/countries/CountriesCreate';
import CountriesDetail from '../../views/admin/countries/CountriesDetail';
import CountriesEdit from '../../views/admin/countries/CountriesEdit';
import CountriesList from '../../views/admin/countries/CountriesList';



const CountriesRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<CountriesList />} />

         <Route path='/create' element={<CountriesCreate />} />

         <Route path='/edit/:id' element={<CountriesEdit />} />

         <Route path='/:id' element={<CountriesDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default CountriesRouter;