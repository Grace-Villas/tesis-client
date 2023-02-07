import PropTypes from 'prop-types';



const Select = ({
   value, setValue, title, options, placeholder,
   containerClass,
   error
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
         <label className='form-label' htmlFor={title}>{title}</label>

         <select
            className={handleSelectClass()}
            value={value}
            onChange={handleValue}
            id={title}
         >
            <option value=''>{placeholder}</option>

            {
               options.map(op => (
                  <option
                     key={`select-${title}-${op.value}`}
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
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
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
}

Select.defaultProps = {
   placeholder: 'Seleccione una opción...',

   containerClass: '',
   
   error: null,
}



export default Select;