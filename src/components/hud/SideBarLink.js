import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';



// Components
import Icon from "../ui/Icon";



const SideBarLink = ({text, icon, url}) => {

   // El componente NavLink agrega la clase "active" cuando hace match con la ruta

   return (
      <div className='custom-link'>
         <NavLink className='nav-item d-flex align-items-center custom-link-item' to={url} end>
            <Icon icon={icon} />

            <span className='menu-title text-truncate' data-i18n='Home'>{text}</span>
         </NavLink>
      </div>
   );
}



SideBarLink.propTypes = {
   text: PropTypes.string.isRequired,
   icon: PropTypes.string.isRequired,
   url: PropTypes.string.isRequired
}



export default SideBarLink;