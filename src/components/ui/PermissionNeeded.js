import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';



/**
 * Componente para controlar el renderizado de los componentes según
 * el tipo de usuario y los permisos del usuario autenticado
 * @param {{
 *    children: Element,
 *    onlyAdmin: boolean,
 *    onlyClient: boolean,
 *    section: string,
 *    permission: string
 * }} params Parámetros del componente 
 * @returns 
 */
const PermissionNeeded = ({children, onlyAdmin, onlyClient, section, permission}) => {
   
   const { isAdmin, permissions } = useSelector(state => state.auth);
   
   if (!permissions) {
      return (<></>);
   }

   if (typeof onlyAdmin !== 'undefined' && (onlyAdmin && !isAdmin)) {
      return (<></>);
   }

   if (typeof onlyClient !== 'undefined' && (onlyClient && isAdmin)) {
      return (<></>);
   }

   if (typeof section !== 'undefined' && !permissions[section]) {
      return (<></>);
   }

   if (typeof permission !== 'undefined' && !permissions[section][permission]) {
      return (<></>);
   }

   return (
      <>{children}</>
   );
}



PermissionNeeded.propTypes = {
   children: PropTypes.node.isRequired,
   onlyAdmin: PropTypes.bool,
   onlyClient: PropTypes.bool,
   section: PropTypes.string,
   permission: PropTypes.string,
}

PermissionNeeded.defaultProps = {
   onlyAdmin: undefined,
   onlyClient: undefined,
   section: undefined,
   permission: undefined,
}



export default PermissionNeeded;