


const LoadingComponent = ({state}) => {

   if (!state) {
      return (
         <></>
      );
   }

   return (
      <div className='loading-component-container'>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
}



export default LoadingComponent;