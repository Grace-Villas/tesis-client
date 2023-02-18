import PropTypes from 'prop-types';



// Components
import Icon from '../ui/Icon';



const Switch = ({
   title, name, value, setValue,
   containerClass, wrapperClass
}) => {

   const handleValue = () => setValue(!value);

   return (
      <div className={`d-flex flex-column ${containerClass}`}>
         {
            title && (
               <label
                  className='form-label'
                  htmlFor={'switch-' + name}
               >{title}</label>
            )
         }

         <div className={`form-check form-switch form-check-primary ps-0 ${wrapperClass}`}>
            <input
               type='checkbox'
               className='form-check-input ms-0'
               id={'switch-' + name}
               checked={value}
               onChange={handleValue}
            />

            <label className='form-check-label' htmlFor={'switch-' + name}>
               <span className='switch-icon-left'>
                  <Icon icon='Check' size={14} />
               </span>

               <span className='switch-icon-right'>
                  <Icon icon='X' size={14} />
               </span>
            </label>
         </div>
      </div>
   );
}



Switch.propTypes = {
   title: PropTypes.string,
   name: PropTypes.string.isRequired,
   value: PropTypes.bool.isRequired,
   setValue: PropTypes.func.isRequired,

   containerClass: PropTypes.string,
   wrapperClass: PropTypes.string,
}

Switch.defaultProps = {
   title: null,
   
   containerClass: '',
   wrapperClass: '',
}



export default Switch;