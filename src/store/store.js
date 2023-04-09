import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// Importaciones de los reducers
import {
   authReducer,
   citiesReducer,
   clientsReducer,
   configurationsReducer,
   countriesReducer,
   filtersReducer,
   installationReducer,
   paymentMethodsReducer,
   paymentTypesReducer,
   permissionsReducer,
   productsReducer,
   receptionsReducer,
   rolesReducer,
   settingsReducer,
   statesReducer,
   tablesReducer,
   uiReducer,
   usersReducer,
} from '../reducers';



// Main middlewares
const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);



// Main reducer
const reducers = combineReducers({
   // Lista de reducers
   auth: authReducer,
   cities: citiesReducer,
   clients: clientsReducer,
   configurations: configurationsReducer,
   countries: countriesReducer,
   filters: filtersReducer,
   installation: installationReducer,
   paymentMethods: paymentMethodsReducer,
   paymentTypes: paymentTypesReducer,
   permissions: permissionsReducer,
   products: productsReducer,
   receptions: receptionsReducer,
   roles: rolesReducer,
   settings: settingsReducer,
   states: statesReducer,
   tables: tablesReducer,
   ui: uiReducer,
   users: usersReducer
});

export const store = createStore( 
   reducers,
   composedEnhancers
);