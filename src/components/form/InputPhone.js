import PropTypes from 'prop-types';



const InputPhone = ({
   value, setValue, title, type, placeholder,
   containerClass, inputClass,
   error, isValid,
   ...inputProps
}) => {

   const handleValue = (e) => setValue(e.target.value);

   const handleInputClass = () => {
      let className = 'form-control';

      if (inputClass) {
         className += ` ${inputClass}`;
      }

      if (error) {
         className += ' is-invalid';
      } else if (isValid) {
         return className += ' is-valid';
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

   return (
      <div className={containerClass}>
         <label className='form-label' htmlFor={title}>{title}</label>

         <div className={handleWrapperClass()}>
            <span className='input-group-text'>+58</span>

            <input
               type={type}
               className={handleInputClass()}
               id={title}
               placeholder={placeholder}
               value={value}
               onChange={handleValue}
               {...inputProps}
            />
         </div>

         {
            error && (
               <div className='invalid-feedback'>{error}</div>
            )
         }
      </div>
   );
}



InputPhone.propTypes = {
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string,
   type: PropTypes.oneOf(['text', 'number']),
   placeholder: PropTypes.string,

   containerClass: PropTypes.string,
   inputClass: PropTypes.string,

   error: PropTypes.string,
   isValid: PropTypes.bool
}

InputPhone.defaultProps = {
   title: null,
   type: 'text',
   placeholder: '',

   containerClass: '',
   inputClass: null,

   error: null,
   isValid: null
}



export default InputPhone;