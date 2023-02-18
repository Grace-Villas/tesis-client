import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// Actions
import { startLogout } from '../../actions/auth';



// Components
import Icon from './Icon';



// Helpers
import { capitalizeAllWords } from '../../helpers/format';



const UserNavBarDropdown = () => {

   const dispatch = useDispatch();

   const { fullName } = useSelector(state => state.auth);

   const [displayName, setDisplayName] = useState('');

   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const toDisplay = capitalizeAllWords(fullName || '');

      setDisplayName(toDisplay);
   }, [fullName]);

   const handleDropdown = (e) => {
      e.preventDefault();

      setIsOpen(!isOpen);
   };

   const handleLogout = (e) => {
      e.preventDefault();

      dispatch(startLogout());
   }

   return (
      <li className={`nav-item dropdown dropdown-user ${isOpen && 'show'}`}>
         <a
            className="nav-link dropdown-toggle dropdown-user-link"
            id="dropdown-user"
            href="/#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleDropdown}
         >
            <div className="user-nav d-sm-flex d-none">
               <span className="user-name fw-bolder">{displayName}</span>

               <span className="user-status">Admin</span>
            </div>
         </a>
         {/* data-bs-popper podría causar problemas con el dropdown (la posicion) */}
         <div
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdown-user"
            data-bs-popper="none"
         >
            <a className="dropdown-item" href="/#">
               <Icon icon='User' />

               <i className="me-50"></i>

               Profile
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='Mail' />

               <i className="me-50"></i>

               Inbox
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='CheckSquare' />

               <i className="me-50"></i>

               Task
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='MessageSquare' />

               <i className="me-50"></i>

               Chats
            </a>

            <div className="dropdown-divider" />

            <Link className="dropdown-item" to='/settings'>
               <Icon icon='Settings' />

               <i className="me-50"></i>

               Configuraciones
            </Link>

            <a
               className="dropdown-item"
               href="/#"
               onClick={handleLogout}
            >
               <Icon icon='Power' />

               <i className="me-50"></i>

               Cerrar sesión
            </a>
         </div>
      </li>
   );
}



export default UserNavBarDropdown;