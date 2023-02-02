import { NavLink } from 'react-router-dom';



// Components
import Icon from '../ui/Icon';



const SettingsNav = () => {

   return (
      <ul className="nav nav-pills mb-2">
         <li className="nav-item">
            <NavLink className="nav-link" to='' end>
               <Icon icon='User' size={18} />

               <span className="fw-bold">Cuenta</span>
            </NavLink>
         </li>
         
         <li className="nav-item">
            <NavLink className="nav-link" to='security'>
               <Icon icon='Lock' size={18} />

               <span className="fw-bold">Seguridad</span>
            </NavLink>
         </li>
      </ul>
   );
}



export default SettingsNav;