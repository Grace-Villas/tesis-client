import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { setPerPage } from '../../actions/tables';



const RowsQuantityPicker = () => {
   
   const dispatch = useDispatch();

   const { perPage } = useSelector(state => state.tables);

   useEffect(() => {
      const storedQty = localStorage.getItem('per-page');

      const numberQty = Number(storedQty || 10);

      dispatch(setPerPage(numberQty));
   }, []);

   const handleQuantity = (e) => {
      dispatch(setPerPage(Number(e.target.value)));

      localStorage.setItem('per-page', Number(e.target.value));
   }

   return (
      <div className='d-flex align-items-center gap-1'>
         <label>Mostrar</label>

         <select
            className='form-select'
            style={{minWidth: '5rem'}}
            value={perPage}
            onChange={handleQuantity}
         >
            <option value={10}>10</option>

            <option value={25}>25</option>

            <option value={50}>50</option>

            <option value={100}>100</option>
         </select>
      </div>
   );
}



export default RowsQuantityPicker;