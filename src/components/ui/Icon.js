import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'react-feather';



// Custom proptypes
import { validateFeatherIcon } from '../../custom-proptypes/feather-icons';



const Icon = ({icon, size, className}) => {

   const CustomIcon = Icons[icon] || null;

   if (!CustomIcon) {
      return (<></>);
   }

   return (
      <CustomIcon size={size} className={className} />
   );
}



Icon.propTypes = {
   icon: validateFeatherIcon,
   size: PropTypes.number,
   className: PropTypes.string
}

Icon.defaultProps = {
   size: 16,
   className: ''
}



export default Icon;