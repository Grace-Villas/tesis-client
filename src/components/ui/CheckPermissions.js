import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';



const CheckPermissions = ({children, sections, onlyAdmin, onlyClient}) => {
   
   const { permissions, isAdmin } = useSelector(state => state.auth);

   const [show, setShow] = useState(false);

   useEffect(() => {
      sections.forEach(section => {
         if (permissions && permissions[section]) {
            setShow(true);
         }
      });
   }, [permissions, sections]);
   
   if (!show) {
      return (<></>);
   }

   if (typeof onlyAdmin !== 'undefined' && (onlyAdmin && !isAdmin)) {
      return (<></>);
   }

   if (typeof onlyClient !== 'undefined' && (onlyClient && isAdmin)) {
      return (<></>);
   }

   return (
      <>{children}</>
   );
}



CheckPermissions.propTypes = {
   children: PropTypes.node.isRequired,
   sections: PropTypes.arrayOf(PropTypes.string).isRequired,
   onlyAdmin: PropTypes.bool,
   onlyClient: PropTypes.bool,
}

CheckPermissions.defaultProps = {
   onlyAdmin: undefined,
   onlyClient: undefined,
}



export default CheckPermissions;