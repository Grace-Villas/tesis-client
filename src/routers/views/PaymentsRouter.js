import { Navigate, Route, Routes } from 'react-router-dom';



// Views
import PaymentsCreate from '../../views/payments/PaymentsCreate';
import PaymentsDetail from '../../views/payments/PaymentsDetail';
import PaymentsList from '../../views/payments/PaymentsList';
import { usePermission } from '../../hooks/usePermission';



const PaymentsRouter = () => {

   usePermission({section: 'payments'});

   return (
      <Routes>
         <Route path='/' element={<PaymentsList />} />

         <Route path='/create' element={<PaymentsCreate />} />

         <Route path='/:id' element={<PaymentsDetail />} />
      
         <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
   );
}



export default PaymentsRouter;