import Swal from 'sweetalert2';



const simpleToastSwal = Swal.mixin({
   customClass: {
      title: 'fs-6 m-0 fw-normal',
      actions: 'gap-1',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger p-50 px-2',
      htmlContainer: 'm-0',
      popup: 'alert-popup',
      container: 'alert-container'
   },
   buttonsStyling: false,
   confirmButtonText: 'Confirmar',
   cancelButtonText: 'Cancelar',
});

/**
 * Toast posicionado en la esquina inferior derecha para mostrar un mensaje de éxito simple (Ícono y mensaje)
 * @param {string} message Mensaje a mostrar en el toast
 */
export const simpleSuccessToast = (message) => {
   simpleToastSwal.fire({
      icon: 'success',
      title: message,
      toast: true,
      timer: 3000,
      position: 'bottom-end',
      width: 300,
      showConfirmButton: false,
   });
}



const simpleDialogSwal = Swal.mixin({
   customClass: {
      title: 'fs-4 m-0',
      actions: 'gap-1',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger p-50 px-2',
      htmlContainer: 'm-0 px-1 fs-6',
      popup: 'alert-popup',
      container: 'alert-container',
      input: 'alert-input mb-0 mx-1 mt-1'
   },
   buttonsStyling: false,
   confirmButtonText: 'Confirmar',
   cancelButtonText: 'Cancelar',
});

/**
 * Modal sencillo de confirmación de acción
 * @param {string} icon Ícono del modal
 * @param {string} title Título del modal
 * @param {string} text Texto a mostrar en el modal
 * @returns {Promise<{isConfirmed: boolean, isDenied: boolean, isDismissed: boolean}>}
 */
export const simpleConfirmDialog = async (icon, title, text) => {
   return await simpleDialogSwal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      width: 300
   });
}

/**
 * Modal sencillo de confirmación de acción
 * @param {string} icon Ícono del modal
 * @param {string} title Título del modal
 * @param {string} text Texto a mostrar en el modal
 * @returns {Promise<{isConfirmed: boolean, isDenied: boolean, isDismissed: boolean}>}
 */
export const simpleDialog = async (icon, title, text) => {
   return await simpleDialogSwal.fire({
      title: title,
      text: text,
      icon: icon,
      width: 300
   });
}

/**
 * Modal sencillo de confirmación de acción con input
 * @param {string} icon Ícono del modal
 * @param {string} title Título del modal
 * @param {string} text Texto a mostrar en el modal
 * @param {string} label Etiqueta a mostrar en el input
 * @param {string} input Tipo de input a mostrar en el modal
 * @param {string} placeHolder Placeholder a mostrar en el input
 * @returns {Promise<{isConfirmed: boolean, isDenied: boolean, isDismissed: boolean, value: string}>}
 */
export const simpleInputDialog = async (icon, title, text, label, input, placeHolder) => {
   return await simpleDialogSwal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      width: 400,
      input: input,
      inputLabel: label,
      inputPlaceholder: placeHolder
   });
}



const arraySwal = Swal.mixin({
   customClass: {
      title: 'fs-6 m-0 mb-25',
      actions: 'gap-1',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger p-50 px-2',
      htmlContainer: 'm-0 d-flex flex-column gap-25',
      popup: 'alert-popup',
      container: 'alert-container'
   },
   buttonsStyling: false,
   confirmButtonText: 'Confirmar',
   cancelButtonText: 'Cancelar',
});

/**
 * Toast posicionado en la esquina inferior derecha para mostrar un listado de errores (Ícono y mensajes)
 * @param {Array<string>} errors Arreglo de errores a mostrar
 */
export const arrayErrorToast = (errors) => {
   arraySwal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      html: `${errors.map((error) => `<span>- ${error}</span>`).join('')}`,
      toast: true,
      timer: 3000,
      position: 'bottom-end',
      width: 300,
      showConfirmButton: false
   });
}



const installationDialog = Swal.mixin({
   customClass: {
      title: 'fs-4 m-0',
      actions: 'gap-1',
      confirmButton: 'btn btn-primary p-50 px-2',
      cancelButton: 'btn btn-danger p-50 px-2',
      htmlContainer: 'm-0 fs-6 p-2'
   },
   buttonsStyling: false,
   confirmButtonText: 'Confirmar',
   cancelButtonText: 'Cancelar',
});

/**
 * Modal sencillo de confirmación de acción
 * @param {string} icon Ícono del modal
 * @param {string} title Título del modal
 * @param {string} text Texto a mostrar en el modal
 * @returns {Promise<{isConfirmed: boolean, isDenied: boolean, isDismissed: boolean}>}
 */
export const installationConfirmDialog = async (icon, title, text) => {
   return await installationDialog.fire({
      title: title,
      text: text,
      icon: icon,
      width: 400
   });
}