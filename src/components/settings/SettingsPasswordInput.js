import PropTypes from 'prop-types';


// Components
import Icon from "../ui/Icon";



const SettingsPasswordInput = ({
   value, setValue, title, placeholder,
   containerClass,
   error
}) => {

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

   return (
      <div className={containerClass}>
         <label className="form-label" htmlFor={title}>{title}</label>
         
         <div className={handleWrapperClass()}>
            <input
               type="password"
               className={handleInputClass()}
               id={title}
               placeholder={placeholder}
               value={value}
               onChange={handleValue}
            />

            <div className="input-group-text cursor-pointer">
               <Icon icon='Eye' size={14} />
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



SettingsPasswordInput.propTypes = {
   value: PropTypes.string.isRequired,
   setValue: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   placeholder: PropTypes.string,

   containerClass: PropTypes.string,

   error: PropTypes.string,
}

SettingsPasswordInput.defaultProps = {
   type: 'text',

   containerClass: '',

   error: null
}



export default SettingsPasswordInput;