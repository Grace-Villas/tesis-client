import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';



// Components
import Icon from '../ui/Icon';



const NestedSidebarLink = ({text, basePath, icon, children}) => {

   const [isOpen, setIsOpen] = useState(false);
   const [nestedHeight, setNestedHeight] = useState(null);

   const currentPath = useLocation().pathname;

   const nestedRef = useRef();

   useEffect(() => {
      if (currentPath.includes(basePath)) {
         setIsOpen(true);
      } else {
         setIsOpen(false);
      }
   }, [currentPath, basePath]);

   useEffect(() => {
      if (nestedRef.current) {
         setNestedHeight(nestedRef.current.clientHeight);
      }
   }, []);

   const handleOpen = () => setIsOpen(!isOpen);

   const handleOpenClass = () => isOpen ? 'custom-nested-link open' : 'custom-nested-link';

   const handleNestedHeight = () => {
      let height = null;

      if (isOpen) {
         height = nestedHeight;
      } else {
         if (nestedRef.current) {
            height = 0;
         } else {
            height = 'auto';
         }
      }

      return {height}
   }

   return (
      <div
         className={handleOpenClass()}
      >
         <div className='custom-link d-flex align-items-center' onClick={handleOpen}>
            <Icon icon={icon} />

            <span className='menu-title text-truncate' data-i18n='Page Layouts' style={{lineHeight: '100%'}}>{text}</span>

            <div className='ms-auto custom-nested-arrow'>
               <Icon icon='ChevronRight' size={14} />
            </div>
         </div>

         <div className='custom-nested-links' ref={nestedRef} style={handleNestedHeight()}>
            {children}
         </div>
      </div>
   )
}



NestedSidebarLink.propTypes = {
   text: PropTypes.string.isRequired,
   basePath: PropTypes.string.isRequired,
   icon: PropTypes.string.isRequired,
   children: PropTypes.node,
}



export default NestedSidebarLink;