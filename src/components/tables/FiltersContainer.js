import PropTypes from 'prop-types';



const FiltersContainer = ({children, className}) => {

   return (
      <div className={`card mb-1 ${className}`}>
         <div className='row mx-1 my-2'>
            {children}
         </div>
      </div>
   );
}



FiltersContainer.propTypes = {
   children: PropTypes.node.isRequired,
   className: PropTypes.string
}

FiltersContainer.defaultProps = {
   className: 'mt-2'
}



export default FiltersContainer;