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
import PermissionNeeded from '../ui/PermissionNeeded';
import CheckPermissions from '../ui/CheckPermissions';



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

               <PermissionNeeded
                  section='companies'
                  onlyAdmin
               >
                  <NestedSidebarLink text='Clientes' icon='Briefcase' basePath='/clients'>
                     <SideBarLink text='Lista' icon='Circle' url='/clients' />
                     
                     <SideBarLink text='Crear' icon='Circle' url='/clients/create' />
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='dispatches'
               >
                  <NestedSidebarLink text='Despachos' icon='Truck' basePath='/dispatches'>
                     <PermissionNeeded
                        section='dispatches'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/dispatches' />
                     </PermissionNeeded>
                     
                     <PermissionNeeded
                        section='dispatches'
                        permission='create'
                        onlyClient
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/dispatches/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='batches'
                  onlyAdmin
               >
                  <NestedSidebarLink text='Lotes' icon='Clipboard' basePath='/batches'>
                     <PermissionNeeded
                        section='batches'
                        permission='list'
                        onlyAdmin
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/batches' />
                     </PermissionNeeded>
                     
                     <PermissionNeeded
                        section='batches'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/batches/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='receptions'
               >
                  <NestedSidebarLink text='Recepciones' icon='Upload' basePath='/receptions'>
                     <PermissionNeeded
                        section='receptions'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/receptions' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='receptions'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/receptions/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='products'
               >
                  <NestedSidebarLink text='Productos' icon='Package' basePath='/products'>
                     <PermissionNeeded
                        section='products'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/products' />
                     </PermissionNeeded>
                     
                     <PermissionNeeded
                        section='products'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/products/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='receivers'
                  onlyClient
               >
                  <NestedSidebarLink text='Destinatarios' icon='BookOpen' basePath='/receivers'>
                     <PermissionNeeded
                        section='receivers'
                        permission='list'
                        onlyClient
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/receivers' />
                     </PermissionNeeded>
                     
                     <PermissionNeeded
                        section='receivers'
                        permission='create'
                        onlyClient
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/receivers/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <CheckPermissions
                  sections={['payments', 'payment-methods']}
               >
                  <SidebarTitle title='Pagos y facturación' />
               </CheckPermissions>

               <PermissionNeeded
                  section='payments'
                  onlyClient
               >
                  <SideBarLink text='Facturación' icon='FileText' url='/company' />
               </PermissionNeeded>

               <PermissionNeeded
                  section='payments'
               >
                  <NestedSidebarLink text='Pagos' icon='CreditCard' basePath='/payments'>
                     <PermissionNeeded
                        section='payments'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/payments' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='payments'
                        permission='create'
                        onlyClient
                     >
                        <SideBarLink text='Reportar pago' icon='Circle' url='/payments/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='payments'
                  permission='list'
                  onlyClient
               >
                  <SideBarLink text='Métodos de pago' icon='Sliders' url='/payment-methods' />
               </PermissionNeeded>

               <PermissionNeeded
                  section='payment-methods'
                  onlyAdmin
               >
                  <NestedSidebarLink text='Métodos de pago' icon='Sliders' basePath='/payment-methods'>
                     <PermissionNeeded
                        section='payment-methods'
                        permission='list'
                        onlyAdmin
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/payment-methods' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='payment-methods'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/payment-methods/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>


               <CheckPermissions
                  sections={['users', 'roles']}
               >
                  <SidebarTitle title='Usuarios' />
               </CheckPermissions>

               <PermissionNeeded
                  section='users'
               >
                  <NestedSidebarLink text='Usuarios' icon='Users' basePath='/users'>
                     <PermissionNeeded
                        section='users'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/users' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='users'
                        permission='create'
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/users/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <PermissionNeeded
                  section='roles'
               >
                  <NestedSidebarLink text='Roles' icon='Clipboard' basePath='/roles'>
                     <PermissionNeeded
                        section='roles'
                        permission='list'
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/roles' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='roles'
                        permission='create'
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/roles/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <CheckPermissions
                  sections={['states', 'cities', 'payments', 'dispatches']}
               >
                  <SidebarTitle title='Ubicaciones' />
               </CheckPermissions>

               <PermissionNeeded
                  section='states'
                  onlyAdmin
               >
                  <NestedSidebarLink text='Estados' icon='MapPin' basePath='/states'>
                     <PermissionNeeded
                        section='states'
                        permission='list'
                        onlyAdmin
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/states' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='states'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/states/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <CheckPermissions
                  sections={['payments', 'dispatches']}
                  onlyClient
               >
                  <SideBarLink text='Ciudades' icon='MapPin' url='/cities' />
               </CheckPermissions>

               <PermissionNeeded
                  section='cities'
                  onlyAdmin
               >
                  <NestedSidebarLink text='Ciudades' icon='MapPin' basePath='/cities'>
                     <PermissionNeeded
                        section='cities'
                        permission='list'
                        onlyAdmin
                     >
                        <SideBarLink text='Lista' icon='Circle' url='/cities' />
                     </PermissionNeeded>

                     <PermissionNeeded
                        section='cities'
                        permission='create'
                        onlyAdmin
                     >
                        <SideBarLink text='Crear' icon='Circle' url='/cities/create' />
                     </PermissionNeeded>
                  </NestedSidebarLink>
               </PermissionNeeded>

               <SidebarTitle title='Extras' />

               <PermissionNeeded
                  onlyClient
               >
                  <SideBarLink text='Empresa' icon='Info' url='/company' />
               </PermissionNeeded>

               <PermissionNeeded
                  section='config'
                  onlyAdmin
               >
                  <SideBarLink text='Configuraciones' icon='Settings' url='/configurations' />
               </PermissionNeeded>
            </div>
         </div>
      </div>
   );
};



export default SideBar;