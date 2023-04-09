import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import PaymentMethodsCreate from '../../views/admin/payment-methods/PaymentMethodsCreate';
import PaymentMethodsDetail from '../../views/admin/payment-methods/PaymentMethodsDetail';
import PaymentMethodsEdit from '../../views/admin/payment-methods/PaymentMethodsEdit';
import PaymentMethodsList from '../../views/admin/payment-methods/PaymentMethodsList';



const PaymentMethodsRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<PaymentMethodsList />} />

         <Route path='/create' element={<PaymentMethodsCreate />} />

         <Route path='/edit/:id' element={<PaymentMethodsEdit />} />

         <Route path='/:id' element={<PaymentMethodsDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default PaymentMethodsRouter;