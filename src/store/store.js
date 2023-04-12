import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// Importaciones de los reducers
import {
   authReducer,
   batchStatusesReducer,
   batchesReducer,
   citiesReducer,
   clientsReducer,
   configurationsReducer,
   countriesReducer,
   dashboardReducer,
   dispatchStatusesReducer,
   dispatchesReducer,
   filtersReducer,
   installationReducer,
   paymentMethodsReducer,
   paymentStatusesReducer,
   paymentTypesReducer,
   paymentsReducer,
   permissionsReducer,
   productsReducer,
   receiversReducer,
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
   batches: batchesReducer,
   batchStatuses: batchStatusesReducer,
   cities: citiesReducer,
   clients: clientsReducer,
   configurations: configurationsReducer,
   countries: countriesReducer,
   dashboard: dashboardReducer,
   dispatches: dispatchesReducer,
   dispatchStatuses: dispatchStatusesReducer,
   filters: filtersReducer,
   installation: installationReducer,
   payments: paymentsReducer,
   paymentMethods: paymentMethodsReducer,
   paymentStatuses: paymentStatusesReducer,
   paymentTypes: paymentTypesReducer,
   permissions: permissionsReducer,
   products: productsReducer,
   receivers: receiversReducer,
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