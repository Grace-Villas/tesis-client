import PropTypes from 'prop-types';



const Form = ({children, title, id, handleSubmit, handleDiscard}) => {

   return (
      <form
         className='card invoice-preview-card mb-2'
         onSubmit={handleSubmit}
      >
         <div className='card-body invoice-padding pb-0'>
            <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing my-0'>
               <h4 className='mb-0 fw-bolder'>{title}</h4>

               {
                  id && (
                     <div className='mt-md-0 mt-2'>
                        <h4 className='invoice-title mb-0'><span className='invoice-number'>#{id}</span></h4>
                     </div>
                  )
               }
            </div>
         </div>

         <hr className='invoice-spacing' />

         <div className='card-body invoice-padding py-0'>
            {children}
         </div>

         <hr className='invoice-spacing' />

         <div className='card-body invoice-padding pt-0'>
            <div className='row'>
               <div className='col-12 d-flex justify-content-between'>
                  <button
                     type='button'
                     className='btn btn-outline-secondary waves-effect'
                     onClick={handleDiscard}
                  >Descartar</button>

                  <button
                     type='submit'
                     className='btn btn-primary waves-effect waves-float waves-light'
                  >Guardar</button>
               </div>
            </div>
         </div>
      </form>
   );
}



Form.propTypes = {
   children: PropTypes.node.isRequired,
   title: PropTypes.string.isRequired,
   id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ]),
   handleSubmit: PropTypes.func.isRequired,
   handleDiscard: PropTypes.func,
}

Form.defaultProps = {
   id: null,
   handleDiscard: () => null,
}



export default Form;