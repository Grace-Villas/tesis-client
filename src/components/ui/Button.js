import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



// Custom proptypes
import { validateNullableFeatherIcon } from '../../custom-proptypes/feather-icons';



// Components
import Icon from './Icon';



const Button = ({
   isLink,
   url,
   type, onClick, disabled,
   color, style, isRounded, className,
   text, icon,
}) => {

   const handleClassName = () => {

      let classText = 'd-flex align-items-center btn';

      if (!text && icon) {
         classText = classText + ' btn-icon'
      }

      if (style) {
         classText = classText + ` btn-${style}-${color}`
      } else {
         classText = classText + ` btn-${color}`;
      }

      if (isRounded) {
         classText = classText + ' round'
      }

      if (className) {
         classText = `${classText} ${className}`
      }

      return classText;
   }
   
   return (
      <Tag
         isLink={isLink}
         url={url}
         type={type}
         onClick={onClick}
         disabled={disabled}
         handleClassName={handleClassName}
      >
         {
            icon && (
               <Icon icon={icon} />
            )
         }

         {
            text && (
               <span className={icon && 'ms-25'}>{text}</span>
            )
         }
      </Tag>
   );
}

const Tag = ({
   children,
   isLink,
   url,
   type, onClick, disabled,
   handleClassName
}) => {

   if (isLink) {
      return (
         <Link
            to={url}
            className={handleClassName()}
         >{children}</Link>
      );
   }

   return (
      <button
         type={type}
         className={handleClassName()}
         disabled={disabled}
         onClick={onClick ? onClick : undefined}
      >
         {children}
      </button>
   );
}



Button.propTypes = {
   isLink: PropTypes.bool,

   url: PropTypes.string,

   type: PropTypes.oneOf(['button', 'submit']),
   onClick: PropTypes.func,
   disabled: PropTypes.bool,

   text: PropTypes.string,
   icon: validateNullableFeatherIcon,

   color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']),
   style: PropTypes.oneOf(['outline', 'flat', 'gradient', 'relief']),
   isRounded: PropTypes.bool,
}

Button.defaultProps = {
   isLink: false,

   url: '/',

   type: 'button',
   onClick: null,
   disabled: false,

   text: null,
   icon: null,

   color: 'primary',
   style: null,
   isRounded: false,
}



export default Button;