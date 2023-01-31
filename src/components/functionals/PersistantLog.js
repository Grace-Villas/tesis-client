import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startKeepLogged } from '../../actions/auth';



const PersistantLog = ({children}) => {

   const dispatch = useDispatch();

   const { loadingData } = useSelector(state => state.auth);

   useEffect(() => {
      dispatch(startKeepLogged());
   }, [dispatch]);

   if (loadingData) {
      return (
         <></>
      );
   }

   return (
      <>{children}</>
   );
}



export default PersistantLog;