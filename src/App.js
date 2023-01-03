import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';



// store
import { store } from './store/store';


// Routers
import AppRouter from './routers/AppRouter';



const App = () => {

   return (
      <Provider store={store}>
         <Router>
            <AppRouter />
         </Router>
      </Provider>
   )
}



export default App;