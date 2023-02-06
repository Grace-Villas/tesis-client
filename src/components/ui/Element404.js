import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const Element404 = ({btnText, btnLink}) => {

   return (
      <div className='w-100 text-center d-flex flex-column align-items-center'>
         <h2 className='mb-1'>Página no encontrada 🕵🏻‍♀️</h2>

         <p className='mb-25'>Ups! 😖 No se ha encontrado lo que estabas buscando.</p>

         <p className='mb-2'>Puede que lo que buscabas no exista o haya sido eliminado.</p>

         <Link
            to={btnLink}
            className='btn btn-primary mb-2 btn-sm-block waves-effect waves-float waves-light'
         >{btnText}</Link>

         <div className='d-flex w-md-25'>
            <img className='img-fluid' src={process.env.PUBLIC_URL + '/images/error-404.svg'} alt='Error page' />
         </div>
      </div>
   );
}



Element404.propTypes = {
   btnText: PropTypes.string.isRequired,
   btnLink: PropTypes.string.isRequired,
}



export default Element404;