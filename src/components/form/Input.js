import PropTypes from 'prop-types';



const Input = ({
   value, setValue, title, type, placeholder,
   containerClass, inputClass,
   error, isValid
}) => {

   const handleValue = (e) => setValue(e.target.value);

   const handleInputClass = () => {
      let className = 'form-control';

      if (type === 'color') {
         className += ' form-control-color w-100';
      }

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

   return (
      <div className={containerClass}>
         <label className='form-label' htmlFor={title}>{title}</label>
         
         <input
            type={type}
            className={handleInputClass()}
            placeholder={placeholder}
            value={value}
            onChange={handleValue}
            id={title}
         />

         {
            error && (
               <div className='invalid-feedback'>{error}</div>
            )
         }
      </div>
   );
}



Input.propTypes = {
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   type: PropTypes.oneOf(['text', 'number', 'color']),
   placeholder: PropTypes.string,

   containerClass: PropTypes.string,
   inputClass: PropTypes.string,

   error: PropTypes.string,
   isValid: PropTypes.bool
}

Input.defaultProps = {
   type: 'text',

   containerClass: '',
   inputClass: null,

   error: null,
   isValid: null
}



export default Input;