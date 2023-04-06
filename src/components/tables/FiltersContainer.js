import PropTypes from 'prop-types';



const FiltersContainer = ({children}) => {

   return (
      <div className='card mt-2 mb-1'>
         <div className='row mx-1 my-2'>
            {children}
         </div>
      </div>
   );
}



FiltersContainer.propTypes = {
   children: PropTypes.node.isRequired
}



export default FiltersContainer;