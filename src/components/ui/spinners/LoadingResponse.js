


const LoadingResponse = ({state}) => {

   if (!state) {
      return (
         <></>
      );
   }

   return (
      <div className='response-container' style={{zIndex: 1080}}>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
}



export default LoadingResponse;