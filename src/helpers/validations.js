import { isEmail } from 'validator';



export const handleInvalidName = (name, field = 'nombre') => {
   if (name.trim().length === 0) {
      return `El ${field} es obligatorio`;
   } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(name)) {
      return 'El nombre debe contener solo letras'
   } else {
      return null;
   }
}

export const handleInvalidEmail = (email) => {
   if (email.trim().length === 0) {
      return 'El correo es obligatorio';
   } else if (!isEmail(email)) {
      return 'El correo debe tener un formato válido';
   } else {
      return null;
   }
}

export const handleInvalidPhone = (phone) => {
   if (phone.trim().length === 0) {
      return 'El teléfono es obligatorio';
   } else if (!/^[0-9]*$/.test(phone)) {
      return 'El teléfono debe contener solo números';
   } else {
      return null;
   }
}

export const handleInvalidRut = (rut) => {
   if (rut.trim().length === 0) {
      return 'El número de identificación es obligatorio';
   } else if (!/^([a-zA-Z])([0-9])*$/.test(rut)) {
      return 'El número de identificación debe contener un formato válido. Ejemplo: j12345678';
   } else {
      return null;
   }
}