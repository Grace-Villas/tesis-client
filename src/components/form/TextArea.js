import PropTypes from 'prop-types';



const TextArea = ({
   value, setValue, title, rows, placeholder,
   containerClass,
   error, isValid
}) => {

   const handleValue = (e) => setValue(e.target.value);

   const handleInputClass = () => {
      let className = 'form-control';

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

         <textarea
            className={handleInputClass()}
            style={{resize: 'none'}}
            id={title}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={handleValue}
         />

         {
            error && (
               <div className='invalid-feedback'>{error}</div>
            )
         }
      </div>
   );
}



TextArea.propTypes = {
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   rows: PropTypes.number,
   placeholder: PropTypes.string,

   containerClass: PropTypes.string,

   error: PropTypes.string,
   isValid: PropTypes.bool
}

TextArea.defaultProps = {
   rows: 2,

   containerClass: '',

   error: null,
   isValid: null
}



export default TextArea;