import Icon from '../ui/Icon';



const SummaryElement = ({icon, text, value, colorClass}) => {

   return (
      <div className='col-xl-3 col-sm-6 col-12'>
         <div className='d-flex flex-row'>
            <div className={`avatar ${colorClass} me-1`}>
               <div className='avatar-content'>
                  <Icon icon={icon} size={14} className='avatar-icon' />
               </div>
            </div>

            <div className='my-auto'>
               <h4 className='fw-bolder mb-0'>{value}</h4>

               <p className='card-text font-small-3 mb-0'>{text}</p>
            </div>
         </div>
      </div>
   );
}



export default SummaryElement;