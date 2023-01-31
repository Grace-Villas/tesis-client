import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export const useAuthenticated = (isAuthNeeded = true) => {

   const navigate = useNavigate();

   const { id } = useSelector(state => state.auth);

   useEffect(() => {
      if (isAuthNeeded && !id) {
         navigate('/auth/login');
      }

      if (!isAuthNeeded && id) {
         navigate('/');
      }
   }, [isAuthNeeded, id, navigate]);
}