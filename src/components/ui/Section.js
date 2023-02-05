import PropTypes from 'prop-types';


/**
 * Componente sección. Fondo blanco bordeado y padding
 * @param {} props 
 * @returns 
 */
const Section = ({ children, size, sizeDesk, sizeTablet, classes }) => {

   return (
      <section className={`bg-white bg-gradient rounded-3 shadow-sm my-2 p-2 overflow-hidden ${size} ${sizeTablet} ${sizeDesk} ${classes}`}>
         {children}
      </section>
   );
}



Section.propTypes = {
   size: PropTypes.string,
   sizeDesk: PropTypes.string,
   sizeTablet: PropTypes.string
};

Section.defaultProps = {
   size: "",
   sizeDesk: "",
   sizeTablet: "",
};



export default Section;