import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



// Actions
import { setBreadcrumb } from '../actions/ui';



// Components
import Summary from '../components/dashboard/Summary';
import DollarPrice from '../components/dashboard/DollarPrice';
import DispatchesAdmin from '../components/dashboard/DispatchesAdmin';
import PaymentsAdmin from '../components/dashboard/PaymentsAdmin';
import PermissionNeeded from '../components/ui/PermissionNeeded';
import DispatchesClient from '../components/dashboard/DispatchesClient';
import ReceptionsClient from '../components/dashboard/ReceptionsClient';



const Dashboard = () => {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setBreadcrumb([
         {
            link: '/',
            text: 'Dashboard'
         },
         {
            text: 'Inicio'
         }
      ]));
   }, [dispatch]);

   return (
      <section className='mt-2'>
         <div className='row match-height'>
            <DollarPrice/>

            <Summary />
         </div>

         <PermissionNeeded onlyAdmin>
            <div className='row match-height'>
               <DispatchesAdmin />
               
               <PaymentsAdmin />
            </div>
         </PermissionNeeded>

         <PermissionNeeded onlyClient>
            <div className='row match-height'>
               <DispatchesClient />
               
               <ReceptionsClient />
            </div>
         </PermissionNeeded>
      </section>
   );
}



export default Dashboard;