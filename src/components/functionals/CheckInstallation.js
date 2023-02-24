import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startChecktInstallation } from '../../actions/installation';



// Components
import LoadingPage from '../ui/spinners/LoadingPage';



const CheckInstallation = ({children}) => {

   const dispatch = useDispatch();

   const { loadingInstall } = useSelector(state => state.installation);

   useEffect(() => {
      dispatch(startChecktInstallation());
   }, [dispatch]);

   if (loadingInstall) {
      return (
         <LoadingPage />
      );
   }

   return (
      <>{children}</>
   );
}



export default CheckInstallation;