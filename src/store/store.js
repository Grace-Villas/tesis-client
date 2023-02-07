import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";

// Importaciones de los reducers
import {
   authReducer,
   citiesReducer,
   countriesReducer,
   settingsReducer,
   statesReducer,
   tablesReducer,
   uiReducer,
} from "../reducers";



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
   countries: countriesReducer,
   settings: settingsReducer,
   states: statesReducer,
   tables: tablesReducer,
   ui: uiReducer,
});

export const store = createStore( 
   reducers,
   composedEnhancers
);