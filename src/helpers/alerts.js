import Swal from 'sweetalert2';



const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
      title: 'fs-6 m-0 fw-normal',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger'
   },
   buttonsStyling: false
});

/**
 * Toast posicionado en la esquina inferior derecha para mostrar un mensaje de éxito simple (Ícono y mensaje)
 * @param {string} message Mensaje a mostrar en el toast
 */
export const simpleSuccessToast = (message) => {
   swalWithBootstrapButtons.fire({
      icon: 'success',
      title: message,
      toast: true,
      timer: 3000,
      position: 'bottom-end',
      width: 250,
      showConfirmButton: false,
   });
}