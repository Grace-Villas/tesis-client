import * as Icons from 'react-feather';



export const validateFeatherIcon = (props, propName, componentName) => {
   
   const entries = Object.entries({...Icons});

   const icons = entries.map(([key, _]) => key);

   if (!icons.includes(props[propName])) {

      const errorIcons = icons.map(icon => `"${icon}"`);

      return new Error(
         'Invalid prop `' + propName + '` of value `' + props[propName] + '` supplied to `' + componentName + '`, expected on of [' + errorIcons.toString() + '].'
      );
   }
}