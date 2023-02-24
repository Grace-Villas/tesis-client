import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export const useInstalled = (isInstalledNeeded = true) => {

   const navigate = useNavigate();

   const { isInstalled } = useSelector(state => state.installation);

   useEffect(() => {
      if (isInstalledNeeded && !isInstalled) {
         navigate('/auth/installation');
      }

      if (!isInstalledNeeded && isInstalled) {
         navigate('/');
      }
   }, [isInstalledNeeded, isInstalled, navigate]);
}