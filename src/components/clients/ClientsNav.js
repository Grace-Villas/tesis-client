import { NavLink } from 'react-router-dom';



// Components
import Icon from '../ui/Icon';



const ClientsNav = () => {

   return (
      <ul className='nav nav-pills mb-2'>
         <li className='nav-item'>
            <NavLink className='nav-link' to='' end>
               <Icon icon='Briefcase' size={18} />

               <span className='fw-bold'>Información</span>
            </NavLink>
         </li>
         
         <li className='nav-item'>
            <NavLink className='nav-link' to='security'>
               <Icon icon='FileText' size={18} />

               <span className='fw-bold'>Facturación</span>
            </NavLink>
         </li>
         
         <li className='nav-item'>
            <NavLink className='nav-link' to='security'>
               <Icon icon='Package' size={18} />

               <span className='fw-bold'>Productos</span>
            </NavLink>
         </li>
         
         <li className='nav-item'>
            <NavLink className='nav-link' to='security'>
               <Icon icon='Upload' size={18} />

               <span className='fw-bold'>Recepciones</span>
            </NavLink>
         </li>
         
         <li className='nav-item'>
            <NavLink className='nav-link' to='security'>
               <Icon icon='Truck' size={18} />

               <span className='fw-bold'>Despachos</span>
            </NavLink>
         </li>
      </ul>
   );
}



export default ClientsNav;