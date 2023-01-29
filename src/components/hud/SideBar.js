import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { toggleSidebar } from '../../actions/ui';



// Components
import Icon from '../ui/Icon';
import NestedSidebarLink from './NestedSideBarLink';
import SideBarLink from './SideBarLink';



// Custom hooks
import { useSidebar } from '../../hooks/useSidebar';
import { useWindowDimensions } from '../../hooks/useDimensions';



const SideBar = () => {

   const dispatch = useDispatch();

   const { sidebar } = useSelector(state => state.ui);

   const [hovered, setHovered] = useState(false);

   const { width } = useWindowDimensions();

   useSidebar();

   const handleCollapsedMenu = () => dispatch(toggleSidebar(!sidebar));

   const handleHovered = () => !sidebar && setHovered(true);

   const handleOnMouseLeave = () => !sidebar && setHovered(false);

   const handleClassName = () => {
      if (width <= 768) {
         return 'main-menu menu-fixed menu-light menu-accordion menu-shadow expanded';
      }

      if (hovered || sidebar) {
         return 'main-menu menu-fixed menu-light menu-accordion menu-shadow expanded';
      } else {
         return 'main-menu menu-fixed menu-light menu-accordion menu-shadow';
      }
   }

   return (
      <div
         className={handleClassName()}
         data-scroll-to-active="true"
         onMouseEnter={handleHovered}
         onMouseLeave={handleOnMouseLeave}
      >
         <div
            className={hovered ? "navbar-header expanded" : "navbar-header"}
         >
            <ul className="nav navbar-nav flex-row" style={{height: '100%'}}>
               <li className="nav-item me-auto d-flex align-items-center">
                  <Link className="navbar-brand mt-0" to={'/'} style={{height: '100%'}}>
                     <span className='brand-logo'>
                        <h1 className='mb-0 fw-bolder text-primary'>LC</h1>
                     </span>

                     <h2 className='brand-text fs-6'>Logistics Chain</h2>
                  </Link>
               </li>

               <li className="nav-item nav-toggle d-flex align-items-center">
                  <a className="nav-link modern-nav-toggle pe-0 my-0" onClick={() => handleCollapsedMenu()}>
                     <Icon
                        icon='X'
                        className="d-block d-xl-none toggle-icon font-medium-4"
                     />

                     {
                        sidebar
                        ?
                           (
                              <Icon
                                 icon='Disc'
                                 className='d-none d-xl-block collapse-toggle-icon font-medium-4'
                              />
                           )
                        :
                           (
                              <Icon
                                 icon='Circle'
                                 className='d-none d-xl-block collapse-toggle-icon font-medium-4'
                              />
                           )
                     }
                  </a>
               </li>
            </ul>
         </div>

         <div className="shadow-bottom"></div>

         <div className="main-menu-content overflow-auto custom-scrollbar">
            <div className="navigation navigation-main custom-nav" id="main-menu-navigation" data-menu="menu-navigation">
               <SideBarLink text='Inicio' icon='Home' url='/' />

               <NestedSidebarLink text='Clientes' icon='Briefcase' basePath='/clients'>
                  <SideBarLink text='Lista' icon='Circle' url='/clients' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/clients/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Usuarios' icon='Users' basePath='/users'>
                  <SideBarLink text='Lista' icon='Circle' url='/users' />

                  <SideBarLink text='Crear' icon='Circle' url='/users/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Roles' icon='Clipboard' basePath='/roles'>
                  <SideBarLink text='Lista' icon='Circle' url='/roles' />

                  <SideBarLink text='Crear' icon='Circle' url='/roles/create' />
               </NestedSidebarLink>
            </div>
         </div>
      </div>
   );
};



export default SideBar;