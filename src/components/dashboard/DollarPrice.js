import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, startGetDollarPrice } from "../../actions/dashboard";
import { currencyFormat } from "../../helpers/format";



const DollarPrice = () => {

   const dispatch = useDispatch();

   const { dollarPrice } = useSelector(state => state.dashboard);

   useEffect(() => {
      dispatch(startGetDollarPrice());
   }, [dispatch]);

   useEffect(() => {
      return () => {
         dispatch(setData('dollarPrice', null));
      }
   }, [dispatch]);

   return (
      <div className='col-xl-3 col-md-6 col-12'>
         <div className='card card-congratulations-medal'>
            <div className='card-body'>
               <h4>Precio del dólar hoy</h4>

               <p className='card-text font-small-1'>Según el Banco Central de Venezuela</p>
               
               <h3 className='mb-75 mt-2 pt-50 text-primary'>
                  {currencyFormat(1)} = {currencyFormat(dollarPrice, { locale: 'es-VE', currency: 'VES' })}
               </h3>

               <a
                  href="https://www.bcv.org.ve/"
                  target="_blank"
                  rel="noreferrer"
                  className='btn btn-primary waves-effect waves-float waves-light w-100'
               >Ir a BCV</a>
            </div>
         </div>
      </div>
   );
}



export default DollarPrice;