import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { toggleSidebar } from '../../actions/ui';



// Components
import Icon from '../ui/Icon';
import NestedSidebarLink from './NestedSideBarLink';
import SideBarLink from './SideBarLink';
import SidebarTitle from './SidebarTitle';



// Custom hooks
import { useSidebar } from '../../hooks/useSidebar';
import { useWindowDimensions } from '../../hooks/useDimensions';



const SideBar = () => {

   const dispatch = useDispatch();

   const { sidebar, theme } = useSelector(state => state.ui);

   const [hovered, setHovered] = useState(false);

   const { width } = useWindowDimensions();

   useSidebar();

   const handleCollapsedMenu = (e) => {
      e.preventDefault();

      dispatch(toggleSidebar(!sidebar));
   }

   const handleHovered = () => !sidebar && setHovered(true);

   const handleOnMouseLeave = () => !sidebar && setHovered(false);

   const handleClassName = () => {
      let className = 'main-menu menu-fixed menu-accordion';

      if (theme) {
         className += ' menu-dark';
      } else {
         className += ' menu-light';
      }

      if (width <= 768) {
         className += ' menu-shadow expanded';
      }

      if (hovered || sidebar) {
         className += ' menu-shadow expanded';
      } else {
         className += ' menu-shadow';
      }

      return className;
   }

   return (
      <div
         className={handleClassName()}
         data-scroll-to-active='true'
         onMouseEnter={handleHovered}
         onMouseLeave={handleOnMouseLeave}
      >
         <div
            className={hovered ? 'navbar-header expanded' : 'navbar-header'}
         >
            <ul className='nav navbar-nav flex-row' style={{height: '100%'}}>
               <li className='nav-item me-auto d-flex align-items-center'>
                  <Link className='navbar-brand mt-0' to={'/'} style={{height: '100%'}}>
                     <span className='brand-logo'>
                        <img src={process.env.PUBLIC_URL + '/images/logos/logo.png'} alt='logo' />
                     </span>

                     <h2 className='brand-text fs-6'>Logistics Chain</h2>
                  </Link>
               </li>

               <li className='nav-item nav-toggle d-flex align-items-center'>
                  <a href='/#' className='nav-link modern-nav-toggle pe-0 my-0' onClick={handleCollapsedMenu}>
                     <Icon
                        icon='X'
                        className='d-block d-xl-none toggle-icon font-medium-4'
                     />

                     <Icon
                        icon={sidebar ? 'Disc' : 'Circle'}
                        className='d-none d-xl-block collapse-toggle-icon font-medium-4'
                     />
                  </a>
               </li>
            </ul>
         </div>

         <div className='shadow-bottom'></div>

         <div className='main-menu-content overflow-auto custom-scrollbar'>
            <div className='navigation navigation-main custom-nav' id='main-menu-navigation' data-menu='menu-navigation'>
               <SideBarLink text='Inicio' icon='Home' url='/' />

               <SidebarTitle title='' />

               <NestedSidebarLink text='Clientes' icon='Briefcase' basePath='/clients'>
                  <SideBarLink text='Lista' icon='Circle' url='/clients' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/clients/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Despachos' icon='Truck' basePath='/receptions'>
                  <SideBarLink text='Lista' icon='Circle' url='/receptions' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/receptions/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Lotes' icon='Clipboard' basePath='/batches'>
                  <SideBarLink text='Lista' icon='Circle' url='/batches' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/batches/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Recepciones' icon='Upload' basePath='/receptions'>
                  <SideBarLink text='Lista' icon='Circle' url='/receptions' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/receptions/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Productos' icon='Package' basePath='/products'>
                  <SideBarLink text='Lista' icon='Circle' url='/products' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/products/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Destinatarios' icon='BookOpen' basePath='/receivers'>
                  <SideBarLink text='Lista' icon='Circle' url='/receivers' />
                  
                  <SideBarLink text='Crear' icon='Circle' url='/receivers/create' />
               </NestedSidebarLink>

               <SidebarTitle title='Pagos y facturación' />

               <SideBarLink text='Facturación' icon='FileText' url='/company' />

               <NestedSidebarLink text='Pagos' icon='CreditCard' basePath='/payment-methods'>
                  <SideBarLink text='Lista' icon='Circle' url='/payment-methods' />

                  <SideBarLink text='Crear' icon='Circle' url='/payment-methods/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Métodos de pago' icon='Sliders' basePath='/payment-methods'>
                  <SideBarLink text='Lista' icon='Circle' url='/payment-methods' />

                  <SideBarLink text='Crear' icon='Circle' url='/payment-methods/create' />
               </NestedSidebarLink>

               <SidebarTitle title='Usuarios' />

               <NestedSidebarLink text='Usuarios' icon='Users' basePath='/users'>
                  <SideBarLink text='Lista' icon='Circle' url='/users' />

                  <SideBarLink text='Crear' icon='Circle' url='/users/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Roles' icon='Clipboard' basePath='/roles'>
                  <SideBarLink text='Lista' icon='Circle' url='/roles' />

                  <SideBarLink text='Crear' icon='Circle' url='/roles/create' />
               </NestedSidebarLink>

               <SidebarTitle title='Ubicaciones' />

               <NestedSidebarLink text='Estados' icon='MapPin' basePath='/states'>
                  <SideBarLink text='Lista' icon='Circle' url='/states' />

                  <SideBarLink text='Crear' icon='Circle' url='/states/create' />
               </NestedSidebarLink>

               <NestedSidebarLink text='Ciudades' icon='MapPin' basePath='/cities'>
                  <SideBarLink text='Lista' icon='Circle' url='/cities' />

                  <SideBarLink text='Crear' icon='Circle' url='/cities/create' />
               </NestedSidebarLink>

               <SidebarTitle title='Extras' />

               <SideBarLink text='Empresa' icon='Info' url='/company' />

               <SideBarLink text='Configuraciones' icon='Settings' url='/configurations' />
            </div>
         </div>
      </div>
   );
};



export default SideBar;