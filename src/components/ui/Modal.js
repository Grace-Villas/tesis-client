import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';



// Custom hooks
import { useScrollbarSize } from '../../hooks/useScrollbarSize';
import { useWindowDimensions } from '../../hooks/useDimensions';



const Modal = ({children, className, state, close, isAboveModal}) => {

   const modal = useRef(null);

   const { width } = useWindowDimensions();

   const scrollWidth = useScrollbarSize();

   useEffect(() => {
      if (isAboveModal) return;

      if (state) {
         if (width >= 768) {
            if (document.body.scrollHeight > document.body.clientHeight) {
               document.body.style.paddingRight = `${scrollWidth}px`;
            }
         }
         document.body.classList.add('not-scrollable');
      } else {
         if (width >= 768) {
            document.body.style.paddingRight = 'unset';
         }
         document.body.classList.remove('not-scrollable');
      }
   }, [state, width, scrollWidth, isAboveModal]);

   const handleShow = (status) => status ? 'modal-container active' : 'modal-container';
   
   const handleClose = (e) => {
      if (modal.current && modal.current === e.target) {
         close();
      }
   }
   
   return (
      <div className={handleShow(state)} onClick={handleClose}>
         <div className={'modal ' + className} ref={modal}>
            {children}
         </div>
      </div>
   );
}



Modal.propTypes = {
   children: PropTypes.element.isRequired,
   className: PropTypes.string,
   state: PropTypes.bool.isRequired,
   close: PropTypes.func.isRequired,
   isAboveModal: PropTypes.bool
}

Modal.defaultProps = {
   className: '',
   isAboveModal: false
}



export default Modal;