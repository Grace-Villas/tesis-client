import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';



// Actions
import { setFilter } from '../../actions/filters';



const SelectFilter = ({label, keyName, className, name, options, disabled}) => {

   const dispatch = useDispatch();

   const filters = useSelector(state => state.filters);

   const handleValue = (e) => dispatch(setFilter(keyName, e.target.value));

   return (
      <div className={className}>
         <label>{label}</label>

         <select
            type='search'
            className='form-select'
            value={filters[keyName]}
            onChange={handleValue}
            disabled={disabled}
         >
            <option value=''>Todos</option>

            {
               options.map(op => (
                  <option
                     key={`option-${name}-${op.value}`}
                     value={op.value}
                  >{op.text}</option>
               ))
            }
         </select>
      </div>
   );
}



SelectFilter.propTypes = {
   label: PropTypes.string,
   keyName: PropTypes.string.isRequired,
   className: PropTypes.string,
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
   disabled: PropTypes.bool
}

SelectFilter.defaultProps = {
   label: 'Buscar',
   disabled: false
}



export default SelectFilter;