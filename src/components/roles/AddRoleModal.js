import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions
import { startGetRolesList } from '../../actions/roles';
import { startAllocateRoleToUser } from '../../actions/users';



// Components
import Modal from '../ui/Modal';
import Icon from '../ui/Icon';



// Helpers
import { contrastColor } from '../../helpers/colors';



const AddRoleModal = ({userId, isOpen, handleOpen}) => {

   const dispatch = useDispatch();

   const { rolesList } = useSelector(state => state.roles);

   const { user } = useSelector(state => state.users);

   const [availableRoles, setAvailableRoles] = useState([]);

   useEffect(() => {
      dispatch(startGetRolesList());
   }, [dispatch]);

   useEffect(() => {
      if (user?.userRoles) {
         const userRoles = user?.userRoles?.map(userRole => userRole.roleId);
         
         setAvailableRoles(rolesList.filter(role => !userRoles.includes(role.value)));
      }
   }, [user?.userRoles, rolesList]);
   
   const handleClose = () => handleOpen(false);

   const handleAddRole = (roleId) => dispatch(startAllocateRoleToUser(userId, roleId));

   return (
      <Modal
         state={isOpen}
         close={handleClose}
      >
         <div className='roles-modal'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h5 className='modal-title' id='myModalLabel160'>Asignar roles</h5>
                  
                  <button
                     type='button'
                     className='btn-close'
                     onClick={handleClose}
                  />
               </div>

               <div className='modal-body px-0 pt-0'>
                  <table className='invoice-list-table table dataTable no-footer dtr-column mb-0'>
                     <thead className='table-dark'>
                        <tr role='row'>
                           <th rowSpan={1} colSpan={1} className='text-center'>Nombre</th>
                           
                           <th rowSpan={1} colSpan={1} className='text-center'>Acciones</th>
                        </tr>
                     </thead>

                     <tbody>
                        {
                           availableRoles.map(row => (
                              <tr key={'add-role-' + row.value}>
                                 <td className='text-center'>
                                    <span
                                       className='px-50 py-25 rounded'
                                       style={{
                                          backgroundColor: row.hexColor,
                                          color: contrastColor(row.hexColor)
                                       }}>{row.text}</span>
                                 </td>

                                 <td className='text-center'>
                                    <div className='d-flex justify-content-center gap-1'>
                                       {
                                          !row.isPublic && (
                                             <button
                                                type='button'
                                                className='btn btn-sm btn-relief-primary'
                                                onClick={() => handleAddRole(row.value)}
                                             >
                                                <Icon icon='Plus' size={16} />
                                             </button>
                                          )
                                       }
                                    </div>
                                 </td>
                              </tr>
                           )) 
                        }
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </Modal>
   );
}



export default AddRoleModal;