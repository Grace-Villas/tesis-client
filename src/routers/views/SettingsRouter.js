import { Navigate, Route, Routes } from 'react-router-dom';
import SettingsNav from '../../components/settings/SettingsNav';



// Views
import SettingsAccount from '../../views/settings/SettingsAccount';
import SettingsSecurity from '../../views/settings/SettingsSecurity';



// Components



const SettingsRouter = () => {

   return (
      <div className='row'>
         <div className='col-12 mt-2'>
            <SettingsNav />

            <Routes>
               <Route path='/' element={<SettingsAccount />} />

               <Route path='security' element={<SettingsSecurity />} />
            
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
         </div>
      </div>
   );
}



export default SettingsRouter;