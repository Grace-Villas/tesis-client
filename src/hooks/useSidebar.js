import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../actions/ui';



// Custom hooks
import { useWindowDimensions } from './useDimensions';



export const useSidebar = () => {

   const dispatch = useDispatch();

   const { sidebar } = useSelector(state => state.ui);

   const { width } = useWindowDimensions();

   // En vista movil agregar vertical-overlay-menu
   // menu-open y menu-hide para movil

   useEffect(() => {
      if (width <= 768) {
         document.body.classList.add('vertical-overlay-menu');
         document.body.classList.remove('vertical-menu-modern');
      } else {
         document.body.classList.add('vertical-menu-modern');
         document.body.classList.remove('vertical-overlay-menu');
      }

      if (width <= 768) {
         if (sidebar) {
            document.body.classList.add('menu-open');
            document.body.classList.remove('menu-hide');
         } else {
            document.body.classList.add('menu-hide');
            document.body.classList.remove('menu-open');
         }
      } else {
         if (sidebar) {
            document.body.classList.add('menu-expanded');
            document.body.classList.remove('menu-collapsed');
         }
         else {
            document.body.classList.remove('menu-expanded');
            document.body.classList.add('menu-collapsed');
         }
      }
   }, [sidebar, width]);

   useEffect(() => {
      if (width <= 768) {
         dispatch(toggleSidebar(false));
      } else {
         dispatch(toggleSidebar(true));
      }
   }, [dispatch, width]);
}