


const BreadCrumbs = () => {

   // TODO: funcionalidad con redux

   return (
      <div className="content-header d-flex flex-row flex-content-between">
         <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Home</h2>

            <div className="breadcrumb-wrapper">
               <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                     <a href="index.html">Home</a>
                  </li>

                  <li className="breadcrumb-item active">
                     Index
                  </li>
               </ol>
            </div>
         </div>
      </div>
   );
}



export default BreadCrumbs;