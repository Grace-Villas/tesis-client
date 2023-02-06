import PropTypes from 'prop-types';



const SidebarTitle = ({title}) => {

   return (
      <div className='navigation-header'>
         <span>{title}</span>
      </div>
   );
}



SidebarTitle.propTypes = {
   title: PropTypes.string.isRequired
}



export default SidebarTitle;