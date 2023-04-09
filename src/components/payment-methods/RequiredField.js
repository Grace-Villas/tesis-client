import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';



// Helpers
import { capitalize } from '../../helpers/format';



const RequiredField = ({children, paymentTypeId, fieldName}) => {

   const { paymentTypesList } = useSelector(state => state.paymentTypes);

   const [type, setType] = useState(null);

   useEffect(() => {
      setType(paymentTypesList.find(p => p.id === paymentTypeId));
   }, [paymentTypesList, paymentTypeId]);

   if (!type || !type[`has${capitalize(fieldName)}`]) {
      return (<></>);
   }

   return (
      <>{children}</>
   );
}



RequiredField.propTypes = {
   children: PropTypes.node.isRequired,
   paymentTypeId: PropTypes.number.isRequired,
   fieldName: PropTypes.string.isRequired
}



export default RequiredField;