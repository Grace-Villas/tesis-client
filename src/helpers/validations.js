import { isEmail, isMobilePhone } from 'validator';



export const handleRequired = (value, errorMsg) => {
   if (value.trim().length === 0) {
      return errorMsg;
   } else {
      return null;
   }
}

export const handleInvalidName = (name, field = 'nombre') => {
   if (name.trim().length === 0) {
      return `El ${field} es obligatorio`;
   } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(name)) {
      return `El ${field} debe contener solo letras`;
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
   } else if (!isMobilePhone(`+58${phone}`, 'es-VE', { strictMode: true })) {
      return 'El teléfono es inválido';
   } else {
      return null;
   }
}

export const handleInvalidRut = (rut) => {
   if (rut.trim().length === 0) {
      return 'El número de identificación es obligatorio';
   } else if (!/^([a-zA-Z])-([0-9])*$/.test(rut)) {
      return 'El número de identificación debe contener un formato válido. Ejemplo: j-12345678';
   } else {
      return null;
   }
}

export const handleInvalidPassword = (password) => {
   if (password.length === 0) {
      return 'La contraseña es obligatoria';
   } else if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
   } else {
      return null;
   }
}

export const handleInvalidRepeatPassword = (password, compare) => {
   if (password.length === 0) {
      return 'La contraseña es obligatoria';
   } else if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
   } else if (password !== compare) {
      return 'Las contraseñas deben coincidir';
   } else {
      return null;
   }
}

export const handleInvalidCurrency = (currency, field = 'precio') => {
   if (currency.length === 0) {
      return `El ${field} es obligatorio`;
   } else if (!/(^\d*$)|(^(\d+)(\.)(\d{0,2})$)/.test(currency)) {
      return `El ${field} debe ser un número con 2 decimales`;
   } else {
      return null;
   }
}

export const handleInvalidQuantity = (quantity, field = 'cantidad') => {
   if (quantity.length === 0) {
      return `La ${field} es obligatoria`;
   } else if (!/^[0-9]*$/.test(quantity)) {
      return `La ${field} debe ser un número entero`;
   } else if (Number(quantity < 1)) {
      return `La ${field} debe ser mayor a cero`;
   } else {
      return null;
   }
}