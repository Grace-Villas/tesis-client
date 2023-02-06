


/**
 * 
 * @param {number} page página actual a buscar. Debe ser un entero
 * @param {number} perPage cantidad de elementos por página. Debe ser un entero
 */
export const getPaginationQuery = (page, perPage) => {
   return `limit=${perPage}&skip=${(page - 1) * perPage}`;
}