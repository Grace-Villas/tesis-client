import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import ProductsCreate from '../../views/products/ProductsCreate';
import ProductsDetail from '../../views/products/ProductsDetail';
import ProductsEdit from '../../views/products/ProductsEdit';
import ProductsList from '../../views/products/ProductsList';
import { usePermission } from '../../hooks/usePermission';



const ProductsRouter = () => {

   usePermission({section: 'products'});

   return (
      <Routes>
         <Route path='/' element={<ProductsList />} />

         <Route path='/create' element={<ProductsCreate />} />

         <Route path='/edit/:id' element={<ProductsEdit />} />

         <Route path='/:id' element={<ProductsDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default ProductsRouter;