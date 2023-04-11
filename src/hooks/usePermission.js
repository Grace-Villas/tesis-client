import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/**
 * Hook para controlar el acceso a las vistas
 * @param {{
 *    section: string,
 *    permission: string,
 *    onlyAdmin: boolean,
 *    onlyClient: boolean
 * }} config Atributos para determinar si el usuario tiene o no acceso a una vista
 */
export const usePermission = ({section, permission, onlyAdmin, onlyClient}) => {

   const navigate = useNavigate();

   const { isAdmin, permissions } = useSelector(state => state.auth);

   useEffect(() => {
      if (!permissions) {
         return navigate('/');
      }
   
      if (typeof onlyAdmin !== 'undefined' && (onlyAdmin && !isAdmin)) {
         return navigate('/');
      }
   
      if (typeof onlyClient !== 'undefined' && (onlyClient && isAdmin)) {
         return navigate('/');
      }
   
      if (typeof section !== 'undefined' && !permissions[section]) {
         return navigate('/');
      }
   
      if (typeof permission !== 'undefined' && !permissions[section][permission]) {
         return navigate('/');
      }
   }, [permissions, isAdmin, onlyAdmin, onlyClient, section, permission, navigate]);
}