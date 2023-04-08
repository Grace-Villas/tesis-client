import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';



// Actions
import { setFilter } from '../../actions/filters';



const InputFilter = ({type, label, placeHolder, keyName, className}) => {

   const dispatch = useDispatch();

   const filters = useSelector(state => state.filters);

   const [input, setInput] = useState('');

   useEffect(() => {
      const timeOut = setTimeout(() => {
         dispatch(setFilter(keyName, input));
      }, 500);

      return () => clearTimeout(timeOut);
   }, [dispatch, keyName, input]);

   useEffect(() => {
      setInput(filters[keyName]);
   }, [filters, keyName]);

   const handleValue = (e) => setInput(e.target.value);

   return (
      <div className={className}>
         <label>{label}</label>

         <input
            type={type}
            className='form-control'
            placeholder={placeHolder}
            value={input}
            onChange={handleValue}
         />
      </div>
   );
}



InputFilter.propTypes = {
   type: PropTypes.oneOf(['search', 'date']),
   label: PropTypes.string,
   placeholder: PropTypes.string,
   keyName: PropTypes.string.isRequired,
   className: PropTypes.string
}

InputFilter.defaultProps = {
   type: 'search',
   label: 'Buscar',
   placeHolder: 'Ingrese su búsqueda'
}



export default InputFilter;