import PropTypes from 'prop-types';



const Select = ({
   value, setValue, title, name, options, placeholder,
   containerClass,
   error, disabled
}) => {

   const handleValue = (e) => setValue(e.target.value);

   const handleSelectClass = () => {
      let className = 'form-select';

      if (error) {
         className += ' is-invalid';
      }

      return className;
   }

   return (
      <div className={containerClass}>
         {
            title && (
               <label className='form-label' htmlFor={name}>{title}</label>
            )
         }

         <select
            className={handleSelectClass()}
            value={value}
            onChange={handleValue}
            id={name}
            disabled={disabled}
         >
            <option value='' disabled>{placeholder}</option>

            {
               options.map(op => (
                  <option
                     key={`select-${name}-${op.value}`}
                     value={op.value}
                  >{op.text}</option>
               ))
            }
         </select>

         {
            error && (
               <div className='invalid-feedback'>{error}</div>
            )
         }
      </div>
   );
}



Select.propTypes = {
   value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
   ]).isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string,
   name: PropTypes.string.isRequired,
   options: PropTypes.arrayOf(
      PropTypes.shape(
         {
            value: PropTypes.oneOfType([
               PropTypes.number,
               PropTypes.string
            ]).isRequired,
            text: PropTypes.string.isRequired
         }
      ).isRequired
   ).isRequired,
   placeholder: PropTypes.string,
   
   containerClass: PropTypes.string,

   error: PropTypes.string,
   disabled: PropTypes.bool
}

Select.defaultProps = {
   title: null,
   name: null,
   placeholder: 'Seleccione una opción...',

   containerClass: '',
   
   error: null,
   disabled: false
}



export default Select;