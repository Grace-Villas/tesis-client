import { useEffect, useRef, useState } from 'react';



// Components
import Icon from './Icon';



const UserNavBarDropdown = () => {

   const [isDisplayed, setIsDisplayed] = useState(false);

   const dropDown = useRef();
   const userCard = useRef();

   //TODO: arreglar por click
   const handleDropdown = (e) => {
      e.preventDefault();
      setIsDisplayed(!isDisplayed);
   };

   useEffect(() => {
      if (isDisplayed) dropDown.current.classList.add('show');
      else dropDown.current.classList.remove('show');
   }, [isDisplayed]);

   return (
      <li className={
         isDisplayed
            ? "nav-item dropdown dropdown-user show"
            : "nav-item dropdown dropdown-user"
      }
         ref={userCard}
      >
         <a
            className="nav-link dropdown-toggle dropdown-user-link"
            id="dropdown-user"
            href="/#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleDropdown}
         >
            <div className="user-nav d-sm-flex d-none">
               <span className="user-name fw-bolder">John Doe</span>

               <span className="user-status">Admin</span>
            </div>
         </a>
         {/* data-bs-popper podría causar problemas con el dropdown (la posicion) */}
         <div
            ref={dropDown}
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

            <a className="dropdown-item" href="/#">
               <Icon icon='Settings' />

               <i className="me-50"></i>

               Settings
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='CreditCard' />

               <i className="me-50"></i>

               Pricing
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='HelpCircle' />

               <i className="me-50"></i>

               FAQ
            </a>

            <a className="dropdown-item" href="/#">
               <Icon icon='Power' />

               <i className="me-50"></i>

               Logout
            </a>
         </div>
      </li>
   );
}



export default UserNavBarDropdown;