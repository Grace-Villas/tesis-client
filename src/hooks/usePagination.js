import { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useWindowDimensions } from './useDimensions';



export const usePagination = (pages) => {

   const [params, setParams] = useSearchParams();
   
   const [active, setActive] = useState(1);

   const [leftHolder, setLeftHolder] = useState(false);

   const [rightHolder, setRightHolder] = useState(false);

   const [pagesQty, setPagesQty] = useState(3);

   const { width } = useWindowDimensions();

   useEffect(() => {
      if (!pages) return;

      if (!params.get('p')) {
         setActive(1);
         return;
      }

      if (isNaN(params.get('p'))) {
         setActive(1);

         setParams(createSearchParams().toString());
         return;
      }

      if (parseInt(params.get('p')) < 1) {
         setActive(1);

         setParams(createSearchParams().toString());
         return;
      }

      if (parseInt(params.get('p')) > pages) {
         setActive(1);

         setParams(createSearchParams().toString());
         return;
      }

      setActive(parseInt(params.get('p')));
   }, [params, setParams, pages]);

   useEffect(() => {
      // Condición para mostrar o no mostrar los placeholders
      if (pages > ((pagesQty + 1) * 2) && active > (pagesQty + 1)) {
         setLeftHolder(true);
      } else {
         setLeftHolder(false);
      }

      if (pages > ((pagesQty + 1) * 2) && (active + (pagesQty + 1)) <= pages) {
         setRightHolder(true);
      } else {
         setRightHolder(false);
      }
   }, [pages, active, pagesQty]);

   useEffect(() => {
      if (width > 768) {
         setPagesQty(5);
         return;
      }

      setPagesQty(3);
   }, [width]);
   


   // Calculando las páginas a mostrar

   let total = new Array(pages).fill(1).map((_, i) => i+1);

   // Cantidad de elementos a mostrar a la izquierda (lCount) y a la derecha (rCount) de la página actual (active)
   let lCount = (active > (pagesQty + 1)) ? pagesQty : (active - 1);
   let rCount = ((pages - active) >= (pagesQty + 1)) ? pagesQty : (pages - active);

   // Calculando los elementos que se deben mostrar de cada lado
   let left = lCount + (pagesQty + 1) - rCount + (!rightHolder ? 1 : 0);
   let right = rCount + (pagesQty + 1) - lCount + (!leftHolder ? 1 : 0);

   // Obteniendo las páginas a mostrar a los lados de la página activa
   let lArray = total.filter(el => el < active).reverse().filter((_, i) => i+1 < left).reverse();
   let rArray = total.filter(el => el > active).filter((_, i) => i+1 < right);

   let pageNumbers = [...lArray, active, ...rArray];

   // Funcionalidad

   const handleActive = (value, className, activeClass) => active === value ? `${className} ${activeClass}` : className;

   const handlePage = (page) => {
      let oldParams = {};

      for (const [key, value] of params.entries()) {
         if (Array.isArray(oldParams[key])) {
            oldParams[key] = [...oldParams[key], value];
         } else {
            oldParams[key] = [value];
         }
      }

      setParams(createSearchParams({...oldParams, p: page}).toString());
   }

   return {
      pageNumbers,
      active,
      handleActive,
      handlePage,
      leftHolder,
      rightHolder
   }
}

export const useCurrentPage = () => {

   const [params] = useSearchParams();

   const [currentPage, setCurrentPage] = useState(null);

   useEffect(() => {
      if (!params.get('p')) {
         setCurrentPage(1);
         return;
      }

      if (isNaN(params.get('p'))) {
         setCurrentPage(1);
         return;
      }

      if (parseInt(params.get('p')) < 1) {
         setCurrentPage(1);
         return;
      }

      setCurrentPage(parseInt(params.get('p')));
   }, [params]);

   return {
      currentPage
   }
}