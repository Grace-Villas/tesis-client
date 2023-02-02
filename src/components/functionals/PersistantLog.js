import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startKeepLogged } from '../../actions/auth';



// Components
import LoadingPage from '../ui/spinners/LoadingPage';



const PersistantLog = ({children}) => {

   const dispatch = useDispatch();

   const { loadingData } = useSelector(state => state.auth);

   useEffect(() => {
      dispatch(startKeepLogged());
   }, [dispatch]);

   if (loadingData) {
      return (
         <LoadingPage />
      );
   }

   return (
      <>{children}</>
   );
}



export default PersistantLog;