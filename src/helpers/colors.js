


/**
 * Función para contrastar el color dado por parámetros
 * @param {string} hex Color hexadecimal, con o sin el #
 * @returns {string}
 */
export const contrastColor = (hex) => {
   if (!hex) {
      return '#0000000';
   }

   if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
   }

   // convert 3-digit hex to 6-digits.
   if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   }

   if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
   }

   const r = parseInt(hex.slice(0, 2), 16);
   const g = parseInt(hex.slice(2, 4), 16);
   const b = parseInt(hex.slice(4, 6), 16);

   return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
}