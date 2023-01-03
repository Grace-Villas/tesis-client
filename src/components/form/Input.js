


const Input = ({value, setValue, title, type, placeholder}) => {

   // is-invalid (input)
   // is-valid (input)

   const handleValue = (e) => setValue(e.target.value);

   return (
      <div>
         <label className="form-label" htmlFor="basicInput">{title}</label>
         
         <input
            type={type}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={handleValue}
         />

         <div className='invalid-feedback'>valido</div>
      </div>
   );
}



export default Input;