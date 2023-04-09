import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../actions/ui';



export const useTheme = () => {

   const dispatch = useDispatch();
   
   const { theme } = useSelector(state => state.ui);

   useEffect(() => {
      const html = document.querySelector('html');
      if (theme) {
         html.classList.add('dark-layout');
         html.classList.remove('light-layout');
      } else {
         html.classList.add('light-layout');
         html.classList.remove('dark-layout');
      }
   }, [theme]);

   useEffect(() => {
      const localTheme = localStorage.getItem('theme');

      dispatch(setTheme(localTheme === 'true' ? true : false));
   }, [dispatch]);
}