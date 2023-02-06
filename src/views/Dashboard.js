import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../actions/ui';



// Components
import Section from '../components/ui/Section';



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
      <Section className='my-2'>Dashboard</Section>
   );
}



export default Dashboard;