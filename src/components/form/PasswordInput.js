import PropTypes from 'prop-types';
import { useState } from 'react';



// Components
import Icon from '../ui/Icon';



const PasswordInput = ({
   value, setValue, title, placeholder,
   containerClass,
   error,
   ...inputProps
}) => {

   const [show, setShow] = useState(false);

   const handleValue = (e) => {
      setValue(e.target.value);
   }

   const handleInputClass = () => {
      let className = 'form-control';

      if (error) {
         className += ' error';
      }

      return className;
   }

   const handleWrapperClass = () => {
      let className = 'input-group form-password-toggle input-group-merge';

      if (error) {
         className += ' is-invalid';
      }

      return className;
   }

   const handleToggle = () => setShow(!show);

   return (
      <div className={containerClass}>
         <label className='form-label' htmlFor={title}>{title}</label>
         
         <div className={handleWrapperClass()}>
            <input
               type={show ? 'text' : 'password'}
               className={handleInputClass()}
               id={title}
               placeholder={placeholder}
               value={value}
               onChange={handleValue}
               {...inputProps}
            />

            <div
               className='input-group-text cursor-pointer'
               onClick={handleToggle}
            >
               <Icon icon={!show ? 'Eye' : 'EyeOff'} size={14} />
            </div>
         </div>

         {
            error && (
               <div className='invalid-feedback'>{error}</div>
            )
         }
      </div>
   );
}



PasswordInput.propTypes = {
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   placeholder: PropTypes.string,

   containerClass: PropTypes.string,

   error: PropTypes.string,
}

PasswordInput.defaultProps = {
   containerClass: '',

   error: null
}



export default PasswordInput;