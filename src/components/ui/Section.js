import PropTypes from 'prop-types';


/**
 * Componente sección. Fondo blanco bordeado y padding
 * @param {} props 
 * @returns {Element}
 */
const Section = ({children, size, sizeDesk, sizeTablet, className}) => {

   return (
      <section className={`bg-white bg-gradient rounded-3 shadow-sm p-2 overflow-hidden ${size} ${sizeTablet} ${sizeDesk} ${className}`}>
         {children}
      </section>
   );
}



Section.propTypes = {
   children: PropTypes.node,

   size: PropTypes.string,
   sizeDesk: PropTypes.string,
   sizeTablet: PropTypes.string,

   className: PropTypes.string
};

Section.defaultProps = {
   children: <></>,

   size: '',
   sizeDesk: '',
   sizeTablet: '',

   className: ''
};



export default Section;