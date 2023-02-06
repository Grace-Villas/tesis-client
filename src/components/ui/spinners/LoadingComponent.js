import PropTypes from 'prop-types';



const LoadingComponent = ({state, isBlocking}) => {

   if (!state) {
      return (
         <></>
      );
   }

   return (
      <div className={`loading-component-container ${isBlocking && 'blocking'}`}>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
}



LoadingComponent.propTypes = {
   state: PropTypes.bool.isRequired,
   isBlocking: PropTypes.bool
}

LoadingComponent.defaultProps = {
   isBlocking: false
}



export default LoadingComponent;