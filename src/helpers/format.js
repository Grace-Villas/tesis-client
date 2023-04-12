


/**
 * Función para capitalizar un texto
 * @param {string} string texto a capitalizar
 * @returns {string}
 */
export const capitalize = (string) => {
   const first = string.charAt(0).toLocaleUpperCase();
   const rest = string.slice(1);
   
   return first + rest;
}

/**
 * Función para capitalizar todas las palabras de un texto
 * @param {string} string texto a capitalizar
 * @returns {string}
 */
export const capitalizeAllWords = (string) => {
   const splitted = string.split(' ');

   const formated = splitted.map(word => {
      const first = word.charAt(0).toLocaleUpperCase();
      const rest = word.slice(1);

      return first + rest;
   });

   return formated.join(' ');
}

/**
 * Función para formatear un monto a formato de dolar americano
 * @param {string|number} currency monto a formatear
 * @returns {string}
 */
export const currencyFormat = (value, { locale = 'en-US', currency = 'USD' } = {}) => {
   return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

/**
 * Función para mapear los atributos a usar a través de queryParams
 * @param {object} params Parámetros a formatear
 * @returns {string} queryParams formateados como string
 */
export const queryParamsFilter = (params) => {
   const assoc = Object.entries(params);

   let valids = [];

   assoc.forEach(el => {
      if (el[1] !== '') {
         valids.push(`${el[0]}=${el[1]}`);
      }
   });

   return valids.join('&');
}