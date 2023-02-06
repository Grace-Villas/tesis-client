


const LoadingResponse = ({state}) => {

   if (!state) {
      return (
         <></>
      );
   }

   return (
      <div className='loading-response-container'>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
}



export default LoadingResponse;