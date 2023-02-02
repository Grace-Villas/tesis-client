import Swal from 'sweetalert2';



const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
      title: 'fs-6 m-0 fw-normal',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger'
   },
   buttonsStyling: false
});

export const accountSuccessToast = () => {
   swalWithBootstrapButtons.fire({
      icon: 'success',
      title: 'Cuenta actualizada satisfactoriamente',
      toast: true,
      timer: 3000,
      position: 'bottom-end',
      width: 250,
      showConfirmButton: false,
   });
}